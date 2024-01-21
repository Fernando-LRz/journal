import { Typography } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView } from '../views';

export const JournalPage = () => {
    return (
        <JournalLayout>
            {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quisquam inventore provident ipsum? Illo harum expedita placeat, dignissimos iste, adipisci architecto corporis beatae quasi perspiciatis dolorum possimus nemo tempora fuga?</Typography>     */}
        
            <NothingSelectedView />
        </JournalLayout>
    );
};