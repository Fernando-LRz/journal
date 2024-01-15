import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
    return (
        <AuthLayout title="Registro">
            <form>
                <Grid container>

                    <Grid item xs={ 12 } md={ 6 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Nombre completo" 
                            type="text" 
                            placeholder="Ingresa tu nombre completo"
                            fullWidth
                        />
                    </Grid>

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
                        <Grid item xs={ 12 }>
                            <Button variant="contained" fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        
                        <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
                        <Link component={ RouterLink } color="inherit" to="/auth/login">
                            Inicia sesión
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    );
};