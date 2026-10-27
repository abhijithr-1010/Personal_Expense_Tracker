import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {
  createSpend,
  fetchOneSpend,
  oopsText,
  updateSpend,
} from '../tools/ledgerApi';
import { CATEGORIES, dayOnly, todayLocal } from '../tools/ledgerKit';

const blank = () => ({ title: '', amount: '', category: '', date: todayLocal() });

function checkForm(v) {
  const e = {};
  if (!v.title.trim()) e.title = 'Title is required';
  else if (v.title.trim().length > 100) e.title = 'Title must be 100 characters or less';

  if (v.amount === '' || v.amount === null) e.amount = 'Amount is required';
  else if (Number.isNaN(Number(v.amount))) e.amount = 'Amount must be a number';
  else if (Number(v.amount) <= 0) e.amount = 'Amount must be greater than 0';

  if (!CATEGORIES.includes(v.category)) e.category = 'Pick a category';
  if (!v.date) e.date = 'Date is required';
  return e;
}

export default function JotScreen({ reload, say }) {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();

  const [values, setValues] = useState(blank());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);

  // Fill the form: blank for add, loaded record for edit.
  useEffect(() => {
    let alive = true;
    setErrors({});
    if (!editing) {
      setValues(blank());
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    fetchOneSpend(id)
      .then((row) => {
        if (!alive) return;
        setValues({
          title: row.title,
          amount: String(row.amount),
          category: row.category,
          date: dayOnly(row.date),
        });
      })
      .catch((err) => {
        if (!alive) return;
        say(oopsText(err), 'error');
        navigate('/', { replace: true });
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id, editing, navigate, say]);

  const setField = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = checkForm(values);
    if (Object.keys(found).length) {
      setErrors(found);
      say('Please fix the highlighted fields', 'error');
      return;
    }
    const body = {
      title: values.title.trim(),
      amount: Number(values.amount),
      category: values.category,
      date: values.date,
    };
    setSaving(true);
    try {
      if (editing) await updateSpend(id, body);
      else await createSpend(body);
      await reload();
      say(editing ? 'Expense updated' : 'Expense added');
      navigate('/');
    } catch (err) {
      const serverErrors = err?.response?.data?.errors;
      if (serverErrors) setErrors(serverErrors);
      say(oopsText(err), 'error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto', pr: '4px', pb: '4px' }}>
      <Typography variant="h4" sx={{ mb: 2.5 }}>
        {editing ? 'Edit expense' : 'Add expense'}
      </Typography>

      <Card sx={{ p: { xs: 2.5, sm: 3.5 } }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: 'grid', gap: 2.5 }}>
            <TextField
              label="Title"
              value={values.title}
              onChange={setField('title')}
              error={Boolean(errors.title)}
              helperText={errors.title}
              inputProps={{ maxLength: 120 }}
              fullWidth
            />
            <TextField
              label="Amount (₹)"
              type="number"
              value={values.amount}
              onChange={setField('amount')}
              error={Boolean(errors.amount)}
              helperText={errors.amount}
              inputProps={{ min: 0.01, step: '0.01' }}
              fullWidth
            />
            <TextField
              select
              label="Category"
              value={values.category}
              onChange={setField('category')}
              error={Boolean(errors.category)}
              helperText={errors.category}
              fullWidth
            >
              {CATEGORIES.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Date"
              type="date"
              value={values.date}
              onChange={setField('date')}
              error={Boolean(errors.date)}
              helperText={errors.date}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', pr: '4px', pb: '4px' }}>
              <Button type="submit" variant="contained" color="primary" disabled={saving}>
                {saving ? 'Saving...' : editing ? 'Save changes' : 'Add expense'}
              </Button>
              <Button variant="outlined" onClick={() => navigate('/')} disabled={saving}>
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  );
}
