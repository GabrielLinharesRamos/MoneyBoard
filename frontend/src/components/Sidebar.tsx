'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PieChart, 
  Upload, 
  Settings, 
  LogOut,
  TrendingUp,
  Wallet
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Categorias',
    href: '/categories',
    icon: PieChart,
  },
  {
    name: 'Importar Extratos',
    href: '/import',
    icon: Upload,
  },
  {
    name: 'Investimentos',
    href: '/investments',
    icon: TrendingUp,
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={`
      fixed top-0 left-0 z-30 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
      lg:translate-x-0 lg:static lg:inset-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gradient-to-r from-yellow-400 to-yellow-600">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-brown-burned-grad rounded-xl flex items-center justify-center shadow-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-brown-burned bg-clip-text text-transparent">
              MoneyBoard
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 mr-2
                      ${isActive 
                        ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-r-4 border-yellow-600 shadow-md' 
                        : 'text-gray-600 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 hover:text-yellow-800'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-yellow-700' : 'text-gray-600 group-hover:text-yellow-700'
                    }`} />
                    <span className="font-semibold">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="space-y-2">
            <Link
              href="/settings"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Configurações</span>
            </Link>
            
            <button className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 rounded-lg transition-all duration-200 w-full mr-2 group">
              <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-700" />
              <span className="font-semibold">Sair</span>
            </button>
          </div>
        </div>
    </div>
  );
}