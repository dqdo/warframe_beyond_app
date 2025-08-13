import axios from "axios";
import { ROUTES } from '@/app/APIRoutes';

export async function deleteBuild(buildID: string) {
    try {
        const response = await axios.delete(ROUTES.DELETE_BUILD, {
            data: { buildID }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting build:', error);
        throw new Error('Failed to delete build');
    }
}