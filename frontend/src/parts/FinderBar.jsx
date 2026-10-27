import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { SORT_CHOICES } from '../tools/ledgerKit';

export default function FinderBar({ query, onQuery, sort, onSort }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' },
        mb: 3,
        pr: '4px',
        pb: '4px',
      }}
    >
      <TextField
        label="Search title"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField select label="Sort by" value={sort} onChange={(e) => onSort(e.target.value)}>
        {SORT_CHOICES.map((c) => (
          <MenuItem key={c.value} value={c.value}>
            {c.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
