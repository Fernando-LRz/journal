import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: '#2d3870'
        },
        secondary: {
            main: '#fff'
        },
        error: {
            main: red.A400
        },
    }
});