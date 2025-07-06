
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Escrow } from '@/types';
import { cn } from '@/lib/utils';

interface EscrowsTableProps {
  escrows: Escrow[];
}

export function EscrowsTable({ escrows }: EscrowsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Payer</TableHead>
          <TableHead>Payee</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {escrows.length > 0 ? (
          escrows.map((escrow) => (
            <TableRow key={escrow.id}>
              <TableCell>{escrow.payer.name}</TableCell>
              <TableCell>{escrow.payee.name}</TableCell>
              <TableCell className="text-right font-medium">₹{escrow.amount.toLocaleString('en-IN')}</TableCell>
              <TableCell className="text-center">
                <Badge
                  className={cn("border", {
                    'bg-green-900/50 text-green-300 border-green-300/50': escrow.status === 'Completed',
                    'bg-primary/20 text-primary border-primary/50': escrow.status === 'Active',
                    'bg-red-900/50 text-red-300 border-red-300/50': escrow.status === 'Disputed',
                    'bg-gray-900/50 text-gray-300 border-gray-300/50': escrow.status === 'Cancelled',
                  })}
                >
                  {escrow.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center">
              No active escrows found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
