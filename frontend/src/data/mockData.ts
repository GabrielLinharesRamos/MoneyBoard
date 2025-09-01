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
  { category: 'Moradia', amount: 3600, percentage: 35, color: '#FF8C00' },
  { category: 'Alimentação', amount: 1960, percentage: 19, color: '#FFD700' },
  { category: 'Transporte', amount: 1040, percentage: 10, color: '#FFA500' },
  { category: 'Investimentos', amount: 1000, percentage: 10, color: '#D2691E' },
  { category: 'Saúde', amount: 565, percentage: 5, color: '#FF6347' },
  { category: 'Educação', amount: 319, percentage: 3, color: '#DAA520' },
  { category: 'Entretenimento', amount: 1549.90, percentage: 15, color: '#B8860B' },
  { category: 'Outros', amount: 290, percentage: 3, color: '#DDD' },
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