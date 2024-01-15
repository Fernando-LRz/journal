import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Grid, Typography, TextField, Button, Link } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
    return (
        <AuthLayout title="Inicio de sesión">
            <form>
                <Grid container>

                    <Grid item xs={ 12 } md={ 6 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Correo electrónico" 
                            type="email" 
                            placeholder="Ingresa tu correo electrónico"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Contraseña" 
                            type="password" 
                            placeholder="Ingresa una contraseña"
                            fullWidth
                        />
                    </Grid>
                    
                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button variant="contained" fullWidth>
                                Iniciar sesión
                            </Button>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button variant="contained" fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Link component={ RouterLink } color="inherit" to="/auth/register">
                            Crear cuenta
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    );
};