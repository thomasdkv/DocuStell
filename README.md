# StellarPayDocs

A decentralized document sharing platform built on the Stellar blockchain, enabling secure and frictionless access to documents through pay-per-use functionality.

## Demo Video

[Watch the Demo](https://youtu.be/demo-link)

## Screenshots

### Homepage
![Homepage](https://i.imgur.com/homepage.png)

### Document Marketplace
![Marketplace](https://i.imgur.com/marketplace.png)

### Document View
![Document View](https://i.imgur.com/document-view.png)

### Upload Interface
![Upload Interface](https://i.imgur.com/upload.png)

## Features

- 🔐 **Secure Authentication**: Passkey-based authentication for passwordless login
- 💰 **Pay-per-use Access**: Purchase temporary access to documents using XLM
- 📁 **IPFS Storage**: Decentralized document storage ensuring data integrity
- 🔒 **Privacy Focused**: Time-limited access links and no public sharing
- ⚡ **Fast Transactions**: Leveraging Stellar's quick and low-cost transactions
- 👥 **User Collections**: Personal document libraries for purchased content

## Interaction with Stellar Blockchain

StellarPayDocs utilizes the Stellar blockchain in several key ways:

1. **Payment Processing**
   - Documents are purchased using XLM
   - Transactions are processed through the Stellar network
   - Smart contracts manage access control based on payment status

2. **Access Control**
   - Document access rights are verified on-chain
   - Time-limited access tokens are generated post-payment
   - Ownership records are maintained on the blockchain

3. **Integration Points**
   - Stellar SDK for payment processing
   - Custom smart contracts for access management
   - Wallet integration for seamless transactions

## Technical Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Stellar Network (@stellar/stellar-sdk)
- **Storage**: IPFS (ipfs-http-client)
- **Authentication**: SimpleWebAuthn
- **UI Components**: Custom components with Framer Motion
- **Icons**: Lucide React

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/thomasdkv/DocuStell.git
   ```

2. Install dependencies:
   ```bash
   cd DocuStell
   npm install
   ```

3. Create a `.env` file:
   ```env
   VITE_API_URL=your_api_url
   VITE_CONTRACT_ID=your_contract_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
stellar-pay-docs/
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/        # React context providers
│   ├── pages/          # Page components
│   ├── services/       # Blockchain and authentication services
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── public/             # Static assets
└── package.json        # Project dependencies
```

## Video Walkthrough

[Watch the Technical Walkthrough](https://www.loom.com/share/your-video-id)

This video covers:
- Project architecture overview
- Code structure walkthrough
- Live demo of features
- Technical implementation details

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Team

- [Team Member 1] - Full Stack Developer
- [Team Member 2] - Smart Contract Developer
- [Team Member 3] - UI/UX Designer

## Acknowledgments

- Stellar Development Foundation for the blockchain infrastructure
- IPFS for decentralized storage capabilities
- The Web3 community for continuous inspiration and support
