import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { INK, ORANGE, TEAL } from '../theme';
import { money } from '../tools/ledgerKit';

const tileBase = {
  border: `2px solid ${INK}`,
  borderRadius: '24px',
  boxShadow: `4px 4px 0 ${INK}`,
  p: { xs: 2, sm: 2.5 },
  color: INK,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: { xs: 96, sm: 120 },
};

function Tile({ bg, label, value, big }) {
  return (
    <Box sx={{ ...tileBase, backgroundColor: bg }}>
      <Typography
        component="div"
        sx={{
          fontFamily: '"Baloo 2", sans-serif',
          fontWeight: 800,
          lineHeight: 1.05,
          fontSize: big ? { xs: '2.2rem', sm: '3rem' } : { xs: '1.7rem', sm: '2rem' },
          wordBreak: 'break-word',
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ fontWeight: 700, opacity: 0.85 }}>{label}</Typography>
    </Box>
  );
}

export default function TotalBento({ total, count, topCat }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2.5,
        pr: '4px',
        pb: '4px',
        gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr 1fr' },
        mb: 3,
      }}
    >
      <Tile bg={ORANGE} big label="Total Amount Spent" value={money(total)} />
      <Tile bg={TEAL} label={count === 1 ? 'Expense saved' : 'Expenses saved'} value={count} />
      <Tile bg="#FFFFFF" label="Top category" value={topCat || '-'} />
    </Box>
  );
}
