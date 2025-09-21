import { 
  Home, 
  CreditCard, 
  Target, 
  Shield, 
  User,
  Users,
  Plus
} from 'lucide-react';

interface NavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  onAddTransaction?: () => void;
}

export function Navigation({ activeScreen, onScreenChange, onAddTransaction }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'add', label: 'Add', icon: Plus, isSpecial: true },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'savings', label: 'Goals', icon: Target }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200">
      <div className="max-w-sm mx-auto px-4 py-2">
        <nav className="flex items-center justify-around">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeScreen === item.id;
            const isSpecial = item.isSpecial;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'add' && onAddTransaction) {
                    onAddTransaction();
                  } else {
                    onScreenChange(item.id);
                  }
                }}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-teal-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  isSpecial
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                    : isActive 
                    ? 'bg-teal-100' 
                    : 'hover:bg-gray-100'
                }`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <span className={`text-xs font-medium ${isSpecial ? 'text-teal-600' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}