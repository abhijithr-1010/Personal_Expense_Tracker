import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TopRail from './parts/TopRail';
import LedgerScreen from './screens/LedgerScreen';
import JotScreen from './screens/JotScreen';
import { fetchAllSpends, oopsText } from './tools/ledgerApi';

export default function MangoApp() {
  const [spends, setSpends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [toast, setToast] = useState({ open: false, msg: '', kind: 'success' });

  const say = useCallback((msg, kind = 'success') => {
    setToast({ open: true, msg, kind });
  }, []);

  const reload = useCallback(async () => {
    try {
      setLoadError('');
      const rows = await fetchAllSpends();
      setSpends(rows);
    } catch (err) {
      setLoadError(oopsText(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <TopRail />
      <Box
        component="main"
        sx={{ maxWidth: 1120, mx: 'auto', px: { xs: 2, sm: 3 }, pt: 3, pb: 8 }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <LedgerScreen
                spends={spends}
                loading={loading}
                loadError={loadError}
                reload={reload}
                say={say}
              />
            }
          />
          <Route path="/add" element={<JotScreen reload={reload} say={say} />} />
          <Route path="/edit/:id" element={<JotScreen reload={reload} say={say} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={(e, reason) => {
          if (reason === 'clickaway') return;
          setToast((t) => ({ ...t, open: false }));
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={toast.kind}
          variant="standard"
          onClose={() => setToast((t) => ({ ...t, open: false }))}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
