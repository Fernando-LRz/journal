import { getEnvironments } from './getEnvironments';

const {
    VITE_PRODUCT_ENVIRONMENT_CLOUD,
    VITE_UPLOAD_PRESET,
} = getEnvironments();

export const fileUpload = async( file ) => {
    if(!file) return null;

    const cloudUrl = `https://api.cloudinary.com/v1_1/${ VITE_PRODUCT_ENVIRONMENT_CLOUD }/upload`;
    
    const formData = new FormData();
    formData.append('upload_preset', VITE_UPLOAD_PRESET);
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( !resp.ok ) throw new Error('Error al subir la imágen');
        const data = await resp.json();

        return data.secure_url;
        
    } catch (error) {
        // throw new Error( error.message );
        return null;
    }
}