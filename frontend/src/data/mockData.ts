// Dados mockados para o aplicativo de finanças pessoais

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  account: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  budget?: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryExpense {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

// Categorias disponíveis
export const categories: Category[] = [
  { id: '1', name: 'Alimentação', color: '#FFD700', icon: 'UtensilsCrossed' },
  { id: '2', name: 'Transporte', color: '#FFA500', icon: 'Car' },
  { id: '3', name: 'Moradia', color: '#FF8C00', icon: 'Home' },
  { id: '4', name: 'Saúde', color: '#FF6347', icon: 'Heart' },
  { id: '5', name: 'Educação', color: '#DAA520', icon: 'GraduationCap' },
  { id: '6', name: 'Entretenimento', color: '#B8860B', icon: 'Gamepad2' },
  { id: '7', name: 'Compras', color: '#CD853F', icon: 'ShoppingBag' },
  { id: '8', name: 'Investimentos', color: '#D2691E', icon: 'TrendingUp' },
  { id: '9', name: 'Salário', color: '#32CD32', icon: 'Banknote' },
  { id: '10', name: 'Freelance', color: '#228B22', icon: 'Briefcase' },
];

// Transações mockadas
export const transactions: Transaction[] = [
  // Janeiro 2024
  { id: '1', date: '2024-01-01', description: 'Salário', amount: 5500, category: 'Salário', type: 'income', account: 'Conta Corrente' },
  { id: '2', date: '2024-01-02', description: 'Supermercado Extra', amount: -320, category: 'Alimentação', type: 'expense', account: 'Cartão de Crédito' },
  { id: '3', date: '2024-01-03', description: 'Uber', amount: -45, category: 'Transporte', type: 'expense', account: 'Cartão de Débito' },
  { id: '4', date: '2024-01-05', description: 'Aluguel', amount: -1200, category: 'Moradia', type: 'expense', account: 'Conta Corrente' },
  { id: '5', date: '2024-01-07', description: 'Netflix', amount: -29.90, category: 'Entretenimento', type: 'expense', account: 'Cartão de Crédito' },
  { id: '6', date: '2024-01-10', description: 'Freelance Design', amount: 800, category: 'Freelance', type: 'income', account: 'Conta Corrente' },
  { id: '7', date: '2024-01-12', description: 'Farmácia', amount: -85, category: 'Saúde', type: 'expense', account: 'Cartão de Débito' },
  { id: '8', date: '2024-01-15', description: 'Restaurante', amount: -120, category: 'Alimentação', type: 'expense', account: 'Cartão de Crédito' },
  { id: '9', date: '2024-01-18', description: 'Gasolina', amount: -180, category: 'Transporte', type: 'expense', account: 'Cartão de Débito' },
  { id: '10', date: '2024-01-20', description: 'Curso Online', amount: -199, category: 'Educação', type: 'expense', account: 'Cartão de Crédito' },
  
  // Fevereiro 2024
  { id: '11', date: '2024-02-01', description: 'Salário', amount: 5500, category: 'Salário', type: 'income', account: 'Conta Corrente' },
  { id: '12', date: '2024-02-03', description: 'Supermercado', amount: -280, category: 'Alimentação', type: 'expense', account: 'Cartão de Crédito' },
  { id: '13', date: '2024-02-05', description: 'Aluguel', amount: -1200, category: 'Moradia', type: 'expense', account: 'Conta Corrente' },
  { id: '14', date: '2024-02-08', description: 'Cinema', amount: -60, category: 'Entretenimento', type: 'expense', account: 'Cartão de Débito' },
  { id: '15', date: '2024-02-12', description: 'Freelance', amount: 1200, category: 'Freelance', type: 'income', account: 'Conta Corrente' },
  { id: '16', date: '2024-02-14', description: 'Jantar Romântico', amount: -150, category: 'Alimentação', type: 'expense', account: 'Cartão de Crédito' },
  { id: '17', date: '2024-02-16', description: 'Roupas', amount: -300, category: 'Compras', type: 'expense', account: 'Cartão de Crédito' },
  { id: '18', date: '2024-02-20', description: 'Investimento CDB', amount: -1000, category: 'Investimentos', type: 'expense', account: 'Conta Corrente' },
  { id: '19', date: '2024-02-22', description: 'Uber', amount: -35, category: 'Transporte', type: 'expense', account: 'Cartão de Débito' },
  { id: '20', date: '2024-02-25', description: 'Médico', amount: -200, category: 'Saúde', type: 'expense', account: 'Cartão de Débito' },
  
  // Março 2024
  { id: '21', date: '2024-03-01', description: 'Salário', amount: 5500, category: 'Salário', type: 'income', account: 'Conta Corrente' },
  { id: '22', date: '2024-03-02', description: 'Supermercado', amount: -350, category: 'Alimentação', type: 'expense', account: 'Cartão de Crédito' },
  { id: '23', date: '2024-03-05', description: 'Aluguel', amount: -1200, category: 'Moradia', type: 'expense', account: 'Conta Corrente' },
  { id: '24', date: '2024-03-08', description: 'Freelance', amount: 900, category: 'Freelance', type: 'income', account: 'Conta Corrente' },
  { id: '25', date: '2024-03-10', description: 'Eletrônicos', amount: -800, category: 'Compras', type: 'expense', account: 'Cartão de Crédito' },
  { id: '26', date: '2024-03-12', description: 'Gasolina', amount: -200, category: 'Transporte', type: 'expense', account: 'Cartão de Débito' },
  { id: '27', date: '2024-03-15', description: 'Restaurante', amount: -90, category: 'Alimentação', type: 'expense', account: 'Cartão de Crédito' },
  { id: '28', date: '2024-03-18', description: 'Academia', amount: -80, category: 'Saúde', type: 'expense', account: 'Cartão de Débito' },
  { id: '29', date: '2024-03-20', description: 'Livros', amount: -120, category: 'Educação', type: 'expense', account: 'Cartão de Crédito' },
  { id: '30', date: '2024-03-25', description: 'Show', amount: -180, category: 'Entretenimento', type: 'expense', account: 'Cartão de Crédito' },
];

// Dados mensais para gráfico de evolução
export const monthlyData: MonthlyData[] = [
  { month: 'Jan', income: 6300, expenses: 2179.90, balance: 4120.10 },
  { month: 'Fev', income: 6700, expenses: 3225, balance: 3475 },
  { month: 'Mar', income: 6400, expenses: 3020, balance: 3380 },
  { month: 'Abr', income: 5800, expenses: 2850, balance: 2950 },
  { month: 'Mai', income: 6200, expenses: 3100, balance: 3100 },
  { month: 'Jun', income: 6500, expenses: 2900, balance: 3600 },
];

// Despesas por categoria para gráfico de pizza
export const categoryExpenses: CategoryExpense[] = [
  { category: 'Moradia', amount: 3600, percentage: 35, color: '#B8860B' },
  { category: 'Alimentação', amount: 1960, percentage: 19, color: '#B8860B' },
  { category: 'Transporte', amount: 1040, percentage: 10, color: '#B8860B' },
  { category: 'Investimentos', amount: 1000, percentage: 10, color: '#B8860B' },
  { category: 'Saúde', amount: 565, percentage: 5, color: '#B8860B' },
  { category: 'Educação', amount: 319, percentage: 3, color: '#B8860B' },
  { category: 'carta pokemon', amount: 1549.90, percentage: 15, color: '#B8860B' },
  { category: 'Outros', amount: 290, percentage: 3, color: '#B8860B' },
];

// Estatísticas gerais
export const stats = {
  totalBalance: 15420.50,
  monthlyIncome: 6400,
  monthlyExpenses: 3020,
  savingsRate: 52.8,
  totalTransactions: transactions.length,
  categoriesCount: categories.length,
};

// Função para filtrar transações por período
export const getTransactionsByPeriod = (period: 'week' | 'month' | 'year') => {
  const now = new Date();
  const filtered = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    
    switch (period) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return transactionDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return transactionDate >= monthAgo;
      case 'year':
        const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        return transactionDate >= yearAgo;
      default:
        return true;
    }
  });
  
  return filtered;
};

// Função para calcular gastos por categoria
export const getExpensesByCategory = (transactions: Transaction[]) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const categoryTotals: { [key: string]: number } = {};
  
  expenses.forEach(expense => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + Math.abs(expense.amount);
  });
  
  return Object.entries(categoryTotals).map(([category, amount]) => {
    const categoryInfo = categories.find(c => c.name === category);
    return {
      category,
      amount,
      color: categoryInfo?.color || '#DDD',
      percentage: 0 // Será calculado no componente
    };
  });
};

// Interfaces para Investimentos
export interface Stock {
  id: string;
  ticker: string;
  companyName: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  sector: string;
}

export interface Dividend {
  id: string;
  stockId: string;
  ticker: string;
  amount: number;
  paymentDate: string;
  exDividendDate: string;
  type: 'dividend' | 'jscp' | 'bonus';
}

export interface MonthlyDividend {
  month: string;
  amount: number;
  count: number;
}

export interface InvestmentSummary {
  totalInvested: number;
  currentValue: number;
  totalReturn: number;
  totalReturnPercentage: number;
  totalDividends: number;
  monthlyDividendYield: number;
}

// Dados mockados de ações
export const stocks: Stock[] = [
  {
    id: '1',
    ticker: 'PETR4',
    companyName: 'Petrobras PN',
    quantity: 100,
    purchasePrice: 28.50,
    currentPrice: 32.15,
    purchaseDate: '2023-06-15',
    sector: 'Petróleo e Gás'
  },
  {
    id: '2',
    ticker: 'VALE3',
    companyName: 'Vale ON',
    quantity: 50,
    purchasePrice: 65.20,
    currentPrice: 71.80,
    purchaseDate: '2023-08-10',
    sector: 'Mineração'
  },
  {
    id: '3',
    ticker: 'ITUB4',
    companyName: 'Itaú Unibanco PN',
    quantity: 200,
    purchasePrice: 25.30,
    currentPrice: 27.90,
    purchaseDate: '2023-05-20',
    sector: 'Bancos'
  },
  {
    id: '4',
    ticker: 'BBDC4',
    companyName: 'Bradesco PN',
    quantity: 150,
    purchasePrice: 18.75,
    currentPrice: 20.45,
    purchaseDate: '2023-07-05',
    sector: 'Bancos'
  },
  {
    id: '5',
    ticker: 'WEGE3',
    companyName: 'WEG ON',
    quantity: 80,
    purchasePrice: 42.10,
    currentPrice: 45.30,
    purchaseDate: '2023-09-12',
    sector: 'Máquinas e Equipamentos'
  }
];

// Dados mockados de dividendos
export const dividends: Dividend[] = [
  { id: '1', stockId: '1', ticker: 'PETR4', amount: 1.25, paymentDate: '2024-01-15', exDividendDate: '2024-01-10', type: 'dividend' },
  { id: '2', stockId: '3', ticker: 'ITUB4', amount: 0.85, paymentDate: '2024-01-20', exDividendDate: '2024-01-15', type: 'dividend' },
  { id: '3', stockId: '4', ticker: 'BBDC4', amount: 0.65, paymentDate: '2024-01-25', exDividendDate: '2024-01-20', type: 'dividend' },
  { id: '4', stockId: '2', ticker: 'VALE3', amount: 2.10, paymentDate: '2024-02-10', exDividendDate: '2024-02-05', type: 'dividend' },
  { id: '5', stockId: '1', ticker: 'PETR4', amount: 1.30, paymentDate: '2024-02-15', exDividendDate: '2024-02-10', type: 'dividend' },
  { id: '6', stockId: '5', ticker: 'WEGE3', amount: 0.45, paymentDate: '2024-02-20', exDividendDate: '2024-02-15', type: 'dividend' },
  { id: '7', stockId: '3', ticker: 'ITUB4', amount: 0.90, paymentDate: '2024-03-15', exDividendDate: '2024-03-10', type: 'dividend' },
  { id: '8', stockId: '4', ticker: 'BBDC4', amount: 0.70, paymentDate: '2024-03-20', exDividendDate: '2024-03-15', type: 'dividend' },
  { id: '9', stockId: '1', ticker: 'PETR4', amount: 1.40, paymentDate: '2024-03-25', exDividendDate: '2024-03-20', type: 'dividend' },
  { id: '10', stockId: '2', ticker: 'VALE3', amount: 2.25, paymentDate: '2024-04-10', exDividendDate: '2024-04-05', type: 'dividend' }
];

// Dados de dividendos mensais
export const monthlyDividends: MonthlyDividend[] = [
  { month: '2024-01', amount: 270, count: 3 },
  { month: '2024-02', amount: 341, count: 3 },
  { month: '2024-03', amount: 300, count: 3 },
  { month: '2024-04', amount: 112.5, count: 1 },
  { month: '2024-05', amount: 185, count: 2 },
  { month: '2024-06', amount: 220, count: 2 },
  { month: '2024-07', amount: 195, count: 1 },
  { month: '2024-08', amount: 310, count: 4 },
  { month: '2024-09', amount: 275, count: 3 },
  { month: '2024-10', amount: 340, count: 3 },
  { month: '2024-11', amount: 290, count: 2 },
  { month: '2024-12', amount: 380, count: 4 }
];

// Função para calcular resumo dos investimentos
export const getInvestmentSummary = (): InvestmentSummary => {
  const totalInvested = stocks.reduce((sum, stock) => sum + (stock.quantity * stock.purchasePrice), 0);
  const currentValue = stocks.reduce((sum, stock) => sum + (stock.quantity * stock.currentPrice), 0);
  const totalReturn = currentValue - totalInvested;
  const totalReturnPercentage = (totalReturn / totalInvested) * 100;
  const totalDividends = dividends.reduce((sum, dividend) => {
    const stock = stocks.find(s => s.id === dividend.stockId);
    return sum + (dividend.amount * (stock?.quantity || 0));
  }, 0);
  const monthlyDividendYield = (totalDividends / 12) / currentValue * 100;

  return {
    totalInvested,
    currentValue,
    totalReturn,
    totalReturnPercentage,
    totalDividends,
    monthlyDividendYield
  };
};

// Função para obter dividendos por ação
export const getDividendsByStock = (stockId: string) => {
  return dividends.filter(dividend => dividend.stockId === stockId);
};