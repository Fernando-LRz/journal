import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';

import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

import { AuthLayout } from '../layout/AuthLayout';

const formData = {
    email: '',
    password: '',
    displayName: ''
};

const formValidations = {
    email: [ (value) => value.includes('@') , 'El correo electrónico es inválido'],
    password: [ (value) => value.length >= 6 , 'La contraseña debe tener más de 5 caracteres'],
    displayName: [ (value) => value.length >= 1 , 'El nombre es obligatorio'],
};

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const [ formSubmitted , setFormSubmitted ] = useState(false);

    const { status, errorMessage } = useSelector( state => state.auth );
    const isCheckingAuthentication = useMemo( () => status === 'checking', [ status ]);

    const { 
        formState, displayName, email, password, onInputChange, 
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm( formData, formValidations );

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if(!isFormValid) return;
        dispatch( startCreatingUserWithEmailPassword( formState ) );
    };

    return (
        <AuthLayout title="Registro">
            <form 
                onSubmit={ onSubmit }
                className="animate__animated animate__fadeIn animate__faster"
            >
                <Grid container>

                    <Grid item xs={ 12 } md={ 6 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Nombre completo" 
                            type="text" 
                            placeholder="Ingresa tu nombre completo"
                            fullWidth
                            name="displayName"
                            value={ displayName }
                            onChange={ onInputChange }
                            error={ !!displayNameValid && formSubmitted }
                            helperText={ displayNameValid }
                        />
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Correo electrónico" 
                            type="email" 
                            placeholder="Ingresa tu correo electrónico"
                            fullWidth
                            name="email"
                            value={ email }
                            onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted }
                            helperText={ emailValid }
                        />
                    </Grid>

                    <Grid item xs={ 12 } md={ 6 } sx={{ mt: 2 }}>
                        <TextField 
                            label="Contraseña" 
                            type="password" 
                            placeholder="Ingresa una contraseña"
                            fullWidth
                            name="password"
                            value={ password }
                            onChange={ onInputChange }
                            error={ !!passwordValid && formSubmitted }
                            helperText={ passwordValid }
                        />
                    </Grid>
                    
                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

                        <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none' }>
                            <Alert severity="error">{ errorMessage }</Alert>
                        </Grid>

                        <Grid item xs={ 12 }>
                            <Button 
                                variant="contained" 
                                fullWidth 
                                type="submit"
                                disabled={ isCheckingAuthentication }
                            >
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