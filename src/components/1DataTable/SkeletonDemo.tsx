import React, { useState } from 'react';
import DataTable from './DataTable';
import TableSkeleton from './TableSkeleton';
import type { ColumnDef } from './types';
import type { Pagamento } from '../../types';
import { mockPagamentos } from '../../data/mockData';

const columns: ColumnDef<Pagamento>[] = [
  {
    key: 'nome',
    header: 'Nome',
    sortable: true,
  },
  {
    key: 'data',
    header: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        📅 <span>Data</span>
      </div>
    ),
    sortable: true,
  },
  {
    key: 'valor',
    header: () => (
      <div
        style={{
          backgroundColor: '#f0f9ff',
          padding: '4px 8px',
          borderRadius: '4px',
          fontWeight: 'bold',
        }}
      >
        💰 Valor
      </div>
    ),
    renderer: (value) => {
      const numValue = Number(value);
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(numValue);
    },
    sortable: true,
  },
  {
    key: 'descricao',
    header: 'Descrição',
    sortable: false,
  },
];

const SkeletonDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLoading = () => {
    setIsLoading(true);
    // Simula um carregamento de 3 segundos
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Demonstração do Table Skeleton</h1>

      {/* Controles */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleToggleLoading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Simular Carregamento (3s)'}
        </button>
      </div>

      {/* Exemplo 1: Skeleton Standalone */}
      <div style={{ marginBottom: '40px' }}>
        <h2>1. TableSkeleton Standalone</h2>
        <p>Componente skeleton independente com diferentes configurações:</p>

        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          {/* Skeleton básico */}
          <div>
            <h3>Básico (5 linhas, 4 colunas)</h3>
            <TableSkeleton />
          </div>

          {/* Skeleton sem header */}
          <div>
            <h3>Sem Header</h3>
            <TableSkeleton rows={3} columns={3} showHeader={false} />
          </div>

          {/* Skeleton sem paginação */}
          <div>
            <h3>Sem Paginação</h3>
            <TableSkeleton rows={4} columns={5} showPagination={false} />
          </div>

          {/* Skeleton customizado */}
          <div>
            <h3>Customizado (8 linhas, 6 colunas)</h3>
            <TableSkeleton rows={8} columns={6} />
          </div>
        </div>
      </div>

      {/* Exemplo 2: Integrado ao DataTable */}
      <div>
        <h2>2. TableSkeleton Integrado ao DataTable</h2>
        <p>Skeleton é exibido automaticamente quando a prop `loading` é `true`:</p>

        <DataTable
          data={mockPagamentos as unknown as Record<string, unknown>[]}
          columns={columns as never[]}
          rowKey='id'
          pagination={{
            pageSize: 8,
            currentPage: 1,
            totalItems: mockPagamentos.length,
          }}
          loading={isLoading}
          emptyMessage='Nenhum pagamento encontrado'
        />
      </div>

      {/* Documentação */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h2>Documentação</h2>
        <h3>Props do TableSkeleton:</h3>
        <ul>
          <li>
            <code>rows?: number</code> - Número de linhas skeleton (padrão: 5)
          </li>
          <li>
            <code>columns?: number</code> - Número de colunas skeleton (padrão: 4)
          </li>
          <li>
            <code>showHeader?: boolean</code> - Exibir header skeleton (padrão: true)
          </li>
          <li>
            <code>showPagination?: boolean</code> - Exibir paginação skeleton (padrão: true)
          </li>
          <li>
            <code>className?: string</code> - Classes CSS adicionais
          </li>
        </ul>

        <h3>Características:</h3>
        <ul>
          <li>✅ Animação shimmer suave</li>
          <li>✅ Larguras variáveis para simular conteúdo real</li>
          <li>✅ Delays escalonados para efeito cascata</li>
          <li>✅ Responsive design</li>
          <li>✅ Suporte a dark mode</li>
          <li>✅ Integração automática com DataTable</li>
        </ul>
      </div>
    </div>
  );
};

export default SkeletonDemo;
