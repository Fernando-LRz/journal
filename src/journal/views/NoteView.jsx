import { useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';

import { ImageGallery } from '../components';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';

export const NoteView = () => {

    const dispatch = useDispatch();
    const fileInputRef = useRef();

    const { active: note, savedMessage, isSaving } = useSelector( state => state.journal );
    const { title, body, date, onInputChange, formState } = useForm( note );

    const formattedDate = useMemo(() => {
        return new Date(date).toUTCString();
    }, [ date ]);

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        if( target.files.length === 0 ) return;
        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [ formState ]);

    useEffect(() => {
        if( savedMessage.length > 0 ) 
            Swal.fire('Nota actualizada', savedMessage, 'success');
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
                <input 
                    type="file" 
                    multiple
                    ref={ fileInputRef }
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />

                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

                <Button 
                    color="primary" 
                    sx={{ padding: 1 }} 
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

            <Grid container justifyContent="end">
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Eliminar
                </Button>
            </Grid>

            <ImageGallery images={ note.imageUrls } />
        </Grid>
    );
};