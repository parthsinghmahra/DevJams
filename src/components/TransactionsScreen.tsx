import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useTransactions } from './TransactionContext';
import { 
  Search, 
  Filter, 
  Coffee, 
  Bus, 
  ShoppingBag, 
  Gamepad2, 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  ShoppingCart,
  GraduationCap,
  Zap,
  Gift,
  Sparkles,
  Utensils,
  Plus
} from 'lucide-react';

interface TransactionsScreenProps {
  onAddTransaction?: () => void;
}

export function TransactionsScreen({ onAddTransaction }: TransactionsScreenProps = {}) {
  const { transactions, totalIncome, totalExpenses } = useTransactions();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'income') return transaction.amount > 0;
    if (selectedFilter === 'expense') return transaction.amount < 0;
    return transaction.category.toLowerCase() === selectedFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const groupTransactionsByDate = (transactions: typeof filteredTransactions) => {
    const grouped: { [key: string]: typeof transactions } = {};
    
    transactions.forEach(transaction => {
      const dateKey = formatDate(transaction.date);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(transaction);
    });
    
    return grouped;
  };

  const groupedTransactions = groupTransactionsByDate(filteredTransactions);

  return (
    <div className="min-h-screen p-4" style={{ background: 'var(--gradient-secondary)' }}>
      <div className="max-w-sm mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Transactions</h1>
          
          {/* Filter Tabs */}
          <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="income" className="text-xs">Income</TabsTrigger>
              <TabsTrigger value="expense" className="text-xs">Expense</TabsTrigger>
              <TabsTrigger value="food & dining" className="text-xs">Food</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Quick Filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <Button 
              variant={selectedFilter === 'groceries' ? 'default' : 'outline'} 
              size="sm" 
              className="rounded-full whitespace-nowrap"
              onClick={() => setSelectedFilter('groceries')}
            >
              Groceries
            </Button>
            <Button 
              variant={selectedFilter === 'transport' ? 'default' : 'outline'} 
              size="sm" 
              className="rounded-full whitespace-nowrap"
              onClick={() => setSelectedFilter('transport')}
            >
              Transport
            </Button>
            <Button 
              variant={selectedFilter === 'entertainment' ? 'default' : 'outline'} 
              size="sm" 
              className="rounded-full whitespace-nowrap"
              onClick={() => setSelectedFilter('entertainment')}
            >
              Entertainment
            </Button>
            <Button 
              variant={selectedFilter === 'festivals' ? 'default' : 'outline'} 
              size="sm" 
              className="rounded-full whitespace-nowrap"
              onClick={() => setSelectedFilter('festivals')}
            >
              Festivals
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Income</p>
                  <p className="text-lg font-bold text-emerald-600">+₹{totalIncome.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ArrowDownRight className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Expenses</p>
                  <p className="text-lg font-bold text-red-600">-₹{totalExpenses.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {transactions.length > 0 ? (
            Object.entries(groupedTransactions).map(([date, dayTransactions]) => (
              <div key={date} className="space-y-3">
                <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{date}</span>
                </div>
                
                <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    {dayTransactions.map((transaction, index) => {
                      const IconComponent = transaction.icon;
                      return (
                        <div 
                          key={transaction.id} 
                          className={`flex items-center justify-between p-4 ${
                            index !== dayTransactions.length - 1 ? 'border-b border-gray-100' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${transaction.color}`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" className="text-xs">
                                  {transaction.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p 
                              className={`font-bold ${
                                transaction.amount > 0 ? 'text-emerald-600' : 'text-foreground'
                              }`}
                            >
                              {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="p-4 rounded-full bg-gray-100 w-20 h-20 mx-auto flex items-center justify-center">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">No transactions yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Start tracking your spending and income by adding your first transaction
                    </p>
                  </div>
                  <Button 
                    className="rounded-xl" 
                    style={{ background: 'var(--gradient-primary)' }}
                    onClick={onAddTransaction}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transaction
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}