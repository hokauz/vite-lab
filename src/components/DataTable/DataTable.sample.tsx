import { mockPagamentos } from '../../data/mockData';
import { DataTable } from './DataTable';

const DATA = [...mockPagamentos];

function DataTableSample() {
  return (
    <div>
      <h1>DataTable</h1>
      <DataTable data={DATA} />
    </div>
  );
}

export { DataTableSample };
