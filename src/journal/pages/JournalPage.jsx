import { IconButton, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {
    return (
        <JournalLayout>
            {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam inventore provident ipsum? Illo harum expedita placeat, dignissimos iste, adipisci architecto corporis beatae quasi perspiciatis dolorum possimus nemo tempora fuga?</Typography>     */}
            <NothingSelectedView />
            {/* <NoteView /> */}

            <IconButton
                size="large"
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