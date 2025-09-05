'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  ChevronDown,
  Settings,
  LogOut,
  LayoutDashboard, 
  PieChart, 
  Upload, 
  TrendingUp,
  Wallet
} from 'lucide-react';
interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'New expense of US$ 120.00 in Food', time: '2 min ago' },
    { id: 2, message: 'Monthly expense goal reached at 80%', time: '1 hour ago' },
    { id: 3, message: 'Credit card statement available', time: '3 hours ago' },
  ];

  return (
    <header className="shadow-sm border-b border-gray-200 h-16 flex items-center px-6">
      {/* Left section - Logo */}
      <div className="flex items-center space-x-4 flex-shrink-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        
        <h1 className="text-2xl font-bold text-brown-burned bg-clip-text text-transparent">
          MoneyBoard
        </h1>
      </div>

      {/* Center section - Menu */}
      <div className="hidden md:flex flex-1 justify-center text-brown-burned gap-12">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </Link>

        <Link href="/categories" className="flex items-center gap-2 font-semibold">
          <Menu className="w-5 h-5" /> Categories
        </Link>

        <Link href="/import" className="flex items-center gap-2 font-semibold whitespace-nowrap">
          <Upload className="w-5 h-5" /> Import Statements
        </Link>

        <Link href="/investments" className="flex items-center gap-2 font-semibold">
          <TrendingUp className="w-5 h-5" /> Investments
        </Link>
      </div>

      {/* Right section - User */}
      <div className="flex items-center space-x-4 flex-shrink-0">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gradient-to-r relative"
          >
            <Bell className="w-5 h-5 text-yellow-700 hover:text-yellow-800" />
          </button>
          {/* ... dropdowns iguais */}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-2 rounded-lg shadow-sm hover:shadow-md"
          >
            <div className="w-8 h-8 bg-brown-burned-grad rounded-full flex items-center justify-center shadow-lg">
              <User className="w-4 h-4 text-white" />
            </div>
            <ChevronDown className="w-4 h-4 text-yellow-700" />
          </button>
          {/* ... dropdowns iguais */}
        </div>
      </div>
    </header>

  );
}