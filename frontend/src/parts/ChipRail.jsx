import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { CATEGORIES, CATEGORY_COLORS } from '../tools/ledgerKit';
import { ORANGE } from '../theme';

export default function ChipRail({ value, onChange }) {
  const names = ['All', ...CATEGORIES];
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, mb: 2.5, pr: '4px', pb: '4px' }}>
      {names.map((name) => {
        const active = value === name;
        const color = name === 'All' ? ORANGE : CATEGORY_COLORS[name];
        return (
          <Chip
            key={name}
            label={name}
            clickable
            onClick={() => onChange(name)}
            sx={{
              backgroundColor: active ? color : '#FFFFFF',
              '&:hover': { backgroundColor: active ? color : '#FFFAEB' },
              opacity: active ? 1 : 0.9,
            }}
          />
        );
      })}
    </Box>
  );
}
