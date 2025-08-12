import axios from "axios";
import { ROUTES } from '@/app/APIRoutes'

export async function getBuild(buildID: string) {
    try {
        const response = await axios.get(ROUTES.GET_BUILD, {
            params: { buildID }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching build:', error);
        throw new Error('Failed to fetch build');
    }
}

export async function getBuildsByOwner(auth0Owner: string) {
    try {
        const response = await axios.get(ROUTES.GET_BUILD, {
            params: { auth0Owner }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching builds:', error);
        throw new Error('Failed to fetch builds');
    }
}