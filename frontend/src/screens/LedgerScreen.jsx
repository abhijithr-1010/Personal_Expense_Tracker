import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import TotalBento from '../parts/TotalBento';
import ChipRail from '../parts/ChipRail';
import FinderBar from '../parts/FinderBar';
import RowBoard from '../parts/RowBoard';
import PhoneCards from '../parts/PhoneCards';
import ConfirmSticker from '../parts/ConfirmSticker';
import { deleteSpend, oopsText } from '../tools/ledgerApi';
import { sortSpends, sumSpends, topCategory } from '../tools/ledgerKit';

export default function LedgerScreen({ spends, loading, loadError, reload, say }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('newest');
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  // Total always covers every saved expense, ignoring search and filter.
  const total = useMemo(() => sumSpends(spends), [spends]);
  const topCat = useMemo(() => topCategory(spends), [spends]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const picked = spends.filter(
      (x) => (cat === 'All' || x.category === cat) && (!q || x.title.toLowerCase().includes(q))
    );
    return sortSpends(picked, sort);
  }, [spends, query, cat, sort]);

  async function confirmDelete() {
    if (!target) return;
    setBusy(true);
    try {
      await deleteSpend(target._id);
      await reload();
      say('Expense deleted');
      setTarget(null);
    } catch (err) {
      say(oopsText(err), 'error');
    } finally {
      setBusy(false);
    }
  }

  const goEdit = (row) => navigate(`/edit/${row._id}`);

  return (
    <>
      <TotalBento total={total} count={spends.length} topCat={topCat} />

      {loadError && (
        <Alert
          severity="error"
          sx={{ mb: 3, mr: '4px' }}
          action={
            <Button size="small" variant="outlined" onClick={reload}>
              Retry
            </Button>
          }
        >
          {loadError}
        </Alert>
      )}

      <ChipRail value={cat} onChange={setCat} />
      <FinderBar query={query} onQuery={setQuery} sort={sort} onSort={setSort} />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : rows.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            px: 2,
            mr: '4px',
            border: '2px dashed #1B1B3A',
            borderRadius: '24px',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Typography variant="h5">
            {spends.length === 0 ? 'No expenses yet' : 'Nothing matches'}
          </Typography>
          <Typography sx={{ fontWeight: 600, mt: 0.5, mb: 2 }}>
            {spends.length === 0
              ? 'Tap Add to log your first expense.'
              : 'Try another search or category.'}
          </Typography>
          {spends.length === 0 && (
            <Button variant="contained" color="primary" onClick={() => navigate('/add')}>
              Add expense
            </Button>
          )}
        </Box>
      ) : (
        <>
          <RowBoard rows={rows} onEdit={goEdit} onDelete={setTarget} />
          <PhoneCards rows={rows} onEdit={goEdit} onDelete={setTarget} />
        </>
      )}

      <ConfirmSticker
        target={target}
        busy={busy}
        onCancel={() => setTarget(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
