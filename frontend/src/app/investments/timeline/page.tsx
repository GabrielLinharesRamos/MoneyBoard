'use client';

import { useState } from 'react';
import Layout from '../../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { monthlyDividends, stocks } from '@/data/mockData';
import { TrendingUp, BarChart3, Calendar, DollarSign } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts';

export default function TimelinePage() {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('line');
  const [selectedYear, setSelectedYear] = useState('all');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
  };

  // Filtrar dados por ano se selecionado
  const filteredData = selectedYear === 'all' 
    ? monthlyDividends 
    : monthlyDividends.filter(item => item.month.startsWith(selectedYear));

  // Calcular estatísticas
  const totalDividends = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const averageMonthly = filteredData.length > 0 ? totalDividends / filteredData.length : 0;
  const highestMonth = filteredData.reduce((max, item) => item.amount > max.amount ? item : max, filteredData[0] || { amount: 0, month: '' });
  const lowestMonth = filteredData.reduce((min, item) => item.amount < min.amount ? item : min, filteredData[0] || { amount: 0, month: '' });

  // Preparar dados para o gráfico
  const chartData = filteredData.map(item => ({
    ...item,
    monthFormatted: formatMonth(item.month),
    cumulativeAmount: 0 // Será calculado abaixo
  }));

  // Calcular valores cumulativos
  let cumulative = 0;
  chartData.forEach(item => {
    cumulative += item.amount;
    item.cumulativeAmount = cumulative;
  });

  // Obter anos únicos para o filtro
  const availableYears = [...new Set(monthlyDividends.map(item => item.month.substring(0, 4)))];

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="monthFormatted" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Proventos']}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="monthFormatted" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  formatCurrency(value), 
                  name === 'amount' ? 'Proventos Mensais' : 'Acumulado'
                ]}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="amount" 
                stackId="1" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="cumulativeAmount" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        );
      
      default: // line
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="monthFormatted" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Proventos']}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Layout>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-brown-burned bg-clip-text text-transparent flex items-center gap-3">
              <Calendar className="w-8 h-8 text-brown-burned" />
              Timeline de Proventos
            </h1>
            <p className="text-gray-600 mt-1">Visualize a evolução dos seus proventos ao longo do tempo</p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total do Período</p>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(totalDividends)}
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Média Mensal</p>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(averageMonthly)}
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-gray-900" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Maior Mês</p>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(highestMonth?.amount || 0)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {highestMonth?.month ? formatMonth(highestMonth.month) : 'N/A'}
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">Menor Mês</p>
                    <div className="text-2xl font-bold text-orange-600">
                      {formatCurrency(lowestMonth?.amount || 0)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {lowestMonth?.month ? formatMonth(lowestMonth.month) : 'N/A'}
                    </div>
                  </div>
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

        {/* Controles do Gráfico */}
        <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 mb-6">
          <div className="p-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Gráfico
                </label>
                <div className="flex gap-2">
                  <button 
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      chartType === 'line' 
                        ? 'bg-brown-burned text-white' 
                        : 'border-2 border-brown-burned text-brown-burned hover:bg-brown-burned hover:text-white'
                    }`}
                    onClick={() => setChartType('line')}
                  >
                    Linha
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      chartType === 'bar' 
                        ? 'bg-brown-burned text-white' 
                        : 'border-2 border-brown-burned text-brown-burned hover:bg-brown-burned hover:text-white'
                    }`}
                    onClick={() => setChartType('bar')}
                  >
                    Barras
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      chartType === 'area' 
                        ? 'bg-brown-burned text-white' 
                        : 'border-2 border-brown-burned text-brown-burned hover:bg-brown-burned hover:text-white'
                    }`}
                    onClick={() => setChartType('area')}
                  >
                    Área + Acumulado
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filtrar por Ano
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos os anos</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                  </select>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                {filteredData.length} meses exibidos
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 mb-6">
          <div className="p-6 border-bottom-brown-burned">
            <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brown-burned" />
              Evolução Mensal dos Proventos
            </h3>
          </div>
          <div className="p-6 pt-0">
            {filteredData.length > 0 ? (
              renderChart()
            ) : (
              <div className="text-center py-12 text-gray-500">
                Nenhum dado encontrado para o período selecionado.
              </div>
            )}
          </div>
        </div>

        {/* Tabela de Dados */}
        <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-bottom-brown-burned">
            <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brown-burned" />
              Dados Detalhados
            </h3>
          </div>
          <div className="p-6 pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-gray-600 py-3 px-2">Mês</th>
                  <th className="text-right text-gray-600 py-3 px-2">Proventos</th>
                  <th className="text-right text-gray-600 py-3 px-2">Acumulado</th>
                  <th className="text-right text-gray-600 py-3 px-2">Variação</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, index) => {
                  const previousAmount = index > 0 ? chartData[index - 1].amount : 0;
                  const variation = previousAmount > 0 ? ((item.amount - previousAmount) / previousAmount) * 100 : 0;
                  
                  return (
                    <tr key={item.month} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 font-medium">{item.monthFormatted}</td>
                      <td className="py-3 px-2 text-right font-medium text-green-600">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="py-3 px-2 text-right">
                        {formatCurrency(item.cumulativeAmount)}
                      </td>
                      <td className={`py-3 px-2 text-right ${
                        variation > 0 ? 'text-green-600' : variation < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {index > 0 ? (
                          <Badge variant={variation > 0 ? 'default' : variation < 0 ? 'destructive' : 'secondary'}>
                            {variation > 0 ? '+' : ''}{variation.toFixed(1)}%
                          </Badge>
                        ) : (
                          <Badge variant="secondary">-</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              </table>
            </div>
          </div>
        </div>
       </Layout>
     </div>
   );
 }