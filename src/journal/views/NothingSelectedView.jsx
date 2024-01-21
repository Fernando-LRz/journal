import { Grid, Typography } from '@mui/material';
import { StarOutline } from '@mui/icons-material';

export const NothingSelectedView = () => {
    return (
        <Grid
            container
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "calc(100vh - 110px)", backgroundColor: "primary.main", borderRadius: 3 }}
        >
            <Grid item xs={ 12 }>
                <StarOutline sx={{ fontSize: 100, color: '#FFF' }} />
            </Grid>
            <Grid item xs={ 12 }>
                <Typography color="#FFF" variant="h5">
                    Selecciona o crea una entrada
                </Typography>
            </Grid>
        </Grid>
    );
};