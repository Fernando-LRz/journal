import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';

import { startGoogleSignIn, startLoginWithEmail } from '../../store/auth';
import { useForm } from '../../hooks';

import { AuthLayout } from '../layout/AuthLayout';

const formData = {
    email: '',
    password: '',
};

const formValidations = {
    email: [ (value) => value.includes('@') , 'El correo electrónico es inválido' ],
    password: [ (value) => value.length > 0 , 'La contraseña es obligatoria' ],
};

export const LoginPage = () => {

    const dispatch = useDispatch();
    const [ formSubmitted , setFormSubmitted ] = useState(false);

    const { status, errorMessage } = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo(() => status === 'checking', [ status ]);

    const { 
        formState, email, password, onInputChange, isFormValid, emailValid, passwordValid
    } = useForm( formData, formValidations );

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if(!isFormValid) return;
        dispatch( startLoginWithEmail( formState ) );
    };

    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    };

    return (
        <AuthLayout title="Inicio de sesión">
            <form 
                onSubmit={ onSubmit }
                className="animate__animated animate__fadeIn animate__faster"
            >
                <Grid container>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Correo electrónico" 
                            type="email" 
                            name="email"
                            placeholder="Ingresa tu correo electrónico"
                            fullWidth
                            value={ email }
                            onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted }
                            helperText={ emailValid }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Contraseña" 
                            type="password" 
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            fullWidth
                            value={ password }
                            onChange={ onInputChange }
                            error={ !!passwordValid && formSubmitted }
                            helperText={ passwordValid }
                        />
                    </Grid>

                    <Grid 
                        container
                        display={ !!errorMessage ? '' : 'none' }
                        sx={{ mt: 2 }}
                    >
                        <Grid item xs={ 12 }>
                            <Alert severity="error">{ errorMessage }</Alert>
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                fullWidth
                                disabled={ isCheckingAuthentication }
                            >
                                Iniciar sesión
                            </Button>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button 
                                variant="contained" 
                                fullWidth
                                onClick={ onGoogleSignIn }
                                disabled={ isCheckingAuthentication }
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