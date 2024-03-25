export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
};

export const authenticatedState = {
    status: 'checking',
    uid: '123abc',
    email: 'user@test.com',
    displayName: 'test name',
    photoURL: 'https://app.com/photo/123abc.jpg',
    errorMessage: null
};

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
};

export const testUser = {
    uid: '123abc',
    email: 'user@test.com',
    displayName: 'test name',
    photoURL: 'https://app.com/photo/123abc.jpg',
};