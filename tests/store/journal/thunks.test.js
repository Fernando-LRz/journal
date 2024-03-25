import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from '../../../src/store/journal';
import { FirebaseDB } from '../../../src/firebase/config';

describe('Tests on journal thunks', () => {
    
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startNewNote should create a new blank note', async() => {
        const uid = 'test-uid';
        getState.mockReturnValue({ auth: { uid } });

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith( savingNewNote() );
        expect(dispatch).toHaveBeenCalledWith( addNewEmptyNote({
            id: expect.any(String),
            date: expect.any(Number),
            title: '',
            body: '',
            imageUrls: []
        }));
        expect(dispatch).toHaveBeenCalledWith( setActiveNote({
            id: expect.any(String),
            date: expect.any(Number),
            title: '',
            body: '',
            imageUrls: []
        }));

        const collectionRef = collection(FirebaseDB, `${ uid }/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach(doc => deletePromises.push( deleteDoc(doc.ref) ));

        await Promise.all(deletePromises);
    });

});