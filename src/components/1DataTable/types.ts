// ✅ tarefa concluída: Interface para props do DataTable criada
import type { ReactNode } from 'react';

// Interface para customização de células
export interface CellRenderer<T = unknown> {
  (value: unknown, row: T, column: string): ReactNode;
}

// Interface para customização de headers
export interface HeaderRenderer<T = unknown> {
  (column: string, data?: T[]): ReactNode;
}

// Interface para definição de colunas
export interface ColumnDef<T = unknown> {
  key: keyof T;
  header: string | HeaderRenderer<T>;
  width?: string;
  sortable?: boolean;
  renderer?: CellRenderer<T>;
}

// Interface para configuração de paginação
export interface PaginationConfig {
  pageSize: number;
  currentPage: number;
  totalItems: number;
}

// Interface para seleção de linhas
export interface RowSelection {
  selectedRows: string[];
  onRowSelect: (rowId: string) => void;
  onSelectAll: (selectAll: boolean) => void;
  selectAll: boolean;
}

// Interface principal para props do DataTable
export interface DataTableProps<T = unknown> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination?: PaginationConfig;
  rowSelection?: RowSelection;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSort?: (column: keyof T, direction: 'asc' | 'desc') => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  rowKey: keyof T;
}
