import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Link from '@mui/material/Link';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

const breadcrumbNameMap: { [key: string]: string } = {
  '/': 'Home',
  '/devices': 'Devices',
  '/settings': 'Settings',
};

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Link component={RouterLink} to="/">
        Dashboard
      </Link>
      {pathnames.map((_, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }} key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Link component={RouterLink} to={to} key={to}>
            {breadcrumbNameMap[to]}
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
}