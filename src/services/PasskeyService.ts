import {
  startRegistration,
  startAuthentication,
  browserSupportsWebAuthn,
} from '@simplewebauthn/browser';
import type { 
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';

export class PasskeyService {
  private isInitialized = false;
  private apiUrl: string;
  private registeredUsers: Map<string, { credentialId: string; password?: string; isAdmin?: boolean }>;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL || 'https://api.stellarpaydocs.com';
    const savedUsers = localStorage.getItem('registeredUsers');
    this.registeredUsers = new Map(savedUsers ? JSON.parse(savedUsers) : []);
    
    // Add admin user if not exists
    if (!this.registeredUsers.has('admin')) {
      this.registeredUsers.set('admin', {
        credentialId: '',
        password: btoa('admin'),
        isAdmin: true
      });
      this.saveUsers();
    }
  }

  private saveUsers() {
    localStorage.setItem('registeredUsers', JSON.stringify(Array.from(this.registeredUsers.entries())));
  }

  async initialize(): Promise<void> {
    try {
      const supported = await this.isPasskeySupported();
      if (!supported) {
        console.warn('WebAuthn is not supported in this browser');
        return;
      }
      
      this.isInitialized = true;
      console.log('Passkey service initialized');
    } catch (error) {
      console.error('Failed to initialize passkey service:', error);
      throw error;
    }
  }

  async register(username: string, usePasskey: boolean = true, password?: string): Promise<boolean> {
    if (!this.isInitialized && usePasskey) {
      await this.initialize();
    }

    if (this.registeredUsers.has(username)) {
      throw new Error('Username already registered');
    }

    try {
      if (usePasskey) {
        const options: PublicKeyCredentialCreationOptionsJSON = {
          challenge: this.generateChallenge(),
          rp: {
            name: 'StellarPayDocs',
            id: window.location.hostname
          },
          user: {
            id: btoa(username),
            name: username,
            displayName: username
          },
          pubKeyCredParams: [
            { alg: -7, type: 'public-key' },
            { alg: -257, type: 'public-key' }
          ],
          timeout: 60000,
          attestation: 'none',
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            requireResidentKey: true,
            residentKey: 'required',
            userVerification: 'required'
          }
        };

        const response = await startRegistration(options);
        
        this.registeredUsers.set(username, {
          credentialId: response.id,
          password: password ? btoa(password) : undefined
        });
        
        this.saveUsers();
        return true;
      } else if (password) {
        this.registeredUsers.set(username, {
          credentialId: '',
          password: btoa(password)
        });
        
        this.saveUsers();
        return true;
      } else {
        throw new Error('Either passkey or password is required for registration');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'NotAllowedError') {
        throw new Error('User cancelled the registration');
      }
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async authenticateWithPasskey(): Promise<{ username: string; isAdmin: boolean }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const hasPasskeys = Array.from(this.registeredUsers.values()).some(user => user.credentialId !== '');
    if (!hasPasskeys) {
      throw new Error('No passkeys found. Please register first or use password authentication.');
    }

    try {
      const allowCredentials = Array.from(this.registeredUsers.entries())
        .filter(([_, data]) => data.credentialId !== '')
        .map(([_, data]) => ({
          id: data.credentialId,
          type: 'public-key' as const,
        }));

      const options: PublicKeyCredentialRequestOptionsJSON = {
        challenge: this.generateChallenge(),
        rpId: window.location.hostname,
        timeout: 60000,
        userVerification: 'required',
        allowCredentials
      };

      const response = await startAuthentication(options);
      
      for (const [username, data] of this.registeredUsers.entries()) {
        if (data.credentialId === response.id) {
          return { username, isAdmin: !!data.isAdmin };
        }
      }
      
      throw new Error('No matching passkey found');
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          throw new Error('Authentication was cancelled');
        } else if (error.name === 'SecurityError') {
          throw new Error('No passkey found for this site');
        }
      }
      throw new Error('Authentication failed. Please try again.');
    }
  }

  async authenticateWithPassword(username: string, password: string): Promise<{ success: boolean; isAdmin: boolean }> {
    const userData = this.registeredUsers.get(username);
    
    if (!userData || !userData.password) {
      throw new Error('Invalid username or password');
    }

    return {
      success: btoa(password) === userData.password,
      isAdmin: !!userData.isAdmin
    };
  }

  async isPasskeySupported(): Promise<boolean> {
    return browserSupportsWebAuthn();
  }

  private generateChallenge(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, Array.from(array)));
  }
}