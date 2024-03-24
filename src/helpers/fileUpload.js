export const fileUpload = async( file ) => {
    if(!file) throw new Error('No está el archivo a subir');

    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
    const productEnvironmentCloud = import.meta.env.VITE_PRODUCT_ENVIRONMENT_CLOUD;

    const cloudUrl = `https://api.cloudinary.com/v1_1/${ productEnvironmentCloud }/upload`;
    
    const formData = new FormData();
    formData.append('upload_preset', uploadPreset);
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( !resp.ok ) throw new Error('No se pudo subir la imágen');
        const data = await resp.json();

        return data.secure_url;
        
    } catch (error) {
        throw new Error( error.message );
    }
}