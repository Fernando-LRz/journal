import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { startNewNote } from '../../store/journal';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {

    const dispatch = useDispatch();
    const { isSaving, active } = useSelector( state => state.journal );

    const onClickNewNote = () => {
        dispatch( startNewNote() );
    };

    return (
        <JournalLayout>

            {
                (!!active)
                    ? <NoteView />
                    : <NothingSelectedView />
            }

            <IconButton
                size="large"
                disabled={ isSaving }
                onClick={ onClickNewNote }
                sx={{
                    color: "#FFF",
                    backgroundColor: "error.main",
                    ':hover': { backgroundColor: "error.main", opacity: 0.9 },
                    position: "fixed",
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }}/>
            </IconButton>
        </JournalLayout>
    );
};