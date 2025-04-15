import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { fetchData } from '../../api.ts';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'device', headerName: 'Device Name', flex: 1.5, minWidth: 200 },
  {
    field: 'voltage',
    headerName: 'Voltage',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'current',
    headerName: 'Current',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'power',
    headerName: 'Power',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'state',
    headerName: 'State',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  }
];

//const rows: GridRowsProp = [
  //{
    //id: 1,
    //device: 'bruh',
    //voltage: 1,
    //current: 12,
    //power: 7,
    //state: 'Disconnected'
  //}
//];

export default function CustomizedDataGrid() {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const maxEnergy = await fetchData('/max-energy');
        console.log('Fetched data:', maxEnergy); 
        setRows(maxEnergy);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromAPI();
  }, []);

  return (
    <DataGrid
      checkboxSelection
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}
