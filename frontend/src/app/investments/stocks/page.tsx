'use client';

import { useState } from 'react';
import Layout from '../../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { stocks } from '@/data/mockData';
import { Stock } from '@/data/mockData';
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
    // Em uma aplicação real, aqui seria feita a chamada para a API
    console.log('Nova ação:', newStock);
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
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  // Calcular estatísticas
  const totalInvested = stocks.reduce((sum, stock) => sum + (stock.quantity * stock.purchasePrice), 0);
  const totalCurrentValue = stocks.reduce((sum, stock) => {
    return sum + (stock.quantity * stock.currentPrice);
  }, 0);
  const totalGainLoss = totalCurrentValue - totalInvested;
  const totalGainLossPercentage = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-brown-burned bg-clip-text text-transparent">Ações</h1>
            <p className="text-gray-600 mt-1">Gerencie sua carteira de ações</p>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-brown-burned text-white px-4 py-2 rounded-lg hover:bg-brown-burned/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Ação
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nova Ação
            </h3>
            <form onSubmit={handleAddStock} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Símbolo</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço Médio (R$)</label>
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
                  placeholder="Petróleo e Gás"
                  required
                />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <button 
                  type="submit"
                  className="bg-brown-burned text-white px-4 py-2 rounded-lg hover:bg-brown-burned/90 transition-colors"
                >
                  Adicionar
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Investido</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInvested)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Atual</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCurrentValue)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ganho/Perda</p>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(totalGainLoss)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${totalGainLoss >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {totalGainLoss >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-600" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-600" />
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rentabilidade</p>
                <p className={`text-2xl font-bold ${totalGainLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercentage(totalGainLossPercentage)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${totalGainLossPercentage >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {totalGainLossPercentage >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-600" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-600" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stocks List */}
        <div className="bg-white rounded-lg shadow-lg border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Carteira de Ações
            </h3>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ação</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Qtd</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Preço Médio</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Preço Atual</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Valor Investido</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Valor Atual</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Ganho/Perda</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">%</th>
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
                    <tr key={stock.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                           <p className="font-medium">{stock.ticker}</p>
                           <p className="text-sm text-gray-600">{stock.companyName}</p>
                         </div>
                      </td>
                      <td className="py-3 px-4 text-right">{stock.quantity}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(stock.purchasePrice)}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(currentPrice)}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(investedValue)}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(currentValue)}</td>
                      <td className={`py-3 px-4 text-right font-medium ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(gainLoss)}
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${gainLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(gainLossPercentage)}
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
                <div key={stock.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{stock.symbol}</h4>
                      <p className="text-sm text-gray-600">{stock.companyName}</p>
                      <Badge variant="outline">{stock.quantity} ações</Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(currentValue)}</p>
                      <p className={`text-sm font-medium ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(gainLoss)} ({formatPercentage(gainLossPercentage)})
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Preço Médio:</span>
                      <p className="font-medium">{formatCurrency(stock.averagePrice)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Preço Atual:</span>
                      <p className="font-medium">{formatCurrency(currentPrice)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Investido:</span>
                      <p className="font-medium">{formatCurrency(investedValue)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Setor:</span>
                      <p className="font-medium">{stock.sector}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {stocks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma ação encontrada. Adicione sua primeira ação para começar.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}