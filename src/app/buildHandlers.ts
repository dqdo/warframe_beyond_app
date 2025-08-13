import { ModWithTexture } from "../../pages/api/fetchMods";
import { WarframeWithTexture } from "../../pages/api/fetchWarframes";
import { WeaponWithTexture } from "../../pages/api/fetchWeapons";
import { createBuild } from "./database/createBuild";
import { deleteBuild } from "./database/deleteBuild";
import { getBuildsByOwner } from "./database/getBuild";
import { updateBuild } from "./database/updateBuild";

export type Build = {
    buildID: string;
    buildName: string;
    auth0Owner: string;
    email: string;
    orokinReactor: boolean;
    itemRank: number;
    buildType: string | null;
    assignedMods: Record<string, ModWithTexture | null>;
    slotPolarities: Record<string, string>;
    currentModRanks: Record<string, number>;
    selectedWarframe: WarframeWithTexture | null;
    selectedWeapon: WeaponWithTexture | null;
};

export type BuildHandlersProps = {
    session: {
        user?: {
            sub?: string;
            email?: string;
            name?: string;
            picture?: string;
        };
    } | null;
    searchParams: URLSearchParams | null;
    selectedWarframe: WarframeWithTexture | null;
    selectedWeapon: WeaponWithTexture | null;
    orokinReactor: boolean;
    itemRank: number;
    selectedBuildType: string | null;
    assignedMods: Record<string, ModWithTexture | null>;
    slotPolarities: Record<string, string>;
    currentModRanks: Record<string, number>;
    buildName: string;
    setToastMessage: (message: string) => void;
    setShowToast: (show: boolean) => void;
    setOwnerBuilds: (builds: Build[]) => void;
    setSelectedButton: (button: string | null) => void;
    setSelectedBuildType: (type: string | null) => void;
    setSelectedMod: (mod: ModWithTexture | null) => void;
    setAssignedMods: (mods: Record<string, ModWithTexture | null>) => void;
    setTotalDrain: (drain: number) => void;
    setSelectedWarframe: (warframe: WarframeWithTexture | null) => void;
    setSelectedWeapon: (weapon: WeaponWithTexture | null) => void;
    setCalculatedDrains: (drains: Record<string, number>) => void;
    setCurrentModRanks: (ranks: Record<string, number>) => void;
    setSlotPolarities: (polarities: Record<string, string>) => void;
    setItemRank: (rank: number) => void;
    setOrokinReactor: (reactor: boolean) => void;
    setModalOpen: (open: boolean) => void;
    setBuildName: (name: string) => void;
    setCurrentBuildOwner: (owner: string | null) => void;
};

export const buildHandlers = (props: BuildHandlersProps) => ({
    handleCreateBuild: () => {
        const buildName = props.buildName ||
            (props.selectedWarframe?.name
                ? `${props.selectedWarframe.name} Build`
                : props.selectedWeapon?.name
                    ? `${props.selectedWeapon.name} Build`
                    : "Unnamed Build");

        const buildData = {
            auth0Owner: props.session?.user?.sub,
            email: props.session?.user?.email,
            buildName: buildName,
            orokinReactor: props.orokinReactor,
            itemRank: props.itemRank,
            buildType: props.selectedBuildType,
            assignedMods: props.assignedMods,
            slotPolarities: props.slotPolarities,
            currentModRanks: props.currentModRanks,
            selectedWarframe: props.selectedWarframe,
            selectedWeapon: props.selectedWeapon
        };

        createBuild(buildData)
            .then(buildID => {
                const shareableUrl = `${window.location.origin}?build=${buildID}`;
                navigator.clipboard.writeText(shareableUrl)
                    .then(() => {
                        props.setToastMessage(`Link copied to clipboard: ${shareableUrl}`);
                        props.setShowToast(true);
                    })
                    .catch(() => {
                        console.log("Clipboard write failed");
                    });
                window.history.pushState({}, '', `?build=${buildID}`);
            })
            .catch(error => {
                console.error("Error creating build:", error);
            });
    },

    handleSaveBuild: async () => {
        const buildID = props.searchParams?.get("build");
        if (!buildID) return;

        const buildName = props.buildName ||
            (props.selectedWarframe?.name
                ? `${props.selectedWarframe.name} Build`
                : props.selectedWeapon?.name
                    ? `${props.selectedWeapon.name} Build`
                    : "Unnamed Build");

        const buildData = {
            buildName: buildName,
            auth0Owner: props.session?.user?.sub,
            email: props.session?.user?.email,
            orokinReactor: props.orokinReactor,
            itemRank: props.itemRank,
            buildType: props.selectedBuildType,
            assignedMods: props.assignedMods,
            slotPolarities: props.slotPolarities,
            currentModRanks: props.currentModRanks,
            selectedWarframe: props.selectedWarframe,
            selectedWeapon: props.selectedWeapon
        };

        try {
            await updateBuild(buildID, buildData);
            props.setToastMessage("Build saved successfully");
            props.setShowToast(true);
        } catch (error) {
            console.error("Error saving build:", error);
            props.setToastMessage("Failed to save build");
            props.setShowToast(true);
        }
    },

    handleDeleteBuild: async (buildID: string) => {
        if (!window.confirm('Are you sure you want to delete this build?')) return;

        try {
            await deleteBuild(buildID);
            props.setToastMessage('Build deleted successfully');
            props.setShowToast(true);

            if (props.searchParams?.get('build') === buildID) {
                props.setSelectedButton(null);
                props.setSelectedBuildType(null);
                props.setSelectedMod(null);
                props.setAssignedMods({});
                props.setTotalDrain(0);
                props.setSelectedWarframe(null);
                props.setSelectedWeapon(null);
                props.setCalculatedDrains({});
                props.setCurrentModRanks({});
                props.setSlotPolarities({});
                props.setItemRank(30);
                props.setOrokinReactor(true);
                props.setBuildName('')
                props.setCurrentBuildOwner(null);
                window.history.pushState({}, '', window.location.origin);
            }

            if (props.session?.user?.sub) {
                const updatedBuilds = await getBuildsByOwner(props.session.user.sub);
                props.setOwnerBuilds(updatedBuilds);
            }
        } catch (error) {
            console.error('Delete build failed:', error);
            props.setToastMessage(`Failed to delete build: ${error instanceof Error ? error.message : 'Unknown error'}`);
            props.setShowToast(true);
        }
    },

    handleNewBuild: () => {
        props.setSelectedButton(null);
        props.setSelectedBuildType(null);
        props.setSelectedMod(null);
        props.setAssignedMods({});
        props.setTotalDrain(0);
        props.setSelectedWarframe(null);
        props.setSelectedWeapon(null);
        props.setCalculatedDrains({});
        props.setCurrentModRanks({});
        props.setSlotPolarities({});
        props.setItemRank(30);
        props.setOrokinReactor(true);
        props.setBuildName('');
        props.setCurrentBuildOwner(null);
        window.history.pushState({}, '', window.location.origin);
    },

    handleShowBuilds: () => {
        if (!props.session?.user?.sub) return;

        getBuildsByOwner(props.session.user.sub)
            .then(data => {
                props.setOwnerBuilds(data);
            })
            .catch(err => {
                console.error(err);
            });

        props.setModalOpen(true);
    }
});