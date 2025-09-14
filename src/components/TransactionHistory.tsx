import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'deposit' | 'withdraw';
  amount: number;
  date: string;
  description: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const totalDeposits = transactions
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalWithdrawals = transactions
    .filter(t => t.type === 'withdraw')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalDeposits.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ${totalWithdrawals.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            A complete history of your account transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions</h3>
              <p className="mt-1 text-sm text-gray-500">
                Your transaction history will appear here.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {formatDate(transaction.date)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={transaction.type === 'deposit' ? 'default' : 'destructive'}
                        className="flex items-center w-fit"
                      >
                        {transaction.type === 'deposit' ? (
                          <ArrowDownLeft className="mr-1 h-3 w-3" />
                        ) : (
                          <ArrowUpRight className="mr-1 h-3 w-3" />
                        )}
                        {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {transaction.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}