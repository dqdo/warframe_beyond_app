import { ModSlot } from "@/app/components/Slots/ModSlotsContainer/ModSlot"

type ModSlotsContainerProps = {
    isSidebarOpen: boolean;
}

export function ModSlotsContainer({ isSidebarOpen }: ModSlotsContainerProps) {
    return (
        <div className={`${isSidebarOpen ? "-translate-x-0" : "translate-x-0"}`}>
            <div className="flex justify-center gap-2">
                <ModSlot type="AURA" />
                <ModSlot type="UTLITY" />
            </div>
            <div className={`grid ${isSidebarOpen ? "grid-cols-3" : "grid-cols-4"} gap-2`}>
                {Array.from({ length: 8 }, (_, i) => (
                    <ModSlot key={i} type="Mod" />
                ))}
            </div>
        </div>
    )
}