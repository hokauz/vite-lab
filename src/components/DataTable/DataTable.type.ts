import type { ColumnDef } from '@tanstack/react-table';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderPagination?: (table: any) => React.ReactNode;
  emptyMessage?: string;
  loading?: boolean;
}

type TableColumnDef<T> = ColumnDef<T>;

export type { DataTableProps, TableColumnDef };
