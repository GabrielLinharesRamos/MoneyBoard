'use client';

import { useState, useMemo, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  PiggyBank,
  Calendar,
  Filter
} from 'lucide-react';
import { 
  monthlyData, 
  categoryExpenses, 
  stats, 
  transactions 
} from '../data/mockData';

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calcular totais do período atual
  const currentMonthIncome = monthlyData[monthlyData.length - 1]?.income || 0;
  const currentMonthExpenses = monthlyData[monthlyData.length - 1]?.expenses || 0;
  const currentBalance = currentMonthIncome - currentMonthExpenses;
  const savingsRate = ((currentBalance / currentMonthIncome) * 100).toFixed(1);

  // Transações recentes (últimas 5)
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const COLORS = ['#FFD700', '#FFA500', '#FF8C00', '#FF6347', '#DAA520', '#B8860B', '#CD853F', '#D2691E', '#DDD'];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold bg-yellow-600 bg-clip-text text-transparent">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-yellow-600" />
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-yellow-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 bg-white font-semibold text-gray-700"
              >
                <option value="week">Esta semana</option>
                <option value="month">Este mês</option>
                <option value="year">Este ano</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-yellow-600"/>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-yellow-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 bg-white font-semibold text-gray-700"
              >
                <option value="all">Todas as categorias</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Transporte">Transporte</option>
                <option value="Moradia">Moradia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold text-yellow-600">
                  R$ {currentMonthIncome.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl shadow-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-yellow-600 font-medium">+12.5%</span>
              <span className="text-gray-500 ml-2">vs mês anterior</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Gastos Mensais</p>
                <p className="text-2xl font-bold text-yellow-600">
                  R$ {currentMonthExpenses.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl shadow-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-yellow-600 font-medium">+5.2%</span>
              <span className="text-gray-500 ml-2">vs mês anterior</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Saldo Atual</p>
                <p className="text-2xl font-bold text-yellow-600">
                  R$ {stats.totalBalance.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl shadow-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-yellow-600 font-medium">+8.1%</span>
              <span className="text-gray-500 ml-2">vs mês anterior</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-1 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Taxa de Economia</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                  {savingsRate}%
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl shadow-lg flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-yellow-600 font-medium">+2.3%</span>
              <span className="text-gray-500 ml-2">vs mês anterior</span>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Pizza - Gastos por Categoria */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent mb-4">Gastos por Categoria</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryExpenses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category} ${percentage}%`}
                    outerRadius={isMobile ? 60 : 80}
                    fill="#8884d8"
                    dataKey="amount"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {categoryExpenses.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        stroke={COLORS[index % COLORS.length]}
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [
                      `R$ ${Number(value).toLocaleString('pt-BR')}`, 
                      name
                    ]}
                    labelFormatter={(label) => `Categoria: ${label}`}
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

          {/* Gráfico de Linha - Evolução Mensal */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent mb-4">Evolução Mensal</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={monthlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      `R$ ${Number(value).toLocaleString('pt-BR')}`, 
                      name === 'income' ? 'Receitas' : name === 'expenses' ? 'Gastos' : 'Saldo'
                    ]}
                    labelFormatter={(label) => `Mês: ${label}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend 
                    formatter={(value) => 
                      value === 'income' ? 'Receitas' : 
                      value === 'expenses' ? 'Gastos' : 'Saldo'
                    }
                  />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="Receitas"
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: 'white' }}
                    animationDuration={1000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    name="Gastos"
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#EF4444', strokeWidth: 2, fill: 'white' }}
                    animationDuration={1000}
                    animationDelay={200}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    name="Saldo"
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2, fill: 'white' }}
                    animationDuration={1000}
                    animationDelay={400}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Transações Recentes */}
        <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 hover:shadow-xl">
          <div className="p-6 border-b border-yellow-500">
            <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">Transações Recentes</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-100' : ''
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <CreditCard className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {transaction.account}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income' ? 'text-yellow-600' : 'text-yellow-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </Layout>
  );
}
