import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { TransactionsScreen } from './components/TransactionsScreen';
import { SavingsGoalsScreen } from './components/SavingsGoalsScreen';
import { ParentalControlsScreen } from './components/ParentalControlsScreen';
import { FriendsScreen } from './components/FriendsScreen';
import { TransactionInputScreen } from './components/TransactionInputScreen';
import { Navigation } from './components/Navigation';
import { TransactionProvider } from './components/TransactionContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showTransactionInput, setShowTransactionInput] = useState(false);
  const [username, setUsername] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  const handleLogin = (newUsername?: string) => {
    setIsLoggedIn(true);
    if (newUsername) {
      setUsername(newUsername);
      setShowWelcome(true);
    }
  };

  const handleAddTransaction = () => {
    setShowTransactionInput(true);
  };

  const handleTransactionSave = () => {
    setShowTransactionInput(false);
  };

  const renderScreen = () => {
    if (showWelcome) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: 'var(--gradient-secondary)' }}>
          <div className="text-center space-y-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 w-24 h-24 mx-auto flex items-center justify-center text-white text-3xl font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome, {username}! 🎉</h1>
              <p className="text-lg text-muted-foreground mt-2">
                You're all set to start your financial journey with FinanT!
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Start by adding your first transaction to see personalized insights
              </p>
              <button 
                onClick={() => setShowWelcome(false)}
                className="px-6 py-3 rounded-xl text-white font-medium"
                style={{ background: 'var(--gradient-primary)' }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (showTransactionInput) {
      return (
        <TransactionInputScreen 
          onBack={() => setShowTransactionInput(false)}
          onSave={handleTransactionSave}
        />
      );
    }

    switch (activeScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'transactions':
        return <TransactionsScreen onAddTransaction={handleAddTransaction} />;
      case 'friends':
        return <FriendsScreen />;
      case 'savings':
        return <SavingsGoalsScreen />;
      case 'parental':
        return <ParentalControlsScreen />;
      case 'profile':
        return (
          <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--gradient-secondary)' }}>
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                {username ? username.charAt(0).toUpperCase() : 'A'}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{username || 'Alex Johnson'}</h2>
                <p className="text-muted-foreground">alex.johnson@email.com</p>
              </div>
              <div className="space-y-2 pt-4">
                <button 
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUsername('');
                    setShowWelcome(false);
                    setActiveScreen('dashboard');
                  }}
                  className="w-full p-3 rounded-xl bg-red-100 text-red-700 font-medium hover:bg-red-200 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <DashboardScreen />;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <TransactionProvider>
      <div className="min-h-screen">
        <div className="pb-20">
          {renderScreen()}
        </div>
        {!showTransactionInput && (
          <Navigation 
            activeScreen={activeScreen} 
            onScreenChange={setActiveScreen}
            onAddTransaction={handleAddTransaction}
          />
        )}
      </div>
    </TransactionProvider>
  );
}