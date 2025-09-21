import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useTransactions } from './TransactionContext';
import { 
  Target, 
  Plus, 
  Laptop, 
  Car, 
  GraduationCap, 
  Smartphone,
  Calendar,
  DollarSign,
  TrendingUp,
  Trophy
} from 'lucide-react';

const savingsGoals = [
  {
    id: 1,
    title: 'New Laptop',
    description: 'MacBook Air for college',
    target: 80000,
    saved: 58920,
    deadline: '2024-06-01',
    icon: Laptop,
    color: 'text-blue-600 bg-blue-100',
    category: 'Education'
  },
  {
    id: 2,
    title: 'Emergency Fund',
    description: 'Safety net for unexpected expenses',
    target: 30000,
    saved: 19440,
    deadline: '2024-12-31',
    icon: Target,
    color: 'text-emerald-600 bg-emerald-100',
    category: 'Security'
  },
  {
    id: 3,
    title: 'Bike Fund',
    description: 'First bike for college commute',
    target: 120000,
    saved: 45000,
    deadline: '2025-08-01',
    icon: Car,
    color: 'text-purple-600 bg-purple-100',
    category: 'Transportation'
  },
  {
    id: 4,
    title: 'College Textbooks',
    description: 'Books for next semester',
    target: 15000,
    saved: 15000,
    deadline: '2024-01-20',
    icon: GraduationCap,
    color: 'text-amber-600 bg-amber-100',
    category: 'Education'
  }
];

export function SavingsGoalsScreen() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    deadline: ''
  });

  const calculateProgress = (saved: number, target: number) => {
    return Math.min((saved / target) * 100, 100);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const targetDate = new Date(deadline);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const activeGoals = savingsGoals.filter(goal => calculateProgress(goal.saved, goal.target) < 100);
  const completedGoals = savingsGoals.filter(goal => calculateProgress(goal.saved, goal.target) >= 100);

  return (
    <div className="min-h-screen p-4" style={{ background: 'var(--gradient-secondary)' }}>
      <div className="max-w-sm mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Savings Goals</h1>
            <p className="text-muted-foreground">Track your financial targets</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-full" style={{ background: 'var(--gradient-primary)' }}>
                <Plus className="h-4 w-4 mr-1" />
                New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%] max-w-sm mx-auto rounded-xl">
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
                <DialogDescription>
                  Set a new savings target to work towards
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-title">Goal Title</Label>
                  <Input
                    id="goal-title"
                    placeholder="e.g., Summer Vacation"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-target">Target Amount</Label>
                  <Input
                    id="goal-target"
                    type="number"
                    placeholder="1000"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-deadline">Target Date</Label>
                  <Input
                    id="goal-deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <Button 
                  className="w-full rounded-xl" 
                  style={{ background: 'var(--gradient-primary)' }}
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Create Goal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-100">
                  <Target className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Goals</p>
                  <p className="text-xl font-bold">{activeGoals.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-amber-100">
                  <Trophy className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-xl font-bold">{completedGoals.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Message */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-50 to-cyan-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-teal-100">
                <TrendingUp className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p className="font-medium">Keep it up! 🎉</p>
                <p className="text-sm text-muted-foreground">You're 74% closer to your laptop goal!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Goals */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Active Goals</h2>
          {activeGoals.map((goal) => {
            const IconComponent = goal.icon;
            const progress = calculateProgress(goal.saved, goal.target);
            const remaining = goal.target - goal.saved;
            const daysLeft = getDaysUntilDeadline(goal.deadline);
            
            return (
              <Card key={goal.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${goal.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">{goal.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        ₹{goal.saved.toLocaleString()} of ₹{goal.target.toLocaleString()}
                      </span>
                      <span className="font-medium">{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Remaining:</span>
                      <span className="font-medium">₹{remaining.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 rounded-xl">
                      Add Money
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 rounded-xl">
                      Edit Goal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Completed Goals 🎉</h2>
            {completedGoals.map((goal) => {
              const IconComponent = goal.icon;
              
              return (
                <Card key={goal.id} className="border-0 shadow-md bg-gradient-to-r from-emerald-50 to-teal-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${goal.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{goal.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Completed on {formatDeadline(goal.deadline)}
                          </p>
                        </div>
                      </div>
                      <Trophy className="h-6 w-6 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}