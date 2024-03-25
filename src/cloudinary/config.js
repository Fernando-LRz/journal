import { v2 as cloudinary } from 'cloudinary';
import { getEnvironments } from '../helpers/getEnvironments';

const {
    VITE_CLOUD_NAME,
    VITE_CLOUD_API_KEY,
    VITE_CLOUD_API_SECRET
} = getEnvironments();

cloudinary.config({ 
    cloud_name: VITE_CLOUD_NAME, 
    api_key: VITE_CLOUD_API_KEY, 
    api_secret: VITE_CLOUD_API_SECRET
});

export const getCloudinary = () => {
    return cloudinary;
}