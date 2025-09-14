import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ArrowUpRight, ArrowDownLeft, DollarSign } from 'lucide-react';

interface TransactionFormsProps {
  onTransaction: (type: 'deposit' | 'withdraw', amount: number, description: string) => void;
  balance: number;
}

export function TransactionForms({ onTransaction, balance }: TransactionFormsProps) {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawDescription, setWithdrawDescription] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositDescription, setDepositDescription] = useState('');
  const [errors, setErrors] = useState<{withdraw?: string; deposit?: string}>({});

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrors(prev => ({ ...prev, withdraw: 'Please enter a valid amount' }));
      return;
    }
    
    if (amount > balance) {
      setErrors(prev => ({ ...prev, withdraw: 'Insufficient funds' }));
      return;
    }
    
    onTransaction('withdraw', amount, withdrawDescription || 'ATM withdrawal');
    setWithdrawAmount('');
    setWithdrawDescription('');
    setErrors(prev => ({ ...prev, withdraw: undefined }));
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrors(prev => ({ ...prev, deposit: 'Please enter a valid amount' }));
      return;
    }
    
    onTransaction('deposit', amount, depositDescription || 'Cash deposit');
    setDepositAmount('');
    setDepositDescription('');
    setErrors(prev => ({ ...prev, deposit: undefined }));
  };

  const quickWithdrawAmounts = [20, 40, 60, 100, 200];
  const quickDepositAmounts = [50, 100, 200, 500, 1000];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Withdraw Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowUpRight className="mr-2 h-5 w-5 text-red-600" />
            Withdraw Money
          </CardTitle>
          <CardDescription>
            Withdraw funds from your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="withdrawAmount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="withdrawAmount"
                  type="number"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="pl-10"
                  step="0.01"
                  min="0"
                  max={balance}
                />
              </div>
              <p className="text-xs text-gray-500">Available balance: ${balance.toFixed(2)}</p>
            </div>

            <div className="space-y-2">
              <Label>Quick Amounts</Label>
              <div className="grid grid-cols-3 gap-2">
                {quickWithdrawAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setWithdrawAmount(amount.toString())}
                    disabled={amount > balance}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdrawDescription">Description (Optional)</Label>
              <Textarea
                id="withdrawDescription"
                placeholder="What is this withdrawal for?"
                value={withdrawDescription}
                onChange={(e) => setWithdrawDescription(e.target.value)}
                rows={2}
              />
            </div>

            {errors.withdraw && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                {errors.withdraw}
              </div>
            )}

            <Button type="submit" className="w-full" variant="destructive">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Withdraw ${withdrawAmount || '0.00'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Deposit Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowDownLeft className="mr-2 h-5 w-5 text-green-600" />
            Deposit Money
          </CardTitle>
          <CardDescription>
            Add funds to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDeposit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="depositAmount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="depositAmount"
                  type="number"
                  placeholder="0.00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="pl-10"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Quick Amounts</Label>
              <div className="grid grid-cols-3 gap-2">
                {quickDepositAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setDepositAmount(amount.toString())}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="depositDescription">Description (Optional)</Label>
              <Textarea
                id="depositDescription"
                placeholder="What is this deposit for?"
                value={depositDescription}
                onChange={(e) => setDepositDescription(e.target.value)}
                rows={2}
              />
            </div>

            {errors.deposit && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                {errors.deposit}
              </div>
            )}

            <Button type="submit" className="w-full" variant="default">
              <ArrowDownLeft className="mr-2 h-4 w-4" />
              Deposit ${depositAmount || '0.00'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}