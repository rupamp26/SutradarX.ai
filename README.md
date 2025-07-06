# SutradharX: Programmable UPI Escrow on Aptos

![SutradharX Logo](https://via.placeholder.com/150x50?text=SutradharX)

## 🚀 Introduction

SutradharX is building the first programmable UPI escrow system on Aptos blockchain, solving the critical problem that India's $1.5T annual UPI transaction volume has zero programmability - no escrow, no conditions, just simple transfers.

**Key Problem**: UPI processes 14 billion transactions monthly but they're all basic transfers with no smart contract capabilities for escrow, conditional payments, or automated dispute resolution.

## 💡 Core Value Proposition

- **Blockchain-Powered Escrow**: Secure funds in smart contracts until conditions are met
- **Programmable UPI**: First-ever conditional UPI payments using Aptos blockchain
- **Trustless Transactions**: Eliminate fraud in peer-to-peer commerce
- **Automated Dispute Resolution**: Smart contract-based mediation system
- **Full Audit Trail**: Immutable transaction records on Aptos blockchain

## 🏗️ Technical Architecture

### 📦 Monorepo Structure

```
sutradharx/
├── packages/
│   ├── smart-contracts/   # Move contracts for Aptos
│   ├── backend/           # Node.js API services
│   ├── frontend/          # Next.js dashboard
│   ├── mobile/            # React Native app
│   └── shared/            # Shared types and utilities
├── infrastructure/        # Kubernetes, Docker, Terraform
├── docs/                  # Technical documentation
├── scripts/               # Deployment scripts
└── tests/                 # Integration and E2E tests
```

### 🔗 Core Technologies

| Area               | Technologies Used                          |
|--------------------|--------------------------------------------|
| Blockchain         | Aptos, Move language                       |
| Backend            | Node.js, Express, PostgreSQL, Redis        |
| Frontend           | Next.js, React, Wallet Adapter             |
| Mobile             | React Native                               |
| Infrastructure     | Docker, Kubernetes, Terraform              |
| Testing            | Jest, Supertest, Move tests                |

## ⛓️ Smart Contract Modules

### Escrow Payment Contract (Move)

```move
module SutradharX::EscrowPayment {
    struct EscrowAccount has key {
        balance: u64,
        sender: address,
        recipient: address,
        condition_met: bool,
        dispute_active: bool,
        created_at: u64
    }

    public entry fun create_escrow(
        sender: &signer,
        recipient: address,
        amount: u64,
        condition_hash: vector<u8>
    ) { ... }

    public entry fun release_payment(
        account: &signer,
        escrow_id: address
    ) { ... }
}
```

### UPI Bridge Contract (Move)

```move
module SutradharX::UPIBridge {
    struct PaymentIntent has key {
        upi_txn_id: vector<u8>,
        aptos_escrow: address,
        amount: u64,
        status: u8 // 0=pending, 1=confirmed, 2=failed
    }

    public entry fun initiate_upi_payment() { ... }
    public entry fun confirm_upi_payment() { ... }
}
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 20+
- Aptos CLI
- Docker
- PostgreSQL
- Redis

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sutradharx/core.git
   cd core
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Fill in required values
   ```

4. Start development services:
   ```bash
   docker-compose up -d postgres redis
   pnpm dev
   ```

## 🌐 API Endpoints

### Escrow Service

- `POST /api/v1/escrows` - Create new escrow
- `GET /api/v1/escrows/:id` - Get escrow details
- `POST /api/v1/escrows/:id/release` - Release escrow funds
- `POST /api/v1/escrows/:id/dispute` - Initiate dispute

### UPI Integration

- `POST /api/v1/escrows/:id/payment` - Initiate UPI payment
- `POST /api/v1/webhooks/upi` - UPI payment callback

## 🚢 Deployment

### Kubernetes Production Setup

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sutradharx-api
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: api
        image: sutradharx/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
```

### CI/CD Pipeline

```yaml
name: Deploy SutradharX
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration
      - run: aptos move test --package-dir ./contracts
  deploy:
    needs: test
    steps:
      - uses: actions/checkout@v3
      - run: docker build -t sutradharx/api:${GITHUB_SHA} .
      - run: kubectl set image deployment/sutradharx-api api=sutradharx/api:${GITHUB_SHA}
```

## 📊 Database Schema

### Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE,
    wallet_address VARCHAR(66) UNIQUE,
    kyc_status VARCHAR(20) DEFAULT 'PENDING',
    reputation_score INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Escrows Table

```sql
CREATE TABLE escrows (
    id UUID PRIMARY KEY,
    blockchain_address VARCHAR(66) UNIQUE NOT NULL,
    sender_id UUID REFERENCES users(id) NOT NULL,
    recipient_id UUID REFERENCES users(id) NOT NULL,
    amount DECIMAL(18,8) NOT NULL,
    status VARCHAR(20) DEFAULT 'CREATED',
    conditions JSONB NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing Strategy

### Test Pyramid

- **Unit Tests**: 70% coverage (Jest)
- **Integration Tests**: 20% coverage (Supertest)
- **E2E Tests**: 10% coverage (Cypress)

### Smart Contract Tests

```move
#[test(sender = @0x1, recipient = @0x2)]
fun test_create_escrow_success(sender: signer, recipient: signer) {
    // Setup test
    // Execute function
    // Verify results
}
```

## 🔒 Security Implementation

- JWT + Wallet Signature Authentication
- Field-level encryption for sensitive data
- Input validation for all API endpoints
- Regular security audits

```typescript
class AuthService {
  async authenticateUser(token: string, signature?: string) {
    // Verify JWT
    // Verify wallet signature if present
  }
}
```

## 📈 Business Model

### Revenue Streams

1. **Transaction Fees**: 0.1% on escrow transactions
2. **SaaS Platform**: $99-999/month for API access
3. **Enterprise Licensing**: Custom deployments for banks
4. **Developer Ecosystem**: Revenue sharing on built applications

### Market Opportunity

- **TAM**: India's $1T+ digital economy
- **SAM**: UPI's $1.5T annual transaction volume
- **SOM**: $50B programmable payments market by 2027

## 🏆 Hackathon Goals

- **Demo**: Live programmable UPI escrow transaction
- **Technical**: Complete Move smart contracts + UPI integration
- **Business**: Clear value proposition for judges
- **Future**: Roadmap for post-hackathon development

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.
