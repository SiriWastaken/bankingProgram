import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  Settings, 
  LogOut, 
  Eye,
  EyeOff,
  Monitor
} from 'lucide-react';
import { AccountSummary } from './AccountSummary';
import { TransactionForms } from './TransactionForms';
import { TransactionHistory } from './TransactionHistory';
import { ATMInterface } from './ATMInterface';

interface BankingDashboardProps {
  accountNumber: string;
  onLogout: () => void;
}

export function BankingDashboard({ accountNumber, onLogout }: BankingDashboardProps) {
  const [balance, setBalance] = useState(2500.75);
  const [showBalance, setShowBalance] = useState(true);
  const [showATM, setShowATM] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'deposit', amount: 1000, date: '2024-01-15', description: 'Salary deposit' },
    { id: 2, type: 'withdraw', amount: 150, date: '2024-01-14', description: 'ATM withdrawal' },
    { id: 3, type: 'deposit', amount: 500, date: '2024-01-12', description: 'Transfer from savings' },
    { id: 4, type: 'withdraw', amount: 75.50, date: '2024-01-10', description: 'Online purchase' },
    { id: 5, type: 'deposit', amount: 250, date: '2024-01-08', description: 'Freelance payment' }
  ]);

  const handleTransaction = (type: 'deposit' | 'withdraw', amount: number, description: string) => {
    const newBalance = type === 'deposit' ? balance + amount : balance - amount;
    
    if (type === 'withdraw' && newBalance < 0) {
      alert('Insufficient funds!');
      return;
    }
    
    setBalance(newBalance);
    
    const newTransaction = {
      id: Date.now(),
      type,
      amount,
      date: new Date().toISOString().split('T')[0],
      description
    };
    
    setTransactions([newTransaction, ...transactions]);
  };

  if (showATM) {
    return (
      <ATMInterface 
        accountNumber={accountNumber}
        balance={balance}
        onTransaction={handleTransaction}
        onExit={() => setShowATM(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl">SecureBank</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowATM(true)}
              >
                <Monitor className="mr-2 h-4 w-4" />
                ATM Mode
              </Button>
              <Badge variant="secondary">Account: {accountNumber}</Badge>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl mb-2">Welcome back!</h2>
          <p className="text-gray-600">Manage your account and transactions</p>
        </div>

        {/* Account Summary */}
        <div className="mb-8">
          <AccountSummary 
            balance={balance}
            showBalance={showBalance}
            onToggleBalance={() => setShowBalance(!showBalance)}
            accountNumber={accountNumber}
          />
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">New Transaction</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
                  <History className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{transactions.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Last transaction: {transactions[0]?.date}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Deposits</CardTitle>
                  <ArrowDownLeft className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ${transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Withdrawals</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    ${transactions.filter(t => t.type === 'withdraw').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionForms onTransaction={handleTransaction} balance={balance} />
          </TabsContent>

          <TabsContent value="history">
            <TransactionHistory transactions={transactions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}