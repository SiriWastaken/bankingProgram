import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { CreditCard, Lock } from 'lucide-react';

interface LoginFormProps {
  onLogin: (accountNumber: string, pin: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountNumber || !pin) {
      setError('Please enter both account number and PIN');
      return;
    }
    
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }
    
    // Demo accounts for testing
    const validAccounts = {
      '123456789': '1234',
      '987654321': '5678',
      '555666777': '9999'
    };
    
    if (validAccounts[accountNumber as keyof typeof validAccounts] === pin) {
      setError('');
      onLogin(accountNumber, pin);
    } else {
      setError('Invalid account number or PIN');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">SecureBank Login</CardTitle>
          <CardDescription>
            Enter your account credentials to access your banking services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="Enter your account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                maxLength={9}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pin">PIN</Label>
              <Input
                id="pin"
                type="password"
                placeholder="Enter your 4-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength={4}
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            
            <Button type="submit" className="w-full">
              <Lock className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">Demo Accounts:</p>
            <p className="text-xs text-blue-600 mt-1">
              Account: 123456789, PIN: 1234<br/>
              Account: 987654321, PIN: 5678<br/>
              Account: 555666777, PIN: 9999
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}