import React from 'react';
import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { BankingDashboard } from './components/BankingDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');

  const handleLogin = (accNum: string, pin: string) => {
    setAccountNumber(accNum);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccountNumber('');
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <BankingDashboard 
      accountNumber={accountNumber}
      onLogout={handleLogout}
    />
  );
}