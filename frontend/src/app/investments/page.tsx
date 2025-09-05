'use client';

import Link from 'next/link';
import Layout from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Plus } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import {
  stocks,
  dividends,
  monthlyDividends,
  getInvestmentSummary,
  Stock,
  Dividend,
  MonthlyDividend
} from '@/data/mockData';

export default function InvestmentsPage() {
  const summary = getInvestmentSummary();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <Layout title="Investments">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold bg-brown-burned bg-clip-text text-transparent">Investments</h1>
            <p className="text-gray-600 mt-1">Track Your Investment Portfolio</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/investments/stocks">
              <Button variant="outline" className="border-brown-burned text-brown-burned hover:bg-brown-burned hover:text-white">Manage Stocks</Button>
            </Link>
            <Link href="/investments/dividends">
              <Button variant="outline" className="border-brown-burned text-brown-burned hover:bg-brown-burned hover:text-white">Manage Dividends</Button>
            </Link>
            <Link href="/investments/timeline">
              <Button variant="outline" className="border-brown-burned text-brown-burned hover:bg-brown-burned hover:text-white">Timeline</Button>
            </Link>
          </div>
        </div>

        {/* Resumo Geral */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-1">Total Invested</p>
                <p className="text-3xl font-bold text-brown-burned">
                  {formatCurrency(summary.totalInvested)}
                </p>
              </div>
              <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-1">Total Current Value</p>
                <p className="text-3xl font-bold text-brown-burned">
                  {formatCurrency(summary.currentValue)}
                </p>
              </div>
              <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-1">Total Return</p>
                <p className={`text-3xl font-bold ${
                  summary.totalReturn >= 0 ? 'text-brown-burned' : 'text-red-600'
                }`}>
                  {formatCurrency(summary.totalReturn)}
                </p>
                <div className="mt-2 flex items-center text-sm">
                  <span className={`font-medium ${
                    summary.totalReturn >= 0 ? 'text-brown-burned' : 'text-red-600'
                  }`}>
                    {formatPercentage(summary.totalReturnPercentage)}
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                {summary.totalReturn >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-white" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-white" />
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-1">Total Dividends</p>
                <p className="text-3xl font-bold text-brown-burned">
                  {formatCurrency(summary.totalDividends)}
                </p>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-brown-burned font-medium">
                    Yield: {summary.monthlyDividendYield.toFixed(2)}% a.m.
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                <PieChart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
      </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stock Portfolio */}
          <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 h-[500px] flex flex-col">
            <div className="p-6 border-bottom-brown-burned flex-shrink-0 mb-3">
              <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brown-burned" />
                Manage Stocks
              </h3>
            </div>
            <div className="p-6 pt-0 flex-1 overflow-hidden">
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {stocks.map((stock) => {
                const totalInvested = stock.quantity * stock.purchasePrice;
                const currentValue = stock.quantity * stock.currentPrice;
                const return_ = currentValue - totalInvested;
                const returnPercentage = (return_ / totalInvested) * 100;

                return (
                  <div key={stock.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{stock.ticker}</span>
                        <Badge variant="outline" className="text-xs">
                          {stock.sector}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{stock.companyName}</p>
                      <p className="text-xs text-gray-500">
                        {stock.quantity} shares • Average price: {formatCurrency(stock.purchasePrice)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(currentValue)}
                      </div>
                      <div className={`text-sm ${
                        return_ >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatCurrency(return_)} ({formatPercentage(returnPercentage)})
                      </div>
                    </div>
                  </div>
                );
              })}
             </div>
           </div>
         </div>

         {/* Linha do Tempo de Dividendos */}
         <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 h-[500px] flex flex-col">
           <div className="p-6 border-bottom-brown-burned flex-shrink-0 mb-4">
             <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-brown-burned" />
               Monthly Dividends
             </h3>
           </div>
           <div className="p-6 pt-0 flex-1">
             <div className="h-[400px]">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={monthlyDividends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                     formatter={(value: number) => [formatCurrency(value), 'Dividendos']}
                     labelFormatter={(label) => `Month: ${label}`}
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
         </div>
      </div>

      {/* Dividend History */}
      <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
        <div className="p-6 border-bottom-brown-burned">
          <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-brown-burned" />
            Dividend History
          </h3>
        </div>
        <div className="p-6 pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium font-semibold text-gray-600">Ticker</th>
                  <th className="text-left py-2 px-4 font-medium font-semibold text-gray-600">Amount per Share</th>
                  <th className="text-left py-2 px-4 font-medium font-semibold text-gray-600">Total Received</th>
                  <th className="text-left py-2 px-4 font-medium font-semibold text-gray-600">Payment Date</th>
                  <th className="text-left py-2 px-4 font-medium font-semibold text-gray-600">Type</th>
                </tr>
              </thead>
              <tbody>
                {dividends.slice(0, 10).map((dividend) => {
                  const stock = stocks.find(s => s.id === dividend.stockId);
                  const totalReceived = dividend.amount * (stock?.quantity || 0);
                  
                  return (
                    <tr key={dividend.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600 font-medium">{dividend.ticker}</td>
                      <td className="py-3 px-4 text-gray-600 font-medium">{formatCurrency(dividend.amount)}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {formatCurrency(totalReceived)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(dividend.paymentDate).toLocaleDateString('en-US')}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className='bg-brown-burned' variant={dividend.type === 'dividend' ? 'default' : 'secondary'}>
                          {dividend.type === 'dividend' ? 'Dividend' : 
                           dividend.type === 'jscp' ? 'JCP' : 'Bonus'}
                        </Badge>
                      </td>
                    </tr>
                  );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}