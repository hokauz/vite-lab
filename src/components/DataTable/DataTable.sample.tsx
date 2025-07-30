import { mockPagamentos } from '../../data/mockData';
import { DataTable } from './DataTable';
import type { Pagamento } from '../../types';
import type { TableColumnDef } from './DataTable.type';

// Definindo colunas com diferentes tipos de headers
const columns: TableColumnDef<Pagamento>[] = [
  {
    accessorKey: 'nome',
    header: 'Nome', // Header simples como string
    enableSorting: true,
  },
  {
    accessorKey: 'data',
    header: 'Data',
    enableSorting: true,
  },
  {
    accessorKey: 'valor',
    header: () => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f9ff',
          padding: '4px 8px',
          borderRadius: '4px',
          fontWeight: 'bold',
        }}
      >
        💰 Valor (R$)
      </div>
    ),
    cell: (value) => {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return '-';
      }
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(numValue);
    },
    enableSorting: true,
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
    enableSorting: true,
  },
  {
    accessorKey: 'user_id',
    header: (column) => (
      <button
        style={{
          background: 'none',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          padding: '2px 6px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
        onClick={() => alert(`Filtrar por coluna: ${column}`)}
      >
        🔍 User ID
      </button>
    ), // Header customizado com botão interativo
    enableSorting: true,
  },
];

function DataTableSample() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>DataTable com Headers Customizados</h1>

      <DataTable<Pagamento>
        data={mockPagamentos}
        columns={columns}
        loading={false}
        emptyMessage='Nenhum pagamento encontrado'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderPagination={(table: any) => (
          <div>
            <div>
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
              selected.
            </div>
            <div>
              <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
              </button>
              <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export { DataTableSample };
