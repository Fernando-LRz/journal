import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link } from '@mui/material';
import { Google } from '@mui/icons-material';

import { checkingAuthentication, startGoogleSignIn } from '../../store/auth';
import { useForm } from '../../hooks';

import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {

    const dispatch = useDispatch();
    const { status } = useSelector( state => state.auth );

    const { email, password, onInputChange } = useForm({
        email: 'fer@test.com',
        password: '123abc'
    });

    const isAuthenticating = useMemo( () => status === 'checking', [ status ] );

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch( checkingAuthentication() );
    };

    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    };

    return (
        <AuthLayout title="Inicio de sesión">
            <form onSubmit={ onSubmit }>
                <Grid container>

                    <Grid item xs={ 12 } md={ 6 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Correo electrónico" 
                            type="email" 
                            name="email"
                            placeholder="Ingresa tu correo electrónico"
                            fullWidth
                            value={ email }
                            onChange={ onInputChange }
                        />
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Contraseña" 
                            type="password" 
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            fullWidth
                            value={ password }
                            onChange={ onInputChange }
                        />
                    </Grid>
                    
                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                fullWidth
                                disabled={ isAuthenticating }
                            >
                                Iniciar sesión
                            </Button>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                variant="contained" 
                                fullWidth
                                onClick={ onGoogleSignIn }
                                disabled={ isAuthenticating }
                            >
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