import ButtonSelections from "@/app/components/SelectionBar/ButtonSelections"
import Sidebar from "@/app/components/SelectionBar/Sidebar"

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
};

export function SelectionBarSidebar({ selectedButton }: SidebarGroupProps) {
    const sidebarTypes = ["mods", "archon", "arcanes"];
    return (
        <>
            {sidebarTypes.map((type) => (
                <Sidebar key={type} type={type} isOpen={selectedButton === type} />
            ))}
        </>
    );
}
