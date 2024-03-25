import { Grid, Typography } from '@mui/material';
import { NoteAdd } from '@mui/icons-material';

export const NothingSelectedView = () => {
    return (
        <Grid
            container
            className="animate__animated animate__fadeIn animate__faster"
            spacing={ 0 }
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "calc(100vh - 110px)", backgroundColor: "primary.main", borderRadius: 3 }}
        >
            <Grid item xs={ 12 }>
                <NoteAdd sx={{ fontSize: 80, color: '#FFF' }} />
            </Grid>
            <Grid item xs={ 12 }>
                <Typography color="#FFF" variant="h5">
                    Selecciona o crea una nota
                </Typography>
            </Grid>
        </Grid>
    );
};