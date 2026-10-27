import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { chipSx, money, niceDay } from '../tools/ledgerKit';

// Desktop table. Hidden below 700px.
export default function RowBoard({ rows, onEdit, onDelete }) {
  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' }, pr: '4px', pb: '4px' }}>
      <Paper sx={{ overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell sx={{ fontWeight: 800 }}>{row.title}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800 }}>
                  {money(row.amount)}
                </TableCell>
                <TableCell>
                  <Chip size="small" label={row.category} sx={chipSx(row.category)} />
                </TableCell>
                <TableCell>{niceDay(row.date)}</TableCell>
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<EditRoundedIcon />}
                    onClick={() => onEdit(row)}
                    sx={{ mr: 1.25 }}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
