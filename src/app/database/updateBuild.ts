import axios from "axios";
import { ROUTES } from '@/app/APIRoutes'
import { BuildProps } from "./createBuild";

export async function updateBuild(buildID: string, buildProps: BuildProps) {
    try {
        const response = await axios.put(ROUTES.UPDATE_BUILD, {
            buildID,
            ...buildProps
        });
        return response.data;
    } catch (error) {
        console.error('Error updating build:', error);
        throw new Error('Failed to update build');
    }
}