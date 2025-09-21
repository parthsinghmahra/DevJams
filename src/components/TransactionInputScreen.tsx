import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useTransactions } from './TransactionContext';
import { 
  Plus, 
  Minus, 
  Check, 
  ArrowLeft,
  ShoppingCart,
  Car,
  Coffee,
  GraduationCap,
  Home,
  Zap,
  Heart,
  Gamepad2,
  Gift,
  Sparkles,
  Bus,
  Phone,
  Utensils
} from 'lucide-react';

const indianCategories = [
  { id: 'groceries', name: 'Groceries', icon: ShoppingCart, color: 'bg-emerald-100 text-emerald-700' },
  { id: 'food', name: 'Food & Dining', icon: Utensils, color: 'bg-amber-100 text-amber-700' },
  { id: 'transport', name: 'Transport', icon: Bus, color: 'bg-blue-100 text-blue-700' },
  { id: 'education', name: 'Education', icon: GraduationCap, color: 'bg-purple-100 text-purple-700' },
  { id: 'utilities', name: 'Utilities', icon: Zap, color: 'bg-cyan-100 text-cyan-700' },
  { id: 'healthcare', name: 'Healthcare', icon: Heart, color: 'bg-red-100 text-red-700' },
  { id: 'entertainment', name: 'Entertainment', icon: Gamepad2, color: 'bg-pink-100 text-pink-700' },
  { id: 'festivals', name: 'Festivals', icon: Sparkles, color: 'bg-orange-100 text-orange-700' },
  { id: 'gifts', name: 'Gifts', icon: Gift, color: 'bg-rose-100 text-rose-700' },
  { id: 'home', name: 'Home', icon: Home, color: 'bg-slate-100 text-slate-700' },
  { id: 'mobile', name: 'Mobile/Internet', icon: Phone, color: 'bg-indigo-100 text-indigo-700' },
  { id: 'auto', name: 'Auto/Petrol', icon: Car, color: 'bg-teal-100 text-teal-700' }
];

const quickAmounts = [50, 100, 200, 500, 1000, 2000];

interface TransactionInputScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export function TransactionInputScreen({ onBack, onSave }: TransactionInputScreenProps) {
  const { addTransaction } = useTransactions();
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
    setSelectedQuickAmount(quickAmount);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setSelectedQuickAmount(null);
  };

  const handleSave = () => {
    if (!amount || !category) return;

    const transaction = {
      amount: transactionType === 'expense' ? -parseFloat(amount) : parseFloat(amount),
      category,
      description: description || getCategoryName(category),
      date,
      type: transactionType
    };

    addTransaction(transaction);
    onSave();
  };

  const getCategoryName = (categoryId: string) => {
    return indianCategories.find(cat => cat.id === categoryId)?.name || '';
  };

  const getCategoryIcon = (categoryId: string) => {
    return indianCategories.find(cat => cat.id === categoryId)?.icon || ShoppingCart;
  };

  const getCategoryColor = (categoryId: string) => {
    return indianCategories.find(cat => cat.id === categoryId)?.color || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen p-4" style={{ background: 'var(--gradient-secondary)' }}>
      <div className="max-w-sm mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add Transaction</h1>
            <p className="text-muted-foreground">Record your spending or income</p>
          </div>
        </div>

        {/* Transaction Type */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={transactionType === 'expense' ? 'default' : 'outline'}
                onClick={() => setTransactionType('expense')}
                className="h-12 rounded-xl"
                style={transactionType === 'expense' ? { background: 'var(--gradient-primary)' } : {}}
              >
                <Minus className="h-4 w-4 mr-2" />
                Expense
              </Button>
              <Button
                variant={transactionType === 'income' ? 'default' : 'outline'}
                onClick={() => setTransactionType('income')}
                className="h-12 rounded-xl"
                style={transactionType === 'income' ? { background: 'var(--gradient-accent)' } : {}}
              >
                <Plus className="h-4 w-4 mr-2" />
                Income
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Amount Input */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle>Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                ₹
              </div>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="pl-8 text-2xl font-bold h-14 rounded-xl"
              />
            </div>
            
            {/* Quick Amount Buttons */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Quick amounts</Label>
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant={selectedQuickAmount === quickAmount ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleQuickAmount(quickAmount)}
                    className="rounded-xl"
                  >
                    ₹{quickAmount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle>Category</CardTitle>
            <CardDescription>
              {transactionType === 'expense' ? 'What did you spend on?' : 'Source of income'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {transactionType === 'expense' ? (
              <div className="grid grid-cols-2 gap-3">
                {indianCategories.map((cat) => {
                  const IconComponent = cat.icon;
                  const isSelected = category === cat.id;
                  
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isSelected 
                          ? 'border-teal-500 bg-teal-50' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`p-2 rounded-lg ${cat.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium text-center">
                          {cat.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {['Salary', 'Allowance', 'Part-time Job', 'Freelance', 'Gift', 'Other'].map((incomeType) => (
                  <button
                    key={incomeType}
                    onClick={() => setCategory(incomeType.toLowerCase())}
                    className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                      category === incomeType.toLowerCase()
                        ? 'border-teal-500 bg-teal-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {incomeType}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle>Description (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add a note about this transaction..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl resize-none"
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Date */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle>Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-xl"
            />
          </CardContent>
        </Card>

        {/* Preview */}
        {amount && category && (
          <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-50 to-cyan-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-teal-600" />
                <span>Transaction Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {transactionType === 'expense' && (
                    <div className={`p-2 rounded-lg ${getCategoryColor(category)}`}>
                      {(() => {
                        const IconComponent = getCategoryIcon(category);
                        return <IconComponent className="h-5 w-5" />;
                      })()}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">
                      {description || getCategoryName(category)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    transactionType === 'income' ? 'text-emerald-600' : 'text-foreground'
                  }`}>
                    {transactionType === 'income' ? '+' : '-'}₹{parseFloat(amount).toLocaleString()}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {transactionType === 'expense' ? getCategoryName(category) : category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <div className="space-y-4 pb-8">
          <Button
            onClick={handleSave}
            disabled={!amount || !category}
            className="w-full h-12 rounded-xl text-white"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Check className="h-4 w-4 mr-2" />
            Save Transaction
          </Button>
        </div>
      </div>
    </div>
  );
}