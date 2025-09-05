'use client';

import { useState } from 'react';
import Layout from '../../../components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dividends, stocks, getDividendsByStock } from '@/data/mockData';
import { Plus, DollarSign, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

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
    // In a real application, this would be an API call
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US');
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
    <Layout title="Dividends">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold bg-brown-burned bg-clip-text text-transparent">Incomes</h1>
            <p className="text-gray-600 mt-1">Track dividends and JCP received</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-brown-burned text-white hover:bg-brown-burned/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Income
          </Button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="p-6 border-bottom-brown-burned">
              <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent flex items-center gap-2">
                <Plus className="w-5 h-5 text-brown-burned" />
                Add Income
              </h3>
            </div>
            <div className="p-6 pt-0">
            <form onSubmit={handleAddDividend} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <select 
                  value={newDividend.stockId}
                  onChange={(e) => setNewDividend({...newDividend, stockId: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
                  required
                >
                  <option value="">Select a stock</option>
                  {stocks.map(stock => (
                    <option key={stock.id} value={stock.id}>{stock.ticker}</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (US$)</label>
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-1">Total Received</p>
                <p className="text-3xl font-bold text-brown-burned">{formatCurrency(totalDividends)}</p>
              </div>
              <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-1">Total {currentYear}</p>
                <p className="text-3xl font-bold text-brown-burned">{formatCurrency(yearTotal)}</p>
              </div>
              <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-1">Monthly Average</p>
                <p className="text-3xl font-bold text-brown-burned">{formatCurrency(monthlyAverage)}</p>
              </div>
              <div className="w-12 h-12 bg-brown-burned-grad rounded-xl shadow-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 flex items-center justify-between">
          {/* Título */}
          <div className="p-6">
            <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brown-burned" />
              Filters
            </h3>
          </div>

          {/* Filtro */}
          <div className="p-6 flex items-center">
            <div className="flex items-center gap-4">
              <label className="text-base font-medium text-gray-700">Filter by stock:</label>
              <select 
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                className="p-2 border border-brown-burned text-brown-burned rounded-lg focus:ring-2 focus:ring-brown-burned focus:border-transparent"
              >
                <option value="all">All stocks</option>
                {stocks.map(stock => (
                  <option key={stock.id} value={stock.id}>{stock.ticker}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dividends Table */}
        <div className="bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-bottom-brown-burned">
            <h3 className="text-lg font-bold bg-brown-burned bg-clip-text text-transparent flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-brown-burned" />
              Dividend History
            </h3>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Ex-Div Date</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Payment Date</th>
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
                        <td className="py-3 px-2 font-medium text-gray-600">{getStockName(dividend.stockId)}</td>
                        <td className="py-3 px-2">
                          <Badge className={dividend.type === 'dividend' ? 'bg-brown-burned' : 'bg-gray-500'} variant={dividend.type === 'dividend' ? 'default' : 'secondary'}>
                            {dividend.type === 'dividend' ? 'Dividend' : 'JCP'}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-right font-medium text-brown-burned">
                          {formatCurrency(dividend.amount)}
                        </td>
                        <td className="py-3 px-2 text-right text-gray-600">{formatDate(dividend.exDividendDate)}</td>
                        <td className="py-3 px-2 text-right text-gray-600">{formatDate(dividend.paymentDate)}</td>
                        <td className="py-3 px-2 text-center">
                          <Badge className={isPaid ? 'bg-brown-burned' : ''} variant={isPaid ? 'default' : 'outline'}>
                            {isPaid ? 'Paid' : 'Pending'}
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
                        <h4 className="font-medium text-gray-600">{getStockName(dividend.stockId)}</h4>
                        <Badge className={dividend.type === 'dividend' ? 'bg-brown-burned' : 'bg-gray-500'} variant={dividend.type === 'dividend' ? 'default' : 'secondary'}>
                          {dividend.type === 'dividend' ? 'Dividendo' : 'JCP'}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-brown-burned">{formatCurrency(dividend.amount)}</p>
                        <Badge className={isPaid ? 'bg-brown-burned' : ''} variant={isPaid ? 'default' : 'outline'}>
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