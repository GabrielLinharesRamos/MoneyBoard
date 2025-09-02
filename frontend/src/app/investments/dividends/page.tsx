'use client';

import { useState } from 'react';
import Layout from '../../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dividends, stocks, getDividendsByStock, monthlyDividends } from '@/data/mockData';
import { Dividend } from '@/data/mockData';
import { Plus, DollarSign, TrendingUp } from 'lucide-react';

export default function DividendsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStock, setSelectedStock] = useState('all');
  const [newDividend, setNewDividend] = useState({
    stockId: '',
    amount: 0,
    paymentDate: '',
    exDividendDate: '',
    type: 'dividend' as 'dividend' | 'jscp'
  });

  const handleAddDividend = (e: React.FormEvent) => {
    e.preventDefault();
    // Em uma aplicação real, aqui seria feita a chamada para a API
    console.log('Novo provento:', newDividend);
    setShowAddForm(false);
    setNewDividend({
      stockId: '',
      amount: 0,
      paymentDate: '',
      exDividendDate: '',
      type: 'dividend'
    });
  };

  const filteredDividends = selectedStock === 'all' 
    ? dividends 
    : getDividendsByStock(selectedStock);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStockName = (stockId: string) => {
    const stock = stocks.find(s => s.id === stockId);
    return stock ? stock.companyName : 'Desconhecido';
  };

  const totalDividends = filteredDividends.reduce((sum, dividend) => sum + dividend.amount, 0);
  
  const currentYear = new Date().getFullYear();
  const currentYearDividends = filteredDividends.filter(d => 
    new Date(d.paymentDate).getFullYear() === currentYear
  );
  const yearTotal = currentYearDividends.reduce((sum, dividend) => sum + dividend.amount, 0);

  const dividendsByMonth = filteredDividends.reduce((acc, dividend) => {
    const month = new Date(dividend.paymentDate).toISOString().slice(0, 7);
    acc[month] = (acc[month] || 0) + dividend.amount;
    return acc;
  }, {} as Record<string, number>);

  const monthlyAverage = Object.keys(dividendsByMonth).length > 0 
    ? Object.values(dividendsByMonth).reduce((sum, val) => sum + val, 0) / Object.keys(dividendsByMonth).length
    : 0;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-brown-burned bg-clip-text text-transparent">Proventos</h1>
            <p className="text-gray-600 mt-1">Acompanhe dividendos e JCP recebidos</p>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-brown-burned text-white px-4 py-2 rounded-lg hover:bg-brown-burned/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Provento
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Novo Provento
            </h3>
            <form onSubmit={handleAddDividend} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ação</label>
                <select 
                  value={newDividend.stockId}
                  onChange={(e) => setNewDividend({...newDividend, stockId: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
                  required
                >
                  <option value="">Selecione uma ação</option>
                  {stocks.map(stock => (
                    <option key={stock.id} value={stock.id}>{stock.symbol}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select 
                  value={newDividend.type}
                  onChange={(e) => setNewDividend({...newDividend, type: e.target.value as 'dividend' | 'jscp'})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
                >
                  <option value="dividend">Dividendo</option>
                  <option value="jscp">JCP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                <input 
                  type="number"
                  step="0.01"
                  value={newDividend.amount}
                  onChange={(e) => setNewDividend({...newDividend, amount: parseFloat(e.target.value) || 0})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Ex-Dividendo</label>
                <input 
                  type="date"
                  value={newDividend.exDividendDate}
                  onChange={(e) => setNewDividend({...newDividend, exDividendDate: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Pagamento</label>
                <input 
                  type="date"
                  value={newDividend.paymentDate}
                  onChange={(e) => setNewDividend({...newDividend, paymentDate: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Recebido</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalDividends)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total {currentYear}</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(yearTotal)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Média Mensal</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(monthlyAverage)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-lg border p-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filtrar por ação:</label>
            <select 
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
            >
              <option value="all">Todas as ações</option>
              {stocks.map(stock => (
                <option key={stock.id} value={stock.id}>{stock.symbol}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dividends Table */}
        <div className="bg-white rounded-lg shadow-lg border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Histórico de Proventos
            </h3>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ação</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Tipo</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Valor</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Data Ex-Div</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Data Pagamento</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDividends
                  .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
                  .map((dividend) => {
                    const isPaid = new Date(dividend.paymentDate) <= new Date();
                    
                    return (
                      <tr key={dividend.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2 font-medium">{getStockName(dividend.stockId)}</td>
                        <td className="py-3 px-2">
                          <Badge variant={dividend.type === 'dividend' ? 'default' : 'secondary'}>
                            {dividend.type === 'dividend' ? 'Dividendo' : 'JCP'}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-right font-medium text-green-600">
                          {formatCurrency(dividend.amount)}
                        </td>
                        <td className="py-3 px-2 text-right">{formatDate(dividend.exDividendDate)}</td>
                        <td className="py-3 px-2 text-right">{formatDate(dividend.paymentDate)}</td>
                        <td className="py-3 px-2 text-center">
                          <Badge variant={isPaid ? 'default' : 'outline'}>
                            {isPaid ? 'Pago' : 'Pendente'}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 p-4">
            {filteredDividends
              .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
              .map((dividend) => {
                const isPaid = new Date(dividend.paymentDate) <= new Date();
                
                return (
                  <div key={dividend.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{getStockName(dividend.stockId)}</h4>
                        <Badge variant={dividend.type === 'dividend' ? 'default' : 'secondary'}>
                          {dividend.type === 'dividend' ? 'Dividendo' : 'JCP'}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{formatCurrency(dividend.amount)}</p>
                        <Badge variant={isPaid ? 'default' : 'outline'}>
                          {isPaid ? 'Pago' : 'Pendente'}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Data Ex-Dividendo:</span>
                        <p className="font-medium">{formatDate(dividend.exDividendDate)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Data Pagamento:</span>
                        <p className="font-medium">{formatDate(dividend.paymentDate)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {filteredDividends.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum provento encontrado para os filtros selecionados.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}