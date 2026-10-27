import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { money } from '../tools/ledgerKit';

export default function ConfirmSticker({ target, busy, onCancel, onConfirm }) {
  return (
    <Dialog open={Boolean(target)} onClose={busy ? undefined : onCancel} fullWidth maxWidth="xs">
      <DialogTitle>Delete this expense?</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'text.primary', fontWeight: 600 }}>
          {target ? `"${target.title}" for ${money(target.amount)} will be removed for good.` : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm} disabled={busy}>
          {busy ? 'Deleting...' : 'Yes, delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
