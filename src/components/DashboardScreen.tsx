import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { useTransactions } from './TransactionContext';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight,
  PiggyBank,
  CreditCard,
  Users,
  Trophy,
  Zap,
  Plus
} from 'lucide-react';

export function DashboardScreen() {
  const { transactions, balance, totalIncome, totalExpenses, savingsGoal } = useTransactions();

  // Calculate spending by category
  const getSpendingData = () => {
    const categorySpending: { [key: string]: number } = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const category = t.category;
        categorySpending[category] = (categorySpending[category] || 0) + Math.abs(t.amount);
      });

    const colors = ['#0891b2', '#06b6d4', '#10b981', '#059669', '#0f766e', '#f59e0b', '#ef4444'];
    
    return Object.entries(categorySpending)
      .map(([name, value], index) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: colors[index % colors.length]
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  const spendingData = getSpendingData();

  // Mock data for charts when no transactions exist
  const friendsComparison = [
    { name: 'You', spent: totalExpenses, budget: 8000 },
    { name: 'Priya', spent: 6200, budget: 8000 },
    { name: 'Rahul', spent: 7100, budget: 9000 },
    { name: 'Ananya', spent: 5200, budget: 6500 }
  ];

  const weeklySpending = [
    { day: 'Mon', amount: 0, friends: 220 },
    { day: 'Tue', amount: 0, friends: 150 },
    { day: 'Wed', amount: 0, friends: 280 },
    { day: 'Thu', amount: 0, friends: 300 },
    { day: 'Fri', amount: 0, friends: 380 },
    { day: 'Sat', amount: 0, friends: 320 },
    { day: 'Sun', amount: 0, friends: 190 }
  ];
  return (
    <div className="min-h-screen p-4 space-y-6" style={{ background: 'var(--gradient-secondary)' }}>
      <div className="max-w-sm mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hey Alex! 👋</h1>
            <p className="text-muted-foreground">Here's your financial overview</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-amber-100 px-2 py-1 rounded-full">
              <Trophy className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">#2</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-3xl font-bold">₹{balance.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl" style={{ background: 'var(--gradient-primary)' }}>
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-emerald-600">
                <ArrowUpRight className="h-4 w-4" />
                <span>+₹{totalIncome.toLocaleString()} total income</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 rounded-lg bg-emerald-100">
                  <PiggyBank className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Saved</p>
                  <p className="text-lg font-bold">₹{savingsGoal.current.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 rounded-lg bg-cyan-100">
                  <CreditCard className="h-5 w-5 text-cyan-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Spent</p>
                  <p className="text-lg font-bold">₹{totalExpenses.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 rounded-lg bg-amber-100">
                  <Zap className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Points</p>
                  <p className="text-lg font-bold">2,180</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spending Chart */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Spending Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {spendingData.length > 0 ? (
              <>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={spendingData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="value"
                      >
                        {spendingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 text-sm">
                  {spendingData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-medium">₹{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 rounded-full bg-gray-100">
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-600">No spending data yet</p>
                  <p className="text-sm text-gray-400">Add your first transaction to see insights</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Savings Goal */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>{savingsGoal.name}</span>
            </CardTitle>
            <CardDescription>₹{savingsGoal.current.toLocaleString()} of ₹{savingsGoal.target.toLocaleString()} saved</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={Math.round((savingsGoal.current / savingsGoal.target) * 100)} className="mb-4" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{Math.round((savingsGoal.current / savingsGoal.target) * 100)}% complete</span>
              <span className="font-medium">₹{(savingsGoal.target - savingsGoal.current).toLocaleString()} to go</span>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-50 to-cyan-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-teal-600" />
              <span>AI Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.length > 0 ? (
              <>
                <div className="p-3 rounded-lg bg-white/60">
                  <p className="text-sm">🎉 Great start! You've recorded {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}.</p>
                </div>
                {totalExpenses > 0 && (
                  <div className="p-3 rounded-lg bg-white/60">
                    <p className="text-sm">💰 Your current spending is ₹{totalExpenses.toLocaleString()}. Keep tracking to see patterns!</p>
                  </div>
                )}
                {savingsGoal.current > 0 && (
                  <div className="p-3 rounded-lg bg-white/60">
                    <p className="text-sm">🎯 You're {Math.round((savingsGoal.current / savingsGoal.target) * 100)}% towards your {savingsGoal.name} goal!</p>
                  </div>
                )}
              </>
            ) : (
              <div className="p-3 rounded-lg bg-white/60">
                <p className="text-sm">👋 Welcome! Start by adding your first transaction to see personalized insights.</p>
              </div>
            )}
            <Button variant="outline" className="w-full rounded-xl">
              View More Tips
            </Button>
          </CardContent>
        </Card>

        {/* Friends Comparison */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Friends Spending Comparison</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={friendsComparison}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value, name) => [
                      `₹${value.toLocaleString()}`, 
                      name === 'spent' ? 'Spent' : 'Budget'
                    ]} 
                  />
                  <Bar dataKey="budget" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="spent" fill="#0891b2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground mt-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded bg-gray-300"></div>
                <span>Budget</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded bg-cyan-600"></div>
                <span>Spent</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Spending Trend */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle>Weekly Spending: You vs Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklySpending}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Tooltip formatter={(value, name) => [
                    `₹${value}`, 
                    name === 'amount' ? 'You' : 'Friends Avg'
                  ]} />
                  <Line 
                    type="monotone" 
                    dataKey="friends" 
                    stroke="#94a3b8" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#94a3b8', strokeWidth: 2, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#0891b2" 
                    strokeWidth={3}
                    dot={{ fill: '#0891b2', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground mt-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-1 rounded bg-slate-400"></div>
                <span>Friends Average</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-1 rounded bg-cyan-600"></div>
                <span>Your Spending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}