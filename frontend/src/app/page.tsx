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

  const COLORS = [
    "#fff5e9",
    "#f6e1c8",
    "#eed0aa",
    "#e2bc8c",
    "#d7a96f",
    "#c9965d",
    "#b8854d",
    "#a47442",
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold bg-brown-burned bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your financial life with MoneyBoard</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-brown-burned" />
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border-brown-burned rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 bg-white font-semibold text-gray-700"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-brown-burned"/>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border-brown-burned rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 bg-white font-semibold text-gray-700"
              >
                <option value="all">All Categories</option>
                <option value="Alimentação">Food</option>
                <option value="Transporte">Transport</option>
                <option value="Moradia">Housing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Layout - Left and Right Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Total Balance and Recent Transactions */}
          <div className="flex flex-col gap-6 h-[792px]">
            {/* Total Balance Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 h-[180px] flex-shrink-0">
              <div className="flex items-center justify-between h-full">
                <div>
                  <p className="text-base font-semibold text-gray-600 mb-1">Total Balance</p>
                  <p className="text-3xl font-bold text-brown-burned">
                    $ {currentMonthIncome.toLocaleString('en-US')}
                  </p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-brown-burned font-medium">+12.5%</span>
                    <span className="text-gray-500 ml-2">vs previous month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 h-[588px] flex flex-col">
              <div className="p-6 border-bottom-brown-burned flex-shrink-0">
                <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent">Recent Transactions</h3>
              </div>
              <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100' : ''
                      }`}>
                        {transaction.type === 'income' ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <CreditCard className="w-5 h-5 text-brown-burned" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium font-semibold text-gray-600">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.category} • {transaction.account}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'income' ? 'text-brown-burned' : 'text-brown-burned'
                      }`}>
                        {transaction.type === 'income' ? '+' : ''}$ {Math.abs(transaction.amount).toLocaleString('en-US')}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('en-US')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Charts */}
          <div className="flex flex-col gap-6 h-[792px]">

            {/* Pie Chart - Expenses by Category */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 h-[384px] flex flex-col">
              <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent mb-4 flex-shrink-0">Expenses by Category</h3>
              <div className="flex-1 flex flex-col">
                {/* Gráfico */}
                <div className="flex-1 flex items-center justify-center" style={{ minHeight: '200px' }}>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={categoryExpenses}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={false}
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
                        formatter={(value, name, entry) => [
                          `$ ${Number(value).toLocaleString('en-US')}`, 
                          entry.payload.category
                        ]}
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
                {/* Legenda */}
                <div className="mt-4 flex-shrink-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {categoryExpenses.map((entry, index) => (
                      <div key={entry.category} className="flex items-center space-x-2 text-xs">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium font-semibold text-gray-600 truncate">{entry.category}</div>
                          <div className="text-gray-500">${entry.amount.toLocaleString('en-US')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bar Chart - Monthly Evolution */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 h-[384px] flex flex-col">
              <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent mb-4 flex-shrink-0">Monthly Evolution</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
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
                      tickFormatter={(value) => `$ ${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      formatter={(value, name) => {
                        const displayName = name === 'income' ? 'Income' : 
                                          name === 'expenses' ? 'Expenses' : 
                                          name === 'balance' ? 'Balance' : name;
                        return [`$ ${Number(value).toLocaleString('en-US')}`, displayName];
                      }}
                      labelFormatter={(label) => `Month: ${label}`}
                      wrapperClassName="text-gray-500 bg-white"
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />

                    <Bar 
                      dataKey="income" 
                      fill="#E6D1AD" 
                      name="Income"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
