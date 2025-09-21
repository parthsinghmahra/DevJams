import { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Coffee, 
  Bus, 
  ShoppingBag, 
  Gamepad2, 
  ArrowUpRight,
  ShoppingCart,
  GraduationCap,
  Zap,
  Gift,
  Sparkles,
  Utensils,
  Home,
  Heart,
  Phone,
  Car
} from 'lucide-react';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  icon: any;
  color: string;
  type: 'income' | 'expense';
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'icon' | 'color'>) => void;
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsGoal: {
    current: number;
    target: number;
    name: string;
  };
  setSavingsGoal: (goal: { current: number; target: number; name: string }) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

const getCategoryIcon = (category: string) => {
  const categoryMap: { [key: string]: any } = {
    'food & dining': Utensils,
    'transport': Bus,
    'income': ArrowUpRight,
    'groceries': ShoppingCart,
    'entertainment': Gamepad2,
    'education': GraduationCap,
    'utilities': Zap,
    'festivals': Sparkles,
    'gifts': Gift,
    'home': Home,
    'healthcare': Heart,
    'mobile/internet': Phone,
    'auto/petrol': Car,
    'salary': ArrowUpRight,
    'allowance': ArrowUpRight,
    'part-time job': ArrowUpRight,
    'freelance': ArrowUpRight,
    'gift': Gift,
    'other': ShoppingBag
  };
  
  return categoryMap[category.toLowerCase()] || ShoppingBag;
};

const getCategoryColor = (category: string, type: 'income' | 'expense') => {
  if (type === 'income') {
    return 'text-emerald-600 bg-emerald-100';
  }
  
  const colorMap: { [key: string]: string } = {
    'food & dining': 'text-amber-600 bg-amber-100',
    'transport': 'text-blue-600 bg-blue-100',
    'groceries': 'text-emerald-600 bg-emerald-100',
    'entertainment': 'text-pink-600 bg-pink-100',
    'education': 'text-purple-600 bg-purple-100',
    'utilities': 'text-cyan-600 bg-cyan-100',
    'festivals': 'text-orange-600 bg-orange-100',
    'gifts': 'text-rose-600 bg-rose-100',
    'home': 'text-slate-600 bg-slate-100',
    'healthcare': 'text-red-600 bg-red-100',
    'mobile/internet': 'text-indigo-600 bg-indigo-100',
    'auto/petrol': 'text-teal-600 bg-teal-100'
  };
  
  return colorMap[category.toLowerCase()] || 'text-gray-600 bg-gray-100';
};

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savingsGoal, setSavingsGoalState] = useState({
    current: 0,
    target: 80000,
    name: 'Laptop Fund'
  });

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'icon' | 'color'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now(),
      icon: getCategoryIcon(transactionData.category),
      color: getCategoryColor(transactionData.category, transactionData.type)
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // If it's income, add to savings goal (simplified logic)
    if (transactionData.type === 'income') {
      setSavingsGoalState(prev => ({
        ...prev,
        current: Math.min(prev.current + (transactionData.amount * 0.1), prev.target) // 10% auto-save
      }));
    }
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const setSavingsGoal = (goal: { current: number; target: number; name: string }) => {
    setSavingsGoalState(goal);
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      balance,
      totalIncome,
      totalExpenses,
      savingsGoal,
      setSavingsGoal
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}