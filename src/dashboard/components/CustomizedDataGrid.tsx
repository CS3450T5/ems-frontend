import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { fetchData } from '../../api.ts';
import { GridRowsProp, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'device', headerName: 'Device Name', flex: 1.5, minWidth: 200 },
  {
    field: 'voltage',
    headerName: 'Avg. Voltage',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'current',
    headerName: 'Avg. Current',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'power',
    headerName: 'Avg. Power',
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

export default function CustomizedDataGrid() {

  const usableDevices = ['Fronius_SEVEN_SIX', 'Logix_Blue', 'SMA_FIFTY', 'SMA_SEVEN', 'W1-1113-TA12-6-2343-00013', 'Yaskawa'];

  const [rows, setRows] = useState([{
    id: 0,
    device: 'Device',
    voltage: 0,
    current: 1,
    power: 8,
    state: 'Disconnected'
  }]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
    let newRows = [];
      try {
	for (let i=0; i < usableDevices.length; i++) {
	  let device = usableDevices[i];
	  const deviceTotal = await fetchData(`/device-total/${device}`)
          console.log('Fetched data:', deviceTotal); 
          newRows.push({
	    id: i,
	    device: deviceTotal.device_id,
	    voltage: (deviceTotal.device_voltage_total/deviceTotal.device_entries).toFixed(3) + ' V',
	    current: (deviceTotal.device_current_total/deviceTotal.device_entries).toFixed(3) + ' A',
	    power: (deviceTotal.device_power_total/deviceTotal.device_entries).toFixed(3) + ' W',
	    state: deviceTotal.device_state
	  });
	}
	setRows(newRows);
	console.log(rows);
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
