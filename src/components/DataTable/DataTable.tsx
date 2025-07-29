import type { DataTableProps } from './DataTable.type';

function DataTable({ data }: DataTableProps) {
  console.log(data);
  return <div>DataTable</div>;
}

export { DataTable };
