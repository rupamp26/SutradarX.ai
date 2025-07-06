export type Transaction = {
  id: string;
  escrowId: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  timestamp: string;
  type: 'Deposit' | 'Release' | 'Refund';
};

export type Escrow = {
  id: string;
  payer: { name: string, upi: string };
  payee: { name: string, upi: string };
  amount: number;
  status: 'Active' | 'Completed' | 'Disputed' | 'Cancelled';
  createdAt: string;
};

export type Dispute = {
  id: string;
  escrowId: string;
  status: 'Open' | 'Mediating' | 'Resolved' | 'Closed';
  parties: string;
  createdAt: string;
};
