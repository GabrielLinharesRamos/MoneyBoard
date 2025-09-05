'use client';

import { useState, ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const handleMenuClick = () => {
    // Menu click handler - can be expanded for sidebar functionality
  };

  return (
    <div className="flex h-screen bg-gray-50">
      
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={handleMenuClick} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-3 sm:p-6">
          <div className="max-w-7xl mx-auto">
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">{title}</h1>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}