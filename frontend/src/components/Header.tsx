'use client';

import { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  ChevronDown,
  Settings,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'Novo gasto de R$ 120,00 em Alimentação', time: '2 min atrás', unread: true },
    { id: 2, message: 'Meta mensal de gastos atingida em 80%', time: '1 hora atrás', unread: true },
    { id: 3, message: 'Fatura do cartão disponível', time: '3 horas atrás', unread: false },
  ];

  return (
    <header className="shadow-sm border-b border-gray-200 h-16 flex items-center py-10 justify-between sm:px-6">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        
        <h1 className="text-2xl font-bold bg-yellow-600 to-yellow-800 bg-clip-text text-transparent">MoneyBoard</h1>
      </div>

      {/* Center section - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">

      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gradient-to-r relative"
          >
            <Bell className="w-5 h-5 text-yellow-700 hover:text-yellow-800" />
            {notifications.some(n => n.unread) && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg"></span>
            )}
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Notificações</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                      notification.unread ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-100">
                <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gradient-to-r hover:from-yellow-100 hover:to-yellow-200 shadow-sm hover:shadow-md"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-4 h-4 text-white" />
            </div>
            <ChevronDown className="w-4 h-4 text-yellow-600" />
          </button>

          {/* Profile dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-2">
                <button className="flex items-center space-x-2 w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  <User className="w-4 h-4" />
                  <span>Meu Perfil</span>
                </button>
                <button className="flex items-center space-x-2 w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  <Settings className="w-4 h-4" />
                  <span>Configurações</span>
                </button>
                <hr className="my-2" />
                <button className="flex items-center space-x-2 w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-md">
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handlers */}
      {(showProfileMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowProfileMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
}