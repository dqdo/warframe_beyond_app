import ButtonSelections from "@/app/components/SelectionBar/ButtonSelections"
import Sidebar from "@/app/components/SelectionBar/Sidebar"
import { ModWithTexture } from "../../../../pages/api/fetchMods";
import { WarframeWithTexture } from "../../../../pages/api/fetchWarframes";
import { WeaponWithTexture } from "../../../../pages/api/fetchWeapons";

type SelectionBarButtonsProps = {
    selectedButton: string | null;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
};

export function SelectionBarButtons({ selectedButton, setSelectedButton }: SelectionBarButtonsProps) {
    return (
        <ButtonSelections selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
    );
}

type SidebarGroupProps = {
    selectedButton: string | null;
    selectedBuildType: string | null;
    setSelectedMod: (mod: ModWithTexture | null) => void;
    assignedMods: Record<string, ModWithTexture | null>;
    selectedMod: ModWithTexture | null;
    selectedWarframe: WarframeWithTexture | null;
    selectedWeapon: WeaponWithTexture | null;
};

export function SelectionBarSidebar({ selectedButton, selectedBuildType, setSelectedMod, assignedMods, selectedMod, selectedWarframe, selectedWeapon }: SidebarGroupProps) {
    const sidebarTypes = ["mods", "archon", "arcanes"];
    return (
        <>
            {sidebarTypes.map((type) => (
                <Sidebar key={type} type={type} isOpen={selectedButton === type} selectedBuildType={selectedBuildType} setSelectedMod={setSelectedMod} assignedMods={assignedMods} selectedMod={selectedMod} selectedWarframe={selectedWarframe} selectedWeapon={selectedWeapon} />
            ))}
        </>
    );
}
