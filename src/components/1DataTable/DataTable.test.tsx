// ✅ tarefa concluída: Teste unitário básico do DataTable criado
import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';
import type { ColumnDef } from './types';

// Dados de teste
const mockData = [
  { id: '1', nome: 'João Silva', valor: 1500 },
  { id: '2', nome: 'Maria Santos', valor: 2500 },
];

const mockColumns: ColumnDef<(typeof mockData)[0]>[] = [
  { key: 'nome', header: 'Nome' },
  { key: 'valor', header: 'Valor' },
];

describe('DataTable', () => {
  it('deve renderizar a tabela com dados', () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        rowKey='id'
        pagination={{
          currentPage: 1,
          pageSize: 10,
          totalItems: mockData.length,
        }}
      />
    );

    // Verifica se os headers estão presentes
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();

    // Verifica se os dados estão presentes
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    expect(screen.getByText('1500')).toBeInTheDocument();
    expect(screen.getByText('2500')).toBeInTheDocument();
  });

  it('deve exibir mensagem quando não há dados', () => {
    render(<DataTable data={[]} columns={mockColumns} rowKey='id' emptyMessage='Nenhum registro encontrado' />);

    expect(screen.getByText('Nenhum registro encontrado')).toBeInTheDocument();
  });

  it('deve exibir estado de loading', () => {
    render(<DataTable data={[]} columns={mockColumns} rowKey='id' loading={true} />);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });
});
