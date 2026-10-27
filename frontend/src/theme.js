import { createTheme } from '@mui/material/styles';

export const INK = '#1B1B3A';
export const CREAM = '#FFF4D6';
export const ORANGE = '#FF9F1C';
export const TEAL = '#2EC4B6';
export const RED = '#E63946';

const EDGE = `2px solid ${INK}`;
const HARD = `4px 4px 0 ${INK}`;
const SMALL = `2px 2px 0 ${INK}`;
const HEAD_FONT = '"Baloo 2", "Nunito", system-ui, sans-serif';
const BODY_FONT = '"Nunito", system-ui, sans-serif';

const noShadows = Array(25).fill('none');

const theme = createTheme({
  breakpoints: { values: { xs: 0, sm: 700, md: 960, lg: 1200, xl: 1536 } },
  shape: { borderRadius: 24 },
  shadows: noShadows,
  palette: {
    mode: 'light',
    primary: { main: ORANGE, light: '#FFB84D', dark: '#E88A00', contrastText: INK },
    secondary: { main: TEAL, light: '#5DD6CB', dark: '#22A094', contrastText: INK },
    error: { main: RED, contrastText: '#FFFFFF' },
    warning: { main: '#FFD166', contrastText: INK },
    info: { main: TEAL, contrastText: INK },
    success: { main: TEAL, contrastText: INK },
    text: { primary: INK, secondary: '#4A4A6A' },
    background: { default: CREAM, paper: '#FFFFFF' },
    divider: 'rgba(27,27,58,0.25)',
  },
  typography: {
    fontFamily: BODY_FONT,
    h1: { fontFamily: HEAD_FONT, fontWeight: 800 },
    h2: { fontFamily: HEAD_FONT, fontWeight: 800 },
    h3: { fontFamily: HEAD_FONT, fontWeight: 800 },
    h4: { fontFamily: HEAD_FONT, fontWeight: 800 },
    h5: { fontFamily: HEAD_FONT, fontWeight: 800 },
    h6: { fontFamily: HEAD_FONT, fontWeight: 700 },
    button: { fontFamily: HEAD_FONT, fontWeight: 700, textTransform: 'none', fontSize: '1rem' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: CREAM, color: INK },
        '::selection': { backgroundColor: ORANGE, color: INK },
      },
    },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: {
          border: EDGE,
          borderRadius: 999,
          boxShadow: HARD,
          padding: '6px 20px',
          color: INK,
          transition: 'transform 0.12s ease, box-shadow 0.12s ease, background-color 0.12s ease',
          '&:hover': { transform: 'translate(2px, 2px)', boxShadow: SMALL },
          '&:active': { transform: 'translate(4px, 4px)', boxShadow: `0 0 0 ${INK}` },
          '&.Mui-disabled': { boxShadow: 'none', borderColor: 'rgba(27,27,58,0.35)' },
        },
        sizeSmall: { padding: '2px 14px', fontSize: '0.9rem', boxShadow: SMALL, '&:hover': { transform: 'translate(1px, 1px)', boxShadow: `1px 1px 0 ${INK}` } },
        containedPrimary: { backgroundColor: ORANGE, '&:hover': { backgroundColor: '#FFB84D' } },
        containedSecondary: { backgroundColor: TEAL, '&:hover': { backgroundColor: '#5DD6CB' } },
        containedError: { backgroundColor: RED, color: '#FFFFFF', '&:hover': { backgroundColor: '#F05A66' } },
        outlined: {
          border: EDGE,
          backgroundColor: '#FFFFFF',
          '&:hover': { border: EDGE, backgroundColor: '#FFF9EA' },
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: EDGE,
          borderRadius: 24,
          boxShadow: HARD,
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { border: EDGE, borderRadius: 24, boxShadow: HARD, overflow: 'visible' } },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'inherit', position: 'static' },
      styleOverrides: {
        root: {
          backgroundColor: CREAM,
          color: INK,
          border: 'none',
          borderRadius: 0,
          borderBottom: `3px solid ${INK}`,
          boxShadow: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: EDGE,
          borderRadius: 24,
          boxShadow: HARD,
          padding: 8,
          margin: 16,
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiBackdrop: { styleOverrides: { root: { backgroundColor: 'rgba(27,27,58,0.5)' } } },
    MuiDialogTitle: { styleOverrides: { root: { fontFamily: HEAD_FONT, fontWeight: 800, fontSize: '1.4rem' } } },
    MuiDialogActions: { styleOverrides: { root: { padding: '8px 24px 20px', gap: 8 } } },
    MuiSnackbar: {
      styleOverrides: {
        root: { padding: 8 },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          border: EDGE,
          borderRadius: 20,
          boxShadow: HARD,
          backgroundColor: INK,
          color: '#FFFFFF',
          fontWeight: 700,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          border: EDGE,
          borderRadius: 20,
          boxShadow: HARD,
          color: INK,
          fontWeight: 700,
          alignItems: 'center',
        },
        standardSuccess: { backgroundColor: TEAL, '& .MuiAlert-icon': { color: INK } },
        standardError: { backgroundColor: '#FF8A93', '& .MuiAlert-icon': { color: INK } },
        standardWarning: { backgroundColor: '#FFD166', '& .MuiAlert-icon': { color: INK } },
        standardInfo: { backgroundColor: '#FFFFFF', '& .MuiAlert-icon': { color: INK } },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          backgroundColor: '#FFFFFF',
          boxShadow: SMALL,
          '& .MuiOutlinedInput-notchedOutline': { border: EDGE },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: INK },
          '&.Mui-focused': { boxShadow: HARD },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: INK, borderWidth: 2 },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: RED },
        },
        input: { fontWeight: 600 },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: INK,
          fontWeight: 700,
          '&.Mui-focused': { color: INK },
          '&.Mui-error': { color: RED },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: { root: { fontWeight: 700, marginLeft: 8, '&.Mui-error': { color: RED } } },
    },
    MuiSelect: { styleOverrides: { icon: { color: INK } } },
    MuiMenu: { styleOverrides: { paper: { marginTop: 8 } } },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          '&.Mui-selected': { backgroundColor: CREAM },
          '&.Mui-selected:hover': { backgroundColor: '#FFE9AD' },
          '&:hover': { backgroundColor: '#FFF4D6' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          border: EDGE,
          fontFamily: HEAD_FONT,
          fontWeight: 700,
          color: INK,
          boxShadow: SMALL,
          transition: 'transform 0.12s ease, box-shadow 0.12s ease',
        },
        clickable: {
          '&:hover': { transform: 'translate(1px, 1px)', boxShadow: `1px 1px 0 ${INK}` },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: '1px solid rgba(27,27,58,0.2)', color: INK, fontWeight: 600 },
        head: {
          fontFamily: HEAD_FONT,
          fontWeight: 800,
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          borderBottom: EDGE,
        },
      },
    },
    MuiTableRow: { styleOverrides: { root: { '&:hover': { backgroundColor: '#FFFAEB' } } } },
    MuiCircularProgress: { defaultProps: { color: 'primary' } },
    MuiLinearProgress: {
      styleOverrides: { root: { border: EDGE, borderRadius: 999, height: 10, backgroundColor: '#FFFFFF' } },
    },
  },
});

export default theme;
