import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.savedMessage = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.savedMessage = '';
        },
        updateNote: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {

                if(note.id === action.payload.id) {
                    return action.payload;
                }

                return note;
            })

            state.savedMessage = 'La nota se actualizó correctamente';
        },
        setActiveNotePhotos: ( state, action ) => {
            state.isSaving = false;
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.notes = [];
            state.active = null;
            state.savedMessage = '';
        },
        deleteNoteById: ( state, action ) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        }
    }
});

// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote, 
    setActiveNote, 
    setNotes, 
    setSaving, 
    updateNote, 
    deleteNoteById, 
    savingNewNote, 
    setActiveNotePhotos,
    clearNotesLogout
} = journalSlice.actions;