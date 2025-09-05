'use client';

import React, { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Search, Filter, Plus, TrendingUp, TrendingDown, DollarSign, Target, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { categories, transactions,  getExpensesByCategory } from '@/data/mockData';
import { Button } from '@/components/ui/button';

// Cores para gráficos com tema marrom queimado
const BROWN_COLORS = [
  '#d97706', '#92400e', '#b45309', '#a16207', '#78350f',
  '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'
];

export default function Categories() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('amount');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filtrar transações por período
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      let dateFilter = true;
      
      switch (selectedPeriod) {
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          dateFilter = transactionDate >= weekAgo;
          break;
        case 'month':
          const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          dateFilter = transactionDate >= monthAgo;
          break;
        case 'year':
          const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          dateFilter = transactionDate >= yearAgo;
          break;
      }
      
      const categoryFilter = selectedCategory === 'all' || transaction.category === selectedCategory;
      const searchFilter = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      return dateFilter && categoryFilter && searchFilter && transaction.type === 'expense';
    });
  }, [selectedPeriod, selectedCategory, searchTerm]);

  // Calcular gastos por categoria
  const categoryExpenses = useMemo(() => {
    const expenses = getExpensesByCategory(filteredTransactions);
    const total = expenses.reduce((sum, cat) => sum + cat.amount, 0);
    
    return expenses
      .map(cat => ({
        ...cat,
        percentage: total > 0 ? Math.round((cat.amount / total) * 100) : 0
      }))
      .sort((a, b) => {
        if (sortBy === 'amount') {
          return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
        } else if (sortBy === 'category') {
          return sortOrder === 'desc' ? b.category.localeCompare(a.category) : a.category.localeCompare(b.category);
        }
        return 0;
      });
  }, [filteredTransactions, sortBy, sortOrder]);

  // Dados para gráfico de tendência mensal
  const monthlyTrends = useMemo(() => {
    const monthlyData: { [key: string]: { [category: string]: number } } = {};
    
    filteredTransactions.forEach(transaction => {
      const month = new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      if (!monthlyData[month]) monthlyData[month] = {};
      if (!monthlyData[month][transaction.category]) monthlyData[month][transaction.category] = 0;
      monthlyData[month][transaction.category] += Math.abs(transaction.amount);
    });
    
    return Object.entries(monthlyData).map(([month, categories]) => ({
      month,
      ...categories
    })).slice(-6); // Últimos 6 meses
  }, [filteredTransactions]);

  const totalExpenses = categoryExpenses.reduce((sum, cat) => sum + cat.amount, 0);

  const COLORS = ['#FFD700', '#FFA500', '#FF8C00', '#FF6347', '#DAA520', '#B8860B', '#CD853F', '#D2691E', '#DDD'];

  return (
    <Layout title="Categories">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold bg-brown-burned bg-clip-text text-transparent">Expense Control</h1>
            <p className="text-gray-600 mt-1">Manage your expenses by category and track your budget</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="bg-brown-burned text-white hover:bg-brown-burned/90">
              <Plus className="w-4 h-4 mr-2" />
              New Expense
            </Button>
            <Button variant="outline" className="border-brown-burned text-brown-burned hover:bg-brown-burned hover:text-white">
              <Target className="w-4 h-4 mr-2" />
              Set Goal
            </Button>
          </div>
        </div>
        {/* Filtros e Controles */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-brown-burned" />
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border-brown-burned rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 bg-white font-semibold text-gray-700"
              >
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="year">This year</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-brown-burned"/>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border-brown-burned rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 bg-white font-semibold text-gray-700"
              >
                <option value="all">All categories</option>
                {categories.filter(cat => cat.name !== 'Salário' && cat.name !== 'Freelance').map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 bg-white"
            />
          </div>
        </div>

        {/* Estatísticas de Controle de Gastos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-1">Total Expenses</p>
                <p className="text-3xl font-bold text-brown-burned">
                  US$ {totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-brown-burned font-medium">This month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-1">Total Budget</p>
                <p className="text-3xl font-bold text-brown-burned">US$ 4,900.00</p>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-brown-burned font-medium">Set</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-1">Savings</p>
                <p className="text-3xl font-bold text-green-600">US$ 2,440.00</p>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-green-600 font-medium">Remaining</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl shadow-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-1">Alerts</p>
                <p className="text-3xl font-bold text-red-600">3</p>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-red-600 font-medium">Categories</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-xl shadow-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos de Controle de Gastos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Barras - Gastos por Categoria */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent">
                Expenses by Category
              </h3>
              <div className="flex items-center space-x-2">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500 bg-white text-gray-700"
                >
                  <option value="amount">By amount</option>
                  <option value="category">By name</option>
                </select>
                <button 
                  onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                  className="text-sm text-gray-500 hover:text-brown-burned"
                >
                  {sortOrder === 'desc' ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryExpenses} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `US$ ${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`US$ ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'Expenses']}
                    labelFormatter={(label) => `Category: ${label}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#E6D1AD" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Pizza - Distribuição de Gastos */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent mb-4">
               Expense Distribution
             </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryExpenses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {categoryExpenses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                     formatter={(value) => [`US$ ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'Expenses']}
                     labelFormatter={() => ''}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Evolução de Gastos Mensais */}
        {monthlyTrends.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent mb-4">
               Monthly Expense Evolution
             </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `US$ ${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value, name) => {
                      const formattedValue = `US$ ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
                      return [formattedValue, name === 'budget' ? 'Budget Goal' : 'Expenses'];
                    }}
                    labelFormatter={(label) => `Month: ${label}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  {categoryExpenses.slice(0, 5).map((category, index) => (
                    <Line 
                      key={category.category}
                      type="monotone" 
                      dataKey={category.category} 
                      stroke={BROWN_COLORS[index]} 
                      strokeWidth={3}
                      dot={{ fill: BROWN_COLORS[index], strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: BROWN_COLORS[index], strokeWidth: 2 }}
                      animationDuration={1000}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Controle de Gastos por Categoria */}
        <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent flex items-center gap-2">
              <Target className="w-5 h-5 text-brown-burned" />
              Expense Control by Category
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {categoryExpenses.map((category, index) => {
              const categoryInfo = categories.find(c => c.name === category.category);
              const transactionsInCategory = filteredTransactions.filter(t => t.category === category.category);
              const budget = categoryInfo?.budget || 1000; // Orçamento padrão
              const spent = category.amount;
              const percentage = (spent / budget) * 100;
              const remaining = budget - spent;
              const isOverBudget = spent > budget;
              
              return (
                <div key={category.category} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <h4 className="font-semibold text-brown-burned">{category.category}</h4>
                      <span className="text-sm text-brown-burned/60">({transactionsInCategory.length} transactions)</span>
                      {isOverBudget && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                      {!isOverBudget && percentage > 80 && (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                      {!isOverBudget && percentage <= 80 && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-brown-burned">
                        US$ {category.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-brown-burned/60">{category.percentage}% do total</p>
                      <p className={`text-xs font-medium ${
                        isOverBudget ? 'text-red-600' : 
                        remaining < budget * 0.2 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {isOverBudget ? 
                          `Exceeded US$ ${Math.abs(remaining).toLocaleString('en-US', { minimumFractionDigits: 2 })}` :
                          `Remaining US$ ${remaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                        }
                      </p>
                    </div>
                  </div>
                  
                  {/* Barra de progresso do orçamento */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        isOverBudget ? 'bg-gradient-to-r from-red-500 to-red-600' :
                        percentage > 80 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        'bg-gradient-to-r from-green-500 to-emerald-500'
                      }`}
                      style={{ 
                        width: `${Math.min(percentage, 100)}%`
                      }}
                    ></div>
                  </div>
                  
                  {/* Últimas transações da categoria */}
                  <div className="space-y-2">
                    {transactionsInCategory.slice(0, 3).map(transaction => (
                      <div key={transaction.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{transaction.description}</span>
                        <div className="text-right">
                          <span className="font-medium text-brown-burned">
                            US$ {Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-gray-500 ml-2">
                            {new Date(transaction.date).toLocaleDateString('en-US')}
                          </span>
                        </div>
                      </div>
                    ))}
                    {transactionsInCategory.length > 3 && (
                      <p className="text-xs text-gray-500 mt-2">
                        +{transactionsInCategory.length - 3} additional transactions
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}