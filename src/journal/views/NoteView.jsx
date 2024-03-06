import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
// import Swal from 'sweetalert2/dist/sweetalert2'
// import 'sweetalert2/dist/sweetalert2.css';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';

import { ImageGallery } from '../components';
import { setActiveNote, startSaveNote } from '../../store/journal';

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, savedMessage, isSaving } = useSelector( state => state.journal );
    const { title, body, date, onInputChange, formState } = useForm( note );

    const formattedDate = useMemo(() => {
        return new Date(date).toUTCString();
    }, [ date ]);

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [ formState ]);

    useEffect(() => {
        if( savedMessage.length > 0 ) Swal.fire('Nota actualizada', savedMessage, 'success')
    }, [ savedMessage ]);

    return (
        <Grid 
            container
            className="animate__animated animate__fadeIn animate__faster"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={ 39 } fontWeight="light">
                    { formattedDate }
                </Typography>
            </Grid>
            <Grid item>
                <Button 
                    color="primary" 
                    sx={{ padding: 2 }} 
                    onClick={ onSaveNote }
                    disabled={ isSaving }
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField 
                    type="text"
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                    variant="filled"
                    fullWidth
                    multiline
                    label="Descripción"
                    placeholder="¿Qúe sucedió el día de hoy?"
                    sx={{ border: 'none', mb: 1 }}
                    minRows={ 3 }
                />
            </Grid>

            <ImageGallery />
        </Grid>
    );
};