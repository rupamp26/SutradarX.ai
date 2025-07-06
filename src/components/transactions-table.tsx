
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Transaction } from '@/types';
import { cn } from '@/lib/utils';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Escrow ID</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.type}</TableCell>
              <TableCell>{transaction.escrowId}</TableCell>
              <TableCell className="text-right font-medium">₹{transaction.amount.toLocaleString('en-IN')}</TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={transaction.status === 'Completed' ? 'default' : 'secondary'}
                  className={cn({
                      'bg-green-900/50 text-green-300 border-green-300': transaction.status === 'Completed',
                      'bg-yellow-900/50 text-yellow-300 border-yellow-300': transaction.status === 'Pending',
                      'bg-red-900/50 text-red-300 border-red-300': transaction.status === 'Failed',
                  })}
                >
                  {transaction.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center">
              No recent transactions found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
