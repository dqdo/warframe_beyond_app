import ButtonSelections from "@/app/components/SelectionBar/ButtonSelections"
import Sidebar from "@/app/components/SelectionBar/Sidebar"
import { ModWithTexture } from "@/app/lib/api/fetchMods";

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
};

export function SelectionBarSidebar({ selectedButton, selectedBuildType, setSelectedMod, assignedMods, selectedMod }: SidebarGroupProps) {
    const sidebarTypes = ["mods", "archon", "arcanes"];
    return (
        <>
            {sidebarTypes.map((type) => (
                <Sidebar key={type} type={type} isOpen={selectedButton === type} selectedBuildType={selectedBuildType} setSelectedMod={setSelectedMod} assignedMods={assignedMods} selectedMod={selectedMod} />
            ))}
        </>
    );
}
