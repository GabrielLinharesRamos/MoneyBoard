'use client';

import { useState } from 'react';
import Layout from '../../../components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { stocks } from '@/data/mockData';
import { Plus, TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';

export default function StocksPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStock, setNewStock] = useState({
    symbol: '',
    companyName: '',
    quantity: 0,
    averagePrice: 0,
    sector: ''
  });

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would be an API call
        console.log('New stock:', newStock);
    setShowAddForm(false);
    setNewStock({
      symbol: '',
      companyName: '',
      quantity: 0,
      averagePrice: 0,
      sector: ''
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  // Calculate statistics
  const totalInvested = stocks.reduce((sum, stock) => sum + (stock.quantity * stock.purchasePrice), 0);
  const totalCurrentValue = stocks.reduce((sum, stock) => {
    return sum + (stock.quantity * stock.currentPrice);
  }, 0);
  const totalGainLoss = totalCurrentValue - totalInvested;
  const totalGainLossPercentage = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

  return (
    <Layout title="Stocks">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold bg-brown-burned bg-clip-text text-transparent">Stocks</h1>
              <p className="text-gray-600 mt-1">Manage your stock portfolio</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-brown-burned text-white hover:bg-brown-burned/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Stock
          </Button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="p-6 border-bottom-brown-burned">
              <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent flex items-center gap-2">
                <Plus className="w-5 h-5 text-brown-burned" />
                New Stock
              </h3>
            </div>
            <div className="p-6 pt-0">
            <form onSubmit={handleAddStock} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
                <input 
                  type="text"
                  value={newStock.symbol}
                  onChange={(e) => setNewStock({...newStock, symbol: e.target.value.toUpperCase()})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
                  placeholder="PETR4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
                <input 
                  type="text"
                  value={newStock.companyName}
                  onChange={(e) => setNewStock({...newStock, companyName: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
                  placeholder="Petrobras S.A."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                <input 
                  type="number"
                  value={newStock.quantity}
                  onChange={(e) => setNewStock({...newStock, quantity: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Average Price (US$)</label>
                <input 
                  type="number"
                  step="0.01"
                  value={newStock.averagePrice}
                  onChange={(e) => setNewStock({...newStock, averagePrice: parseFloat(e.target.value) || 0})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
                <input 
                  type="text"
                  value={newStock.sector}
                  onChange={(e) => setNewStock({...newStock, sector: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
                  placeholder="Oil and Gas"
                  required
                />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button 
                  type="submit"
                  className="bg-brown-burned text-white hover:bg-brown-burned/90 transition-colors"
                >
                  Adicionar
                </Button>
                <Button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
                >
                  Cancelar
                </Button>
              </div>
            </form>
            </div>
          </div>
        )}

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Amount Invested</p>
                <p className="text-2xl font-bold text-brown-burned">
                  {formatCurrency(totalInvested)}
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
                <p className="text-sm font-semibold text-gray-600 mb-1">Current Value</p>
                <p className="text-2xl font-bold text-brown-burned">
                  {formatCurrency(totalCurrentValue)}
                </p>
              </div>
              <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Gain/Loss</p>
                <p className="text-2xl font-bold text-brown-burned">
                  {formatCurrency(totalGainLoss)}
                </p>
              </div>
              <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                {totalGainLoss >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-white"/>
                ) : (
                  <TrendingDown className="w-6 h-6 text-white" />
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Return</p>
                <p className="text-2xl font-bold text-brown-burned">
                  {formatPercentage(totalGainLossPercentage)}
                </p>
              </div>
              <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                {totalGainLoss >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-white"/>
                ) : (
                  <TrendingDown className="w-6 h-6 text-white" />
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Stocks List */}
        <div className="bg-gradient-to-br from-white to-brown-burned/5 rounded-xl shadow-lg border-2 border-brown-burned/20 hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-bottom-brown-burned">
            <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brown-burned" />
              Stock Portfolio
            </h3>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full mt-1">
              <thead className='border-b'>
                <tr>
                  <th className="text-left py-3 px-4 font-medium font-semibold text-gray-600 uppercase tracking-wider text-xs">Stock</th>
                  <th className="text-right py-3 px-4 font-medium font-semibold text-gray-600 uppercase tracking-wider text-xs">Qtd</th>
                  <th className="text-right py-3 px-4 font-medium font-semibold text-gray-600 uppercase tracking-wider text-xs">Average Price</th>
                    <th className="text-right py-3 px-4 font-medium font-semibold text-gray-600 uppercase tracking-wider text-xs">Current Price</th>
                  <th className="text-right py-3 px-4 font-medium font-semibold text-gray-600 uppercase tracking-wider text-xs">Amount Invested</th>
                  <th className="text-right py-3 px-4 font-medium font-semibold text-gray-600 uppercase tracking-wider text-xs">Current Value</th>
                  <th className="text-right py-3 px-4 font-medium font-semibold text-gray-600 uppercase tracking-wider text-xs">Gain/Loss</th>
                  <th className="text-right py-3 px-4 font-medium font-semibold text-gray-600 uppercase tracking-wider text-xs">%</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => {
                   const currentPrice = stock.currentPrice;
                   const investedValue = stock.quantity * stock.purchasePrice;
                   const currentValue = stock.quantity * currentPrice;
                   const gainLoss = currentValue - investedValue;
                   const gainLossPercentage = (gainLoss / investedValue) * 100;
                  
                  return (
                    <tr key={stock.id} className="border-b hover:bg-brown-burned/5 transition-colors duration-200">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 mr-3">
                            <div className="w-10 h-10 bg-brown-burned/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-brown-burned">{stock.ticker.charAt(0)}</span>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-brown-burned">{stock.ticker}</p>
                            <p className="text-sm text-gray-500">{stock.companyName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600 font-medium">{stock.quantity}</td>
                      <td className="py-3 px-4 text-right text-gray-600 font-medium">{formatCurrency(stock.purchasePrice)}</td>
                      <td className="py-3 px-4 text-right text-gray-600 font-medium">{formatCurrency(currentPrice)}</td>
                      <td className="py-3 px-4 text-right text-gray-600 font-medium">{formatCurrency(investedValue)}</td>
                      <td className="py-3 px-4 text-right text-gray-600 font-medium">{formatCurrency(currentValue)}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          gainLoss >= 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {formatCurrency(gainLoss)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          gainLossPercentage >= 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {formatPercentage(gainLossPercentage)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 p-4">
            {stocks.map((stock) => {
              const currentPrice = stock.currentPrice;
              const investedValue = stock.quantity * stock.purchasePrice;
              const currentValue = stock.quantity * currentPrice;
              const gainLoss = currentValue - investedValue;
              const gainLossPercentage = (gainLoss / investedValue) * 100;
              
              return (
                <div key={stock.id} className="bg-gradient-to-br from-white to-brown-burned/5 rounded-xl p-4 border-2 border-brown-burned/20 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 mr-3">
                        <div className="w-10 h-10 bg-brown-burned/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-brown-burned">{stock.ticker.charAt(0)}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-brown-burned">{stock.ticker}</h4>
                        <p className="text-sm text-brown-burned/70">{stock.companyName}</p>
                        <Badge variant="outline" className="text-xs">{stock.quantity} shares</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-brown-burned">{formatCurrency(currentValue)}</p>
                      <p className={`text-sm font-medium ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(gainLoss)} ({formatPercentage(gainLossPercentage)})
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                    <div>
                      <span className="text-brown-burned/70">Average Price:</span>
                      <p className="font-medium text-brown-burned">{formatCurrency(stock.purchasePrice)}</p>
                    </div>
                    <div>
                      <span className="text-brown-burned/70">Current Price:</span>
                      <p className="font-medium text-brown-burned">{formatCurrency(currentPrice)}</p>
                    </div>
                    <div>
                      <span className="text-brown-burned/70">Investido:</span>
                      <p className="font-medium text-brown-burned">{formatCurrency(investedValue)}</p>
                    </div>
                    <div>
                      <span className="text-brown-burned/70">Setor:</span>
                      <p className="font-medium text-brown-burned">{stock.sector}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {stocks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No stocks found. Add your first stock to get started.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}