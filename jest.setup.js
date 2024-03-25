// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch';

require('dotenv').config({
    path: '.env.testing'
});

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })
}));