'use client';

import { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  Filter, 
  Calendar, 
  Search, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { 
  transactions, 
  categories, 
  getExpensesByCategory 
} from '../../data/mockData';

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
      const month = new Date(transaction.date).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
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
  const averagePerCategory = totalExpenses / categoryExpenses.length || 0;
  const topCategory = categoryExpenses[0];

  const COLORS = ['#FFD700', '#FFA500', '#FF8C00', '#FF6347', '#DAA520', '#B8860B', '#CD853F', '#D2691E', '#DDD'];

  return (
    <Layout title="Categorização de Gastos">
      <div className="space-y-6">
        {/* Filtros e Controles */}
        <div className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Período */}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select 
                  value={selectedPeriod} 
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border-2 border-yellow-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 bg-gradient-to-r from-yellow-50 to-white font-semibold text-gray-700"
                >
                  <option value="week">Esta semana</option>
                  <option value="month">Este mês</option>
                  <option value="year">Este ano</option>
                </select>
              </div>
              
              {/* Categoria */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border-2 border-yellow-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 bg-gradient-to-r from-yellow-50 to-white font-semibold text-gray-700"
                >
                  <option value="all">Todas as categorias</option>
                  {categories.filter(cat => cat.name !== 'Salário' && cat.name !== 'Freelance').map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Busca */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                  type="text"
                  placeholder="Buscar transações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 bg-gradient-to-r from-yellow-50 to-white font-semibold text-gray-700"
                />
            </div>
          </div>
        </div>

        {/* Estatísticas Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-white to-red-50 p-6 rounded-xl shadow-lg border-2 border-red-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total de Gastos</p>
                <p className="text-2xl font-bold text-red-700">
                  R$ {totalExpenses.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl shadow-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Categorias Ativas</p>
                <p className="text-2xl font-bold text-blue-700">
                  {categoryExpenses.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl shadow-lg border-2 border-yellow-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Média por Categoria</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                  R$ {averagePerCategory.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl shadow-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl shadow-lg border-2 border-purple-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Maior Gasto</p>
                <p className="text-lg font-bold text-purple-700">
                  {topCategory?.category || 'N/A'}
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  R$ {topCategory?.amount.toLocaleString('pt-BR') || '0'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Barras - Gastos por Categoria */}
          <div className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">Gastos por Categoria</h3>
              <div className="flex items-center space-x-2">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                >
                  <option value="amount">Por valor</option>
                  <option value="category">Por nome</option>
                </select>
                <button 
                  onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {sortOrder === 'desc' ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryExpenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="category" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']} />
                  <Bar dataKey="amount" fill="#FFD700" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Pizza - Distribuição Percentual */}
          <div className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent mb-4">Distribuição Percentual</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryExpenses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {categoryExpenses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tendência Mensal */}
        {monthlyTrends.length > 0 && (
          <div className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent mb-4">Tendência Mensal por Categoria</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']} />
                  <Legend />
                  {categoryExpenses.slice(0, 5).map((category, index) => (
                    <Line 
                      key={category.category}
                      type="monotone" 
                      dataKey={category.category} 
                      stroke={COLORS[index]} 
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Lista Detalhada de Categorias */}
        <div className="bg-gradient-to-br from-white to-yellow-50 rounded-xl shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-yellow-200">
            <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">Detalhamento por Categoria</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {categoryExpenses.map((category, index) => {
              const categoryInfo = categories.find(c => c.name === category.category);
              const transactionsInCategory = filteredTransactions.filter(t => t.category === category.category);
              
              return (
                <div key={category.category} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <h4 className="font-semibold text-gray-900">{category.category}</h4>
                      <span className="text-sm text-gray-500">({transactionsInCategory.length} transações)</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">
                        R$ {category.amount.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-gray-500">{category.percentage}% do total</p>
                    </div>
                  </div>
                  
                  {/* Barra de progresso */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        backgroundColor: category.color, 
                        width: `${category.percentage}%` 
                      }}
                    ></div>
                  </div>
                  
                  {/* Últimas transações da categoria */}
                  <div className="space-y-2">
                    {transactionsInCategory.slice(0, 3).map(transaction => (
                      <div key={transaction.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{transaction.description}</span>
                        <div className="text-right">
                          <span className="font-medium text-red-600">
                            R$ {Math.abs(transaction.amount).toLocaleString('pt-BR')}
                          </span>
                          <span className="text-gray-400 ml-2">
                            {new Date(transaction.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    ))}
                    {transactionsInCategory.length > 3 && (
                      <p className="text-xs text-gray-500 mt-2">
                        +{transactionsInCategory.length - 3} transações adicionais
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