import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Users, 
  Trophy, 
  Star, 
  Target, 
  Plus, 
  Crown,
  Medal,
  Gift,
  TrendingUp,
  Zap,
  Flame,
  UserPlus
} from 'lucide-react';

const friends = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: '/api/placeholder/40/40',
    rank: 1,
    points: 2450,
    savingsGoals: 5,
    monthlyBudget: 8000,
    spent: 6200,
    badges: ['Saver', 'Goal Crusher', 'Budget Master']
  },
  {
    id: 2,
    name: 'Alex Johnson',
    avatar: '/api/placeholder/40/40',
    rank: 2,
    points: 2180,
    savingsGoals: 3,
    monthlyBudget: 7500,
    spent: 5890,
    badges: ['Saver', 'Smart Spender']
  },
  {
    id: 3,
    name: 'Rahul Patel',
    avatar: '/api/placeholder/40/40',
    rank: 3,
    points: 1950,
    savingsGoals: 4,
    monthlyBudget: 9000,
    spent: 7100,
    badges: ['Goal Setter']
  },
  {
    id: 4,
    name: 'Ananya Singh',
    avatar: '/api/placeholder/40/40',
    rank: 4,
    points: 1720,
    savingsGoals: 2,
    monthlyBudget: 6500,
    spent: 5200,
    badges: ['Budget Pro']
  }
];

const challenges = [
  {
    id: 1,
    title: 'Festival Savings Challenge',
    description: 'Save ₹5,000 for Diwali celebrations',
    participants: 12,
    daysLeft: 45,
    reward: 500,
    progress: 60,
    joined: true
  },
  {
    id: 2,
    title: 'No Food Delivery Week',
    description: 'Cook at home for 7 days straight',
    participants: 8,
    daysLeft: 3,
    reward: 200,
    progress: 85,
    joined: true
  },
  {
    id: 3,
    title: 'Public Transport Month',
    description: 'Use only public transport for a month',
    participants: 15,
    daysLeft: 18,
    reward: 300,
    progress: 0,
    joined: false
  }
];

const badges = [
  { name: 'Saver', icon: '💰', description: 'Saved 80% of monthly budget' },
  { name: 'Goal Crusher', icon: '🎯', description: 'Completed 3 savings goals' },
  { name: 'Budget Master', icon: '📊', description: 'Stayed within budget for 3 months' },
  { name: 'Smart Spender', icon: '🧠', description: 'Made wise spending choices' },
  { name: 'Festival Saver', icon: '🪔', description: 'Saved for festivals in advance' }
];

export function FriendsScreen() {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [friendCode, setFriendCode] = useState('');

  const currentUser = friends[1]; // Alex Johnson

  return (
    <div className="min-h-screen p-4" style={{ background: 'var(--gradient-secondary)' }}>
      <div className="max-w-sm mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Friends</h1>
            <p className="text-muted-foreground">Compete and save together</p>
          </div>
          <Dialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-full" style={{ background: 'var(--gradient-primary)' }}>
                <UserPlus className="h-4 w-4 mr-1" />
                Add Friend
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%] max-w-sm mx-auto rounded-xl bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 border-0 shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-teal-700">Add Friend</DialogTitle>
                <DialogDescription className="text-teal-600">
                  Enter your friend's code to connect
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="friend-code" className="text-teal-700">Friend Code</Label>
                  <Input
                    id="friend-code"
                    placeholder="ALEX2024"
                    value={friendCode}
                    onChange={(e) => setFriendCode(e.target.value)}
                    className="rounded-xl bg-white/80 border-teal-200 focus:border-teal-400"
                  />
                </div>
                <div className="text-center p-4 bg-white/60 rounded-xl border border-teal-200">
                  <p className="text-sm text-teal-600 mb-2">Your friend code:</p>
                  <p className="font-bold text-teal-700 text-lg">ALEX2024</p>
                </div>
                <Button 
                  className="w-full rounded-xl text-white" 
                  style={{ background: 'var(--gradient-primary)' }}
                  onClick={() => setIsAddFriendOpen(false)}
                >
                  Send Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* My Stats */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-amber-500" />
              <span>Your Rank</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {currentUser.rank}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{currentUser.name}</h3>
                <p className="text-muted-foreground">#{currentUser.rank} in your group</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span className="font-medium">{currentUser.points}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4 text-teal-600" />
                    <span className="text-sm">{currentUser.savingsGoals} goals</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Budget</span>
                <span className="font-medium">₹{currentUser.spent.toLocaleString()} / ₹{currentUser.monthlyBudget.toLocaleString()}</span>
              </div>
              <Progress value={(currentUser.spent / currentUser.monthlyBudget) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="leaderboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          {/* Leaderboard */}
          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  <span>This Month's Leaderboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {friends.map((friend, index) => (
                  <div key={friend.id} className={`flex items-center space-x-3 p-3 rounded-xl ${
                    friend.id === currentUser.id ? 'bg-teal-50 border border-teal-200' : 'bg-gray-50'
                  }`}>
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {index < 3 && (
                        <div className={`absolute -top-1 -right-1 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-amber-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          'bg-amber-600 text-white'
                        }`}>
                          {index === 0 ? <Crown className="h-3 w-3" /> : friend.rank}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{friend.name}</h4>
                        <div className="flex items-center space-x-1">
                          <Zap className="h-4 w-4 text-amber-500" />
                          <span className="font-bold">{friend.points}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{friend.savingsGoals} goals</span>
                        <span>₹{friend.spent.toLocaleString()} spent</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Challenges */}
          <TabsContent value="challenges" className="space-y-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </div>
                    <Badge variant={challenge.joined ? "default" : "secondary"}>
                      {challenge.joined ? 'Joined' : 'Available'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{challenge.participants} participants</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Gift className="h-4 w-4 text-muted-foreground" />
                      <span>₹{challenge.reward} reward</span>
                    </div>
                  </div>
                  
                  {challenge.joined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {challenge.daysLeft} days left
                    </span>
                    <Button 
                      size="sm" 
                      variant={challenge.joined ? "outline" : "default"}
                      className="rounded-xl"
                    >
                      {challenge.joined ? 'View Progress' : 'Join Challenge'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Badges */}
          <TabsContent value="badges" className="space-y-4">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Medal className="h-5 w-5 text-amber-500" />
                  <span>Your Badges</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {badges.map((badge, index) => {
                    const earned = currentUser.badges.includes(badge.name);
                    return (
                      <div 
                        key={index} 
                        className={`p-4 rounded-xl text-center space-y-2 ${
                          earned ? 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200' : 'bg-gray-50'
                        }`}
                      >
                        <div className={`text-3xl ${earned ? '' : 'grayscale opacity-50'}`}>
                          {badge.icon}
                        </div>
                        <div>
                          <p className={`font-medium ${earned ? 'text-amber-700' : 'text-muted-foreground'}`}>
                            {badge.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="font-bold text-xl">7</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    <span className="font-bold text-xl">₹2,340</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Saved This Month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}