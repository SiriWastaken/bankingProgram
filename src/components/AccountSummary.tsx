import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Eye, EyeOff, CreditCard } from 'lucide-react';

interface AccountSummaryProps {
  balance: number;
  showBalance: boolean;
  onToggleBalance: () => void;
  accountNumber: string;
}

export function AccountSummary({ balance, showBalance, onToggleBalance, accountNumber }: AccountSummaryProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white">Checking Account</CardTitle>
            <CardDescription className="text-blue-100">
              Account Number: •••• •••• {accountNumber.slice(-3)}
            </CardDescription>
          </div>
          <CreditCard className="h-8 w-8 text-blue-200" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-blue-100 text-sm">Available Balance</p>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">
                {showBalance ? `$${balance.toFixed(2)}` : '••••••'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleBalance}
                className="text-blue-200 hover:text-white hover:bg-blue-700"
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Status</p>
            <span className="text-green-300">Active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}