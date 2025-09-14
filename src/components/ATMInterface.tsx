import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Monitor, ArrowLeft, CreditCard, Eye, EyeOff } from 'lucide-react';

interface ATMInterfaceProps {
  accountNumber: string;
  balance: number;
  onTransaction: (type: 'deposit' | 'withdraw', amount: number, description: string) => void;
  onExit: () => void;
}

type ATMScreen = 'main' | 'balance' | 'withdraw' | 'deposit' | 'custom-amount';

export function ATMInterface({ accountNumber, balance, onTransaction, onExit }: ATMInterfaceProps) {
  const [screen, setScreen] = useState<ATMScreen>('main');
  const [showBalance, setShowBalance] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'withdraw' | 'deposit' | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [error, setError] = useState('');

  const quickAmounts = [20, 40, 60, 80, 100, 200];

  const handleQuickAmount = (amount: number) => {
    if (selectedAction === 'withdraw' && amount > balance) {
      setError('Insufficient funds');
      return;
    }
    
    onTransaction(
      selectedAction!,
      amount,
      selectedAction === 'withdraw' ? 'ATM withdrawal' : 'ATM deposit'
    );
    
    setScreen('main');
    setSelectedAction(null);
    setError('');
  };

  const handleCustomAmount = () => {
    const amount = parseFloat(customAmount);
    
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (selectedAction === 'withdraw' && amount > balance) {
      setError('Insufficient funds');
      return;
    }
    
    onTransaction(
      selectedAction!,
      amount,
      selectedAction === 'withdraw' ? 'ATM withdrawal' : 'ATM deposit'
    );
    
    setCustomAmount('');
    setScreen('main');
    setSelectedAction(null);
    setError('');
  };

  const renderMainScreen = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl mb-2">Welcome to SecureBank ATM</h2>
        <p className="text-gray-600">Account: •••• •••• {accountNumber.slice(-3)}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center"
          onClick={() => setScreen('balance')}
        >
          <Eye className="h-6 w-6 mb-1" />
          Check Balance
        </Button>
        
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center"
          onClick={() => {
            setSelectedAction('withdraw');
            setScreen('withdraw');
          }}
        >
          <ArrowLeft className="h-6 w-6 mb-1" />
          Withdraw
        </Button>
        
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center"
          onClick={() => {
            setSelectedAction('deposit');
            setScreen('deposit');
          }}
        >
          <CreditCard className="h-6 w-6 mb-1" />
          Deposit
        </Button>
        
        <Button
          variant="outline"
          className="h-16 flex flex-col items-center justify-center"
          onClick={onExit}
        >
          <ArrowLeft className="h-6 w-6 mb-1" />
          Exit
        </Button>
      </div>
    </div>
  );

  const renderBalanceScreen = () => (
    <div className="space-y-4">
      <h2 className="text-xl text-center mb-6">Account Balance</h2>
      
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <p className="text-gray-600 mb-2">Available Balance</p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-3xl font-bold">
            {showBalance ? `$${balance.toFixed(2)}` : '••••••'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <Button variant="outline" className="w-full" onClick={() => setScreen('main')}>
        Back to Main Menu
      </Button>
    </div>
  );

  const renderAmountSelection = () => (
    <div className="space-y-4">
      <h2 className="text-xl text-center mb-6">
        Select {selectedAction === 'withdraw' ? 'Withdrawal' : 'Deposit'} Amount
      </h2>
      
      {selectedAction === 'withdraw' && (
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-600">Available Balance: ${balance.toFixed(2)}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-3">
        {quickAmounts.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            className="h-12"
            onClick={() => handleQuickAmount(amount)}
            disabled={selectedAction === 'withdraw' && amount > balance}
          >
            ${amount}
          </Button>
        ))}
      </div>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setScreen('custom-amount')}
      >
        Other Amount
      </Button>
      
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-2 rounded text-center">
          {error}
        </div>
      )}
      
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setScreen('main');
          setSelectedAction(null);
          setError('');
        }}
      >
        Cancel
      </Button>
    </div>
  );

  const renderCustomAmountScreen = () => (
    <div className="space-y-4">
      <h2 className="text-xl text-center mb-6">Enter Amount</h2>
      
      <div className="space-y-4">
        <Input
          type="number"
          placeholder="Enter amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setError('');
          }}
          step="0.01"
          min="0"
          max={selectedAction === 'withdraw' ? balance : undefined}
          className="text-center text-lg h-12"
        />
        
        {selectedAction === 'withdraw' && (
          <p className="text-sm text-gray-600 text-center">
            Maximum: ${balance.toFixed(2)}
          </p>
        )}
        
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-2 rounded text-center">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setScreen(selectedAction!);
              setCustomAmount('');
              setError('');
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCustomAmount}
            disabled={!customAmount}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
        <Card className="w-96 bg-green-900 text-green-100 border-green-700">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <Monitor className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-green-100">SecureBank ATM</CardTitle>
            <CardDescription className="text-green-200">
              Automated Teller Machine
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-gray-100 text-gray-900 rounded">
            {screen === 'main' && renderMainScreen()}
            {screen === 'balance' && renderBalanceScreen()}
            {(screen === 'withdraw' || screen === 'deposit') && renderAmountSelection()}
            {screen === 'custom-amount' && renderCustomAmountScreen()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}