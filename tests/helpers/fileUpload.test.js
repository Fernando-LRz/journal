import { getCloudinary } from '../../src/cloudinary/config';
import { fileUpload } from '../../src/helpers/fileUpload';

const cloudinary = getCloudinary();

describe('fileUpload tests', () => {

    test('should upload the file(s) correctly to cloudinary', async () => {
        const imageURL = 'https://fotoarte.com.uy/wp-content/uploads/2019/03/Landscape-fotoarte.jpg';

        const resp = await fetch(imageURL);
        const blob = await resp.blob();
        const file = new File([ blob ], 'image.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');

        await cloudinary.api.delete_resources([ 'journal-react/' + imageId ], {
            resource_type: 'image'
        });
    });

    test('should return null', async () => {
        const file = new File([], 'image.jpg');

        const url = await fileUpload(file);
        expect(url).toBe(null);
    });

});