import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { chipSx, money, niceDay } from '../tools/ledgerKit';

// Card list for phones. Shown below 700px only.
export default function PhoneCards({ rows, onEdit, onDelete }) {
  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        flexDirection: 'column',
        gap: 2.5,
        pr: '4px',
        pb: '4px',
      }}
    >
      {rows.map((row) => (
        <Card key={row._id} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.5, alignItems: 'flex-start' }}>
            <Typography variant="h6" sx={{ lineHeight: 1.2, wordBreak: 'break-word' }}>
              {row.title}
            </Typography>
            <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
              {money(row.amount)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1, mb: 2 }}>
            <Chip size="small" label={row.category} sx={chipSx(row.category)} />
            <Typography sx={{ fontWeight: 700 }}>{niceDay(row.date)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<EditRoundedIcon />}
              onClick={() => onEdit(row)}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              startIcon={<DeleteRoundedIcon />}
              onClick={() => onDelete(row)}
            >
              Delete
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
