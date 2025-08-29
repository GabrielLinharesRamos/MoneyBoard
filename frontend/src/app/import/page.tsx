'use client';

import { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Download, 
  Eye, 
  Trash2,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react';

interface ImportedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  uploadedAt: Date;
  transactionsCount?: number;
  totalAmount?: number;
  errorMessage?: string;
}

interface ProcessedTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  confidence: number;
}

export default function ImportStatements() {
  const [files, setFiles] = useState<ImportedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ImportedFile | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dados mockados de transações processadas
  const mockProcessedTransactions: ProcessedTransaction[] = [
    {
      id: '1',
      date: '2024-01-15',
      description: 'SUPERMERCADO ABC LTDA',
      amount: -156.78,
      category: 'Alimentação',
      type: 'expense',
      confidence: 95
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'POSTO SHELL',
      amount: -89.50,
      category: 'Transporte',
      type: 'expense',
      confidence: 98
    },
    {
      id: '3',
      date: '2024-01-13',
      description: 'TRANSFERENCIA PIX RECEBIDA',
      amount: 500.00,
      category: 'Transferência',
      type: 'income',
      confidence: 100
    },
    {
      id: '4',
      date: '2024-01-12',
      description: 'FARMACIA POPULAR',
      amount: -45.30,
      category: 'Saúde',
      type: 'expense',
      confidence: 92
    },
    {
      id: '5',
      date: '2024-01-11',
      description: 'NETFLIX BRASIL',
      amount: -29.90,
      category: 'Entretenimento',
      type: 'expense',
      confidence: 100
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: ImportedFile[] = [];
    
    Array.from(fileList).forEach((file) => {
      const newFile: ImportedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        uploadedAt: new Date()
      };
      
      newFiles.push(newFile);
      
      // Simular processo de upload e processamento
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === newFile.id 
            ? { ...f, status: 'processing' }
            : f
        ));
        
        // Simular processamento
        setTimeout(() => {
          const success = Math.random() > 0.2; // 80% de sucesso
          
          setFiles(prev => prev.map(f => 
            f.id === newFile.id 
              ? { 
                  ...f, 
                  status: success ? 'completed' : 'error',
                  transactionsCount: success ? Math.floor(Math.random() * 50) + 10 : undefined,
                  totalAmount: success ? (Math.random() * 5000) + 1000 : undefined,
                  errorMessage: success ? undefined : 'Formato de arquivo não suportado ou arquivo corrompido'
                }
              : f
          ));
        }, 2000);
      }, 1000);
    });
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
      setShowPreview(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: ImportedFile['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: ImportedFile['status']) => {
    switch (status) {
      case 'uploading':
        return 'Enviando...';
      case 'processing':
        return 'Processando...';
      case 'completed':
        return 'Concluído';
      case 'error':
        return 'Erro';
      default:
        return 'Pendente';
    }
  };

  const completedFiles = files.filter(f => f.status === 'completed');
  const totalTransactions = completedFiles.reduce((sum, f) => sum + (f.transactionsCount || 0), 0);
  const totalAmount = completedFiles.reduce((sum, f) => sum + (f.totalAmount || 0), 0);

  return (
    <Layout title="Importação de Extratos">
      <div className="space-y-6">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-xl shadow-lg border-2 border-green-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Arquivos Processados</p>
                <p className="text-2xl font-bold text-green-700">
                  {completedFiles.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Transações Importadas</p>
                <p className="text-2xl font-bold text-blue-700">
                  {totalTransactions}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl shadow-lg border-2 border-yellow-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                  R$ {totalAmount.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl shadow-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-xl shadow-lg border-2 border-purple-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Taxa de Sucesso</p>
                <p className="text-2xl font-bold text-purple-700">
                  {files.length > 0 ? Math.round((completedFiles.length / files.length) * 100) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Área de Upload */}
        <div className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent mb-4">Importar Novo Extrato</h3>
          
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-inner' 
                : 'border-yellow-300 hover:border-yellow-400 hover:bg-gradient-to-br hover:from-yellow-100 hover:to-yellow-200'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".csv,.xlsx,.xls,.ofx,.qif,.txt"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Upload className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Arraste arquivos aqui ou clique para selecionar
                </p>
                <p className="text-sm text-gray-600 font-medium mt-2">
                  Suportamos arquivos CSV, Excel, OFX, QIF e TXT até 10MB
                </p>
              </div>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Upload className="w-4 h-4 mr-2" />
                Selecionar Arquivos
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium mb-2">Formatos suportados:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>CSV (Comma Separated)</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Excel (.xlsx, .xls)</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>OFX (Open Financial Exchange)</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>QIF (Quicken Interchange)</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>TXT (Texto estruturado)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Lista de Arquivos */}
        {files.length > 0 && (
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border-2 border-gray-200">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-lg font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Arquivos Importados</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {files.map((file) => (
                <div key={file.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(file.status)}
                      
                      <div>
                        <h4 className="font-medium text-gray-900">{file.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span>{getStatusText(file.status)}</span>
                          <span>•</span>
                          <span>{file.uploadedAt.toLocaleString('pt-BR')}</span>
                        </div>
                        
                        {file.status === 'completed' && (
                          <div className="flex items-center space-x-4 text-sm text-green-600 mt-1">
                            <span>{file.transactionsCount} transações</span>
                            <span>•</span>
                            <span>R$ {file.totalAmount?.toLocaleString('pt-BR')}</span>
                          </div>
                        )}
                        
                        {file.status === 'error' && file.errorMessage && (
                          <p className="text-sm text-red-600 mt-1">{file.errorMessage}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {file.status === 'completed' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedFile(file);
                              setShowPreview(true);
                            }}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Visualizar transações"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          <button
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="Baixar relatório"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Remover arquivo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Barra de progresso para arquivos em processamento */}
                  {(file.status === 'uploading' || file.status === 'processing') && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: file.status === 'uploading' ? '30%' : '70%' }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal de Preview */}
        {showPreview && selectedFile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Transações Processadas - {selectedFile.name}
                </h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  {mockProcessedTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                          <span className={`text-lg font-bold ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR')}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                          </span>
                          
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            {transaction.category}
                          </span>
                          
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            transaction.confidence >= 95 
                              ? 'bg-green-100 text-green-800' 
                              : transaction.confidence >= 80 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.confidence}% confiança
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Nota:</strong> As transações mostradas são exemplos simulados. 
                    Em um ambiente real, estas seriam as transações extraídas e categorizadas automaticamente do seu arquivo.
                  </p>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Fechar
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Confirmar Importação
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}