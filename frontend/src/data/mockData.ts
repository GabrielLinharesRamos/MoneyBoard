// Mock data for personal finance application

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

export interface ExpenseGoal {
  id: string;
  categoryId: string;
  monthlyLimit: number;
  currentSpent: number;
  alertThreshold: number; // Percentage for alert (e.g.: 80)
}

export interface MonthlyExpenseData {
  month: string;
  totalExpenses: number;
  categoryBreakdown: { [category: string]: number };
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

// Available categories with budgets
export const categories: Category[] = [
  { id: '1', name: 'Food', color: '#b3854d', icon: 'UtensilsCrossed', budget: 800 },
  { id: '2', name: 'Transportation', color: '#8b6914', icon: 'Car', budget: 400 },
  { id: '3', name: 'Housing', color: '#a0522d', icon: 'Home', budget: 1500 },
  { id: '4', name: 'Health', color: '#cd853f', icon: 'Heart', budget: 300 },
  { id: '5', name: 'Education', color: '#daa520', icon: 'GraduationCap', budget: 200 },
  { id: '6', name: 'Entertainment', color: '#d2691e', icon: 'Gamepad2', budget: 250 },
  { id: '7', name: 'Shopping', color: '#bc8f8f', icon: 'ShoppingBag', budget: 300 },
  { id: '8', name: 'Investments', color: '#8b4513', icon: 'TrendingUp', budget: 1000 },
  { id: '9', name: 'Salary', color: '#32CD32', icon: 'Banknote' },
  { id: '10', name: 'Freelance', color: '#228B22', icon: 'Briefcase' },
  { id: '11', name: 'Services', color: '#9b7653', icon: 'Settings', budget: 150 },
  { id: '12', name: 'Taxes', color: '#8b7355', icon: 'FileText', budget: 500 },
];

// Expense goals by category
export const expenseGoals: ExpenseGoal[] = [
  { id: '1', categoryId: '1', monthlyLimit: 800, currentSpent: 650, alertThreshold: 80 },
  { id: '2', categoryId: '2', monthlyLimit: 400, currentSpent: 320, alertThreshold: 85 },
  { id: '3', categoryId: '3', monthlyLimit: 1500, currentSpent: 1200, alertThreshold: 90 },
  { id: '4', categoryId: '4', monthlyLimit: 300, currentSpent: 185, alertThreshold: 75 },
  { id: '5', categoryId: '5', monthlyLimit: 200, currentSpent: 120, alertThreshold: 80 },
  { id: '6', categoryId: '6', monthlyLimit: 250, currentSpent: 180, alertThreshold: 85 },
  { id: '7', categoryId: '7', monthlyLimit: 300, currentSpent: 280, alertThreshold: 80 },
  { id: '8', categoryId: '11', monthlyLimit: 150, currentSpent: 95, alertThreshold: 75 },
];

// Mock transactions
export const transactions: Transaction[] = [
  // January 2024
  { id: '1', date: '2024-01-01', description: 'Salary', amount: 5500, category: 'Salary', type: 'income', account: 'Checking Account' },
  { id: '2', date: '2024-01-02', description: 'Extra Supermarket', amount: -320, category: 'Food', type: 'expense', account: 'Credit Card' },
  { id: '3', date: '2024-01-03', description: 'Uber', amount: -45, category: 'Transportation', type: 'expense', account: 'Debit Card' },
  { id: '4', date: '2024-01-05', description: 'Rent', amount: -1200, category: 'Housing', type: 'expense', account: 'Checking Account' },
  { id: '5', date: '2024-01-07', description: 'Netflix', amount: -29.90, category: 'Entertainment', type: 'expense', account: 'Credit Card' },
  { id: '6', date: '2024-01-10', description: 'Freelance Design', amount: 800, category: 'Freelance', type: 'income', account: 'Checking Account' },
  { id: '7', date: '2024-01-12', description: 'Pharmacy', amount: -85, category: 'Health', type: 'expense', account: 'Debit Card' },
  { id: '8', date: '2024-01-15', description: 'Restaurant', amount: -120, category: 'Food', type: 'expense', account: 'Credit Card' },
  { id: '9', date: '2024-01-18', description: 'Gas', amount: -180, category: 'Transportation', type: 'expense', account: 'Debit Card' },
  { id: '10', date: '2024-01-20', description: 'Online Course', amount: -199, category: 'Education', type: 'expense', account: 'Credit Card' },
  { id: '31', date: '2024-01-04', description: 'João\'s Bakery', amount: -25.80, category: 'Food', type: 'expense', account: 'Debit Card' },
  { id: '32', date: '2024-01-06', description: 'Electricity Bill', amount: -85.50, category: 'Housing', type: 'expense', account: 'Checking Account' },
  { id: '33', date: '2024-01-08', description: 'Spotify', amount: -16.90, category: 'Entertainment', type: 'expense', account: 'Credit Card' },
  { id: '34', date: '2024-01-11', description: 'Snack Bar', amount: -35.50, category: 'Food', type: 'expense', account: 'Debit Card' },
  { id: '35', date: '2024-01-13', description: 'Internet', amount: -89.90, category: 'Services', type: 'expense', account: 'Checking Account' },
  { id: '36', date: '2024-01-16', description: 'Technical Book', amount: -65.00, category: 'Education', type: 'expense', account: 'Credit Card' },
  { id: '37', date: '2024-01-19', description: 'PETR4 Stocks', amount: -500.00, category: 'Investments', type: 'expense', account: 'Checking Account' },
  { id: '38', date: '2024-01-22', description: 'Sneakers', amount: -180.00, category: 'Shopping', type: 'expense', account: 'Credit Card' },
  { id: '39', date: '2024-01-24', description: 'Property Tax', amount: -180.00, category: 'Taxes', type: 'expense', account: 'Checking Account' },
  { id: '40', date: '2024-01-26', description: 'Dentist', amount: -200.00, category: 'Health', type: 'expense', account: 'Debit Card' },
  
  // February 2024
  { id: '11', date: '2024-02-01', description: 'Salary', amount: 5500, category: 'Salary', type: 'income', account: 'Checking Account' },
  { id: '12', date: '2024-02-03', description: 'Supermarket', amount: -280, category: 'Food', type: 'expense', account: 'Credit Card' },
  { id: '13', date: '2024-02-05', description: 'Rent', amount: -1200, category: 'Housing', type: 'expense', account: 'Checking Account' },
  { id: '14', date: '2024-02-08', description: 'Cinema', amount: -60, category: 'Entertainment', type: 'expense', account: 'Debit Card' },
  { id: '15', date: '2024-02-12', description: 'Freelance', amount: 1200, category: 'Freelance', type: 'income', account: 'Checking Account' },
  { id: '16', date: '2024-02-14', description: 'Romantic Dinner', amount: -150, category: 'Food', type: 'expense', account: 'Credit Card' },
  { id: '17', date: '2024-02-16', description: 'Clothes', amount: -300, category: 'Shopping', type: 'expense', account: 'Credit Card' },
  { id: '18', date: '2024-02-20', description: 'CDB Investment', amount: -1000, category: 'Investments', type: 'expense', account: 'Checking Account' },
  { id: '19', date: '2024-02-22', description: 'Uber', amount: -35, category: 'Transportation', type: 'expense', account: 'Debit Card' },
  { id: '20', date: '2024-02-25', description: 'Doctor', amount: -200, category: 'Health', type: 'expense', account: 'Debit Card' },
  { id: '41', date: '2024-02-02', description: 'Central Bakery', amount: -28.50, category: 'Food', type: 'expense', account: 'Debit Card' },
  { id: '42', date: '2024-02-04', description: 'Gas Bill', amount: -75.30, category: 'Housing', type: 'expense', account: 'Checking Account' },
  { id: '43', date: '2024-02-06', description: 'Spotify Premium', amount: -16.90, category: 'Entertainment', type: 'expense', account: 'Credit Card' },
  { id: '44', date: '2024-02-09', description: 'Work Cafeteria', amount: -42.80, category: 'Food', type: 'expense', account: 'Debit Card' },
  { id: '45', date: '2024-02-11', description: 'Landline Phone', amount: -65.90, category: 'Services', type: 'expense', account: 'Checking Account' },
  { id: '46', date: '2024-02-13', description: 'Udemy Online Course', amount: -89.90, category: 'Education', type: 'expense', account: 'Credit Card' },
  { id: '47', date: '2024-02-17', description: 'VALE3 Stocks', amount: -800.00, category: 'Investments', type: 'expense', account: 'Checking Account' },
  { id: '48', date: '2024-02-19', description: 'Shoes', amount: -250.00, category: 'Shopping', type: 'expense', account: 'Credit Card' },
  { id: '49', date: '2024-02-21', description: 'Vehicle Tax', amount: -320.00, category: 'Taxes', type: 'expense', account: 'Checking Account' },
  { id: '50', date: '2024-02-23', description: 'Physiotherapist', amount: -150.00, category: 'Health', type: 'expense', account: 'Debit Card' },
  
  // March 2024
  { id: '21', date: '2024-03-01', description: 'Salary', amount: 5500, category: 'Salary', type: 'income', account: 'Checking Account' },
  { id: '22', date: '2024-03-02', description: 'Supermarket', amount: -350, category: 'Food', type: 'expense', account: 'Credit Card' },
  { id: '23', date: '2024-03-05', description: 'Rent', amount: -1200, category: 'Housing', type: 'expense', account: 'Checking Account' },
  { id: '24', date: '2024-03-08', description: 'Freelance', amount: 900, category: 'Freelance', type: 'income', account: 'Checking Account' },
  { id: '25', date: '2024-03-10', description: 'Electronics', amount: -800, category: 'Shopping', type: 'expense', account: 'Credit Card' },
  { id: '26', date: '2024-03-12', description: 'Gas', amount: -200, category: 'Transportation', type: 'expense', account: 'Debit Card' },
  { id: '27', date: '2024-03-15', description: 'Restaurant', amount: -90, category: 'Food', type: 'expense', account: 'Credit Card' },
  { id: '28', date: '2024-03-18', description: 'Gym', amount: -80, category: 'Health', type: 'expense', account: 'Debit Card' },
  { id: '29', date: '2024-03-20', description: 'Books', amount: -120, category: 'Education', type: 'expense', account: 'Credit Card' },
  { id: '30', date: '2024-03-25', description: 'Concert', amount: -180, category: 'Entertainment', type: 'expense', account: 'Credit Card' },
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

// Monthly data specific for expense control
export const monthlyExpenseData: MonthlyExpenseData[] = [
  {
    month: 'January 2024',
    totalExpenses: 2460,
    categoryBreakdown: {
      'Food': 275.80,
      'Transportation': 155.50,
      'Housing': 1285.50,
      'Health': 195.90,
      'Education': 164.90,
      'Entertainment': 74.90,
      'Shopping': 360.00,
      'Investments': 500.00,
      'Services': 89.90,
      'Taxes': 180.00
    }
  },
  {
    month: 'February 2024',
    totalExpenses: 2340,
    categoryBreakdown: {
      'Food': 347.20,
      'Transportation': 235.00,
      'Housing': 1141.10,
      'Health': 350.00,
      'Education': 239.90,
      'Entertainment': 71.70,
      'Shopping': 720.00,
      'Investments': 1800.00,
      'Services': 155.80,
      'Taxes': 320.00
    }
  },
  {
    month: 'March 2024',
    totalExpenses: 2680,
    categoryBreakdown: {
      'Food': 420.50,
      'Transportation': 180.00,
      'Housing': 1350.00,
      'Health': 280.00,
      'Education': 120.00,
      'Entertainment': 95.50,
      'Shopping': 180.00,
      'Investments': 600.00,
      'Services': 125.00,
      'Taxes': 250.00
    }
  }
];

// Expenses by category for pie chart
export const categoryExpenses: CategoryExpense[] = [
  { category: 'Housing', amount: 3600, percentage: 35, color: '#B8860B' },
  { category: 'Food', amount: 1960, percentage: 19, color: '#B8860B' },
  { category: 'Transportation', amount: 1040, percentage: 10, color: '#B8860B' },
  { category: 'Investments', amount: 1000, percentage: 10, color: '#B8860B' },
  { category: 'Health', amount: 565, percentage: 5, color: '#B8860B' },
  { category: 'Education', amount: 319, percentage: 3, color: '#B8860B' },
  { category: 'Pokemon Cards', amount: 1549.90, percentage: 15, color: '#B8860B' },
  { category: 'Others', amount: 290, percentage: 3, color: '#B8860B' },
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

// Function to calculate expenses by category
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

// Interfaces for Investments
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

// Function to calculate investment summary
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