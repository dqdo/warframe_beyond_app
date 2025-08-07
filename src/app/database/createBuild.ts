import axios from "axios";
import { ROUTES } from '@/app/APIRoutes'
import { ModWithTexture } from "../../../pages/api/fetchMods";
import { WarframeWithTexture } from "../../../pages/api/fetchWarframes";
import { WeaponWithTexture } from "../../../pages/api/fetchWeapons";

export interface BuildProps {
    orokinReactor: boolean;
    itemRank: number;
    buildType: string | null;
    assignedMods: Record<string, ModWithTexture | null>;
    slotPolarities: Record<string, string>;
    currentModRanks: Record<string, number>;
    selectedWarframe: WarframeWithTexture | null;
    selectedWeapon: WeaponWithTexture | null;
}

export async function createBuild(buildProps: BuildProps) {
    try {
        const response = await axios.post<{ buildID: string }>(ROUTES.CREATE_BUILD, buildProps);
        return response.data.buildID;
    } catch (error) {
        console.error('Error creating build:', error);
        throw new Error('Failed to create build');
    }
}
