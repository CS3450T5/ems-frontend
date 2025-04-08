import { Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppNavbar from './AppNavbar';
import Header from './Header';
import SideMenu from './SideMenu';
import AppTheme from '../../shared-theme/AppTheme';
import CustomizedDataGrid from './CustomizedDataGrid';
import ChartUserByCountry from './ChartUserByCountry';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Devices(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', width: '100%' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            width: '100%',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'start',
              px: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
              width: '100%',
            }}
          >
            <Header />
            <h2>Devices</h2>
            <Grid container spacing={2} sx={{ width: '100%', margin: 0 }}>
              <Grid
                sx={{
                  width: '100%',
                  gridColumn: { xs: 'span 12', lg: 'span 8' },
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <CustomizedDataGrid />
                </Box>
              </Grid>
              <Grid
                sx={{
                  width: '100%',
                  gridColumn: { xs: 'span 12', lg: 'span 4' },
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <ChartUserByCountry />
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}