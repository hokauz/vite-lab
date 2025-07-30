// ✅ tarefa concluída: Componente DataTable implementado com todas as funcionalidades
import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  flexRender,
  type SortingState,
  type RowSelectionState,
} from '@tanstack/react-table';
import type { DataTableProps, HeaderRenderer } from './types';
import TableSkeleton from './TableSkeleton';
import './DataTable.scss';

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  pagination,
  rowSelection,
  onPageChange,
  onPageSizeChange,
  loading = false,
  emptyMessage = 'Nenhum dado encontrado',
  className = '',
  rowKey,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({});

  // Configuração das colunas do TanStack Table
  const tableColumns = useMemo<ColumnDef<T>[]>(() => {
    const cols: ColumnDef<T>[] = [];

    // Coluna de seleção se rowSelection estiver configurado
    if (rowSelection) {
      cols.push({
        id: 'select',
        header: ({ table }) => (
          <input
            type='checkbox'
            checked={table.getIsAllRowsSelected()}
            onChange={(e) => {
              table.toggleAllRowsSelected(e.target.checked);
              rowSelection.onSelectAll(e.target.checked);
            }}
            className='data-table__checkbox'
          />
        ),
        cell: ({ row }) => (
          <input
            type='checkbox'
            checked={row.getIsSelected()}
            onChange={(e) => {
              row.toggleSelected(e.target.checked);
              const rowId = String(row.original[rowKey]);
              rowSelection.onRowSelect(rowId);
            }}
            className='data-table__checkbox'
          />
        ),
        enableSorting: false,
        size: 50,
      });
    }

    // Adicionar colunas de dados
    columns.forEach((col) => {
      cols.push({
        accessorKey: col.key as string,
        header:
          typeof col.header === 'function' ? () => (col.header as HeaderRenderer<T>)(String(col.key)) : col.header,
        cell: ({ getValue, row }) => {
          const value = getValue();
          return col.renderer ? col.renderer(value, row.original, String(col.key)) : value;
        },
        enableSorting: col.sortable ?? true,
        size: col.width ? parseInt(col.width) : undefined,
      });
    });

    return cols;
  }, [columns, rowSelection, rowKey]);

  // Configuração da tabela
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      rowSelection: rowSelectionState,
      pagination: pagination
        ? {
            pageIndex: pagination.currentPage - 1,
            pageSize: pagination.pageSize,
          }
        : undefined,
    },
    enableRowSelection: !!rowSelection,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelectionState,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: !!pagination,
    pageCount: pagination ? Math.ceil(pagination.totalItems / pagination.pageSize) : undefined,
    getRowId: (row) => String(row[rowKey]),
  });

  // Handlers
  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  };

  if (loading) {
    return (
      <TableSkeleton
        rows={pagination?.pageSize || 10}
        columns={columns.length + (rowSelection ? 1 : 0)}
        showHeader={true}
        showPagination={!!pagination}
        className={className}
      />
    );
  }

  return (
    <div className={`data-table ${className}`}>
      {/* Tabela */}
      <div className='data-table__container'>
        <table className='data-table__table'>
          <thead className='data-table__header'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className='data-table__header-row'>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`data-table__header-cell ${
                      header.column.getCanSort() ? 'data-table__header-cell--sortable' : ''
                    }`}
                    style={{ width: header.getSize() !== 150 ? header.getSize() : 'auto' }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className='data-table__header-content'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className='data-table__sort-indicator'>
                          {header.column.getIsSorted() === 'asc'
                            ? '↑'
                            : header.column.getIsSorted() === 'desc'
                            ? '↓'
                            : '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='data-table__body'>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={table.getAllColumns().length} className='data-table__empty-message'>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`data-table__row ${row.getIsSelected() ? 'data-table__row--selected' : ''}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='data-table__cell'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {pagination && (
        <div className='data-table__pagination'>
          <div className='data-table__pagination-info'>
            Página {pagination.currentPage} de {Math.ceil(pagination.totalItems / pagination.pageSize)}(
            {pagination.totalItems} itens)
          </div>

          <div className='data-table__pagination-controls'>
            <button
              className='data-table__pagination-button'
              onClick={() => handlePageChange(1)}
              disabled={pagination.currentPage === 1}
            >
              {'<<'}
            </button>
            <button
              className='data-table__pagination-button'
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              {'<'}
            </button>

            <span className='data-table__pagination-current'>{pagination.currentPage}</span>

            <button
              className='data-table__pagination-button'
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= Math.ceil(pagination.totalItems / pagination.pageSize)}
            >
              {'>'}
            </button>
            <button
              className='data-table__pagination-button'
              onClick={() => handlePageChange(Math.ceil(pagination.totalItems / pagination.pageSize))}
              disabled={pagination.currentPage >= Math.ceil(pagination.totalItems / pagination.pageSize)}
            >
              {'>>'}
            </button>
          </div>

          <div className='data-table__page-size'>
            <label htmlFor='pageSize'>Itens por página:</label>
            <select
              id='pageSize'
              value={pagination.pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className='data-table__page-size-select'
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}

      {/* Informações de seleção */}
      {rowSelection && rowSelection.selectedRows.length > 0 && (
        <div className='data-table__selection-info'>{rowSelection.selectedRows.length} item(s) selecionado(s)</div>
      )}
    </div>
  );
}

export default DataTable;
