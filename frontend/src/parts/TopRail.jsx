import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { INK, ORANGE } from '../theme';

export default function TopRail() {
  const { pathname } = useLocation();
  const onDash = pathname === '/';
  const onAdd = pathname === '/add';

  return (
    <AppBar>
      <Toolbar
        sx={{
          maxWidth: 1120,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          py: 1.5,
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: ORANGE,
              border: `2px solid ${INK}`,
              boxShadow: `3px 3px 0 ${INK}`,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <SavingsRoundedIcon sx={{ color: INK }} />
          </Box>
          <Box>
            <Typography variant="h5" component="div" sx={{ lineHeight: 1, color: INK }}>
              MangoLedger
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
              Personal Expense Tracker
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, pr: 0.5, pb: 0.5 }}>
          <Button
            component={Link}
            to="/"
            size="small"
            variant={onDash ? 'contained' : 'outlined'}
            color="primary"
            startIcon={<DashboardRoundedIcon />}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/add"
            size="small"
            variant={onAdd ? 'contained' : 'outlined'}
            color="primary"
            startIcon={<AddCircleRoundedIcon />}
          >
            Add
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
