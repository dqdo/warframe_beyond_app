import { ModSlot } from "@/app/components/Slots/ModSlotsContainer/ModSlot"

type ModSlotsContainerProps = {
    isSidebarOpen: boolean;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
}

export function ModSlotsContainer({ isSidebarOpen, setSelectedButton }: ModSlotsContainerProps) {
    return (
        <div className={`${isSidebarOpen ? "-translate-x-0" : "translate-x-0"}`}>
            <div className="flex justify-center gap-2">
                <ModSlot type="AURA" setSelectedButton={setSelectedButton} />
                <ModSlot type="UTLITY" setSelectedButton={setSelectedButton} />
            </div>
            <div className={`grid ${isSidebarOpen ? "grid-cols-3" : "grid-cols-4"} gap-2`}>
                {Array.from({ length: 8 }, (_, i) => (
                    <ModSlot key={i} type="Mod" setSelectedButton={setSelectedButton} />
                ))}
            </div>
        </div>
    )
}