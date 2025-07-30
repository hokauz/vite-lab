import { flexRender, type Header } from '@tanstack/react-table';
import { useDataTable } from './DataTable.hook';
import type { DataTableProps } from './DataTable.type';
import TableSkeleton from '../1DataTable/TableSkeleton';

const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => {
  return <table {...props}>{children}</table>;
};

const TableHeader = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return <thead {...props}>{children}</thead>;
};

interface TableHeadProps<T> extends React.HTMLAttributes<HTMLTableCellElement> {
  header: Header<T, unknown>;
}

const TableHead = <T,>({ header, ...props }: TableHeadProps<T>) => {
  const target = header.column.columnDef.header;
  const simple = typeof target === 'string';
  const enableSorting = header.column.columnDef.enableSorting;
  const asc = header.column.getIsSorted() === 'asc';

  if (simple) {
    return flexRender(
      <th {...props} onClick={() => header.column.toggleSorting(header.column.getIsSorted() === 'asc')}>
        <div>
          {target}
          {enableSorting && <div>{asc ? '↑' : '↓'}</div>}
        </div>
      </th>,
      header.getContext()
    );
  }

  if (header.isPlaceholder) {
    return null;
  }

  return <th {...props}>{flexRender(header.column.columnDef.header, header.getContext())}</th>;
};

const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => {
  return <tr {...props}>{children}</tr>;
};

const TableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return <tbody {...props}>{children}</tbody>;
};

const TableCell = ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => {
  return <td {...props}>{children}</td>;
};

function DataTable<T>({
  data,
  columns,
  emptyMessage = 'Sem resultados',
  loading = false,
  renderPagination,
}: DataTableProps<T>) {
  const { table, headers, rows } = useDataTable({ data, columns });

  if (loading) {
    return <TableSkeleton rows={5} columns={columns.length} />;
  }

  return (
    <div>
      <div>
        <Table>
          <TableHeader>
            {headers().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} header={header} />
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows().length ? (
              rows().map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell col-span={columns.length}>{emptyMessage}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {renderPagination && renderPagination(table)}
      </div>
    </div>
  );
}

export { DataTable };
