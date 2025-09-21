import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Shield, 
  Bell, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Eye,
  Settings,
  Calendar,
  CreditCard,
  Target,
  Clock,
  CheckCircle
} from 'lucide-react';

const childData = {
  name: 'Alex Johnson',
  balance: 89247,
  weeklySpending: 5890,
  weeklyLimit: 7000,
  savingsGoals: 3,
  completedGoals: 1
};

const recentAlerts = [
  {
    id: 1,
    type: 'spending',
    message: 'Alex spent $45 on entertainment in one day',
    time: '2 hours ago',
    severity: 'warning'
  },
  {
    id: 2,
    type: 'goal',
    message: 'Alex is ahead of schedule on laptop savings goal',
    time: '1 day ago',
    severity: 'success'
  },
  {
    id: 3,
    type: 'limit',
    message: 'Weekly spending limit reached 80%',
    time: '3 days ago',
    severity: 'warning'
  }
];

const spendingLimits = [
  { category: 'Entertainment', limit: 3000, spent: 2100, enabled: true },
  { category: 'Food & Dining', limit: 5000, spent: 2800, enabled: true },
  { category: 'Shopping', limit: 2000, spent: 900, enabled: false },
  { category: 'Transport', limit: 1500, spent: 800, enabled: true }
];

export function ParentalControlsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [spendingAlertsEnabled, setSpendingAlertsEnabled] = useState(true);
  const [weeklyReportsEnabled, setWeeklyReportsEnabled] = useState(true);

  const weeklyProgress = (childData.weeklySpending / childData.weeklyLimit) * 100;

  return (
    <div className="min-h-screen p-4" style={{ background: 'var(--gradient-secondary)' }}>
      <div className="max-w-sm mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Parental Controls</h1>
              <p className="text-muted-foreground">Managing {childData.name}'s account</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'var(--gradient-primary)' }}>
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Child Overview */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Account Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-emerald-50">
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-xl font-bold text-emerald-600">₹{childData.balance.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-blue-50">
                <p className="text-sm text-muted-foreground">Savings Goals</p>
                <p className="text-xl font-bold text-blue-600">{childData.savingsGoals}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Weekly Spending</span>
                <span className="font-medium">
                  ₹{childData.weeklySpending.toLocaleString()} / ₹{childData.weeklyLimit.toLocaleString()}
                </span>
              </div>
              <Progress value={weeklyProgress} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {weeklyProgress > 80 ? '⚠️ Close to limit' : '✅ Within budget'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2 rounded-xl"
          >
            <DollarSign className="h-6 w-6" />
            <span className="text-sm">Send Money</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2 rounded-xl"
          >
            <Settings className="h-6 w-6" />
            <span className="text-sm">Adjust Limits</span>
          </Button>
        </div>

        {/* Alerts & Notifications */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Recent Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <Alert key={alert.id} className="rounded-xl">
                <div className="flex items-start space-x-3">
                  {alert.severity === 'warning' ? (
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <AlertDescription className="text-sm">
                      {alert.message}
                    </AlertDescription>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.time}
                    </p>
                  </div>
                </div>
              </Alert>
            ))}
            <Button variant="outline" size="sm" className="w-full rounded-xl">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Spending Limits */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Spending Limits</span>
            </CardTitle>
            <CardDescription>Set and monitor category spending limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {spendingLimits.map((limit, index) => {
              const progress = (limit.spent / limit.limit) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{limit.category}</span>
                      <Switch 
                        checked={limit.enabled}
                        onCheckedChange={() => {}}
                        size="sm"
                      />
                    </div>
                    <Badge variant={progress > 80 ? "destructive" : "secondary"}>
                      ₹{limit.spent.toLocaleString()}/₹{limit.limit.toLocaleString()}
                    </Badge>
                  </div>
                  {limit.enabled && (
                    <Progress 
                      value={progress} 
                      className={`h-2 ${progress > 80 ? 'text-red-500' : ''}`} 
                    />
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive alerts on your phone</p>
              </div>
              <Switch 
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Spending Alerts</p>
                <p className="text-sm text-muted-foreground">Alert when limits are reached</p>
              </div>
              <Switch 
                checked={spendingAlertsEnabled}
                onCheckedChange={setSpendingAlertsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">Summary of spending and savings</p>
              </div>
              <Switch 
                checked={weeklyReportsEnabled}
                onCheckedChange={setWeeklyReportsEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Actions */}
        <Card className="border-0 shadow-lg bg-red-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              <span>Emergency Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full rounded-xl border-red-200 text-red-700 hover:bg-red-100">
              Freeze Card Temporarily
            </Button>
            <Button variant="outline" className="w-full rounded-xl border-red-200 text-red-700 hover:bg-red-100">
              Block Online Purchases
            </Button>
            <p className="text-xs text-red-600 text-center">
              Use these options only in emergency situations
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}