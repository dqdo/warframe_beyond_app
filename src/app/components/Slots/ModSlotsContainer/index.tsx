import { ModSlot } from "@/app/components/Slots/ModSlotsContainer/ModSlot"

type ModSlotsContainerProps = {
    isSidebarOpen: boolean;
}

export function ModSlotsContainer({ isSidebarOpen }: ModSlotsContainerProps) {
    return (
        <div>
            <div className={`flex justify-center gap-2 ${isSidebarOpen ? "-translate-x-10" : "translate-x-0"}`}>
                <ModSlot />
                <ModSlot />
            </div>
            <div className={`grid ${isSidebarOpen ? "-translate-x-10 grid-cols-2" : "translate-x-0 grid-cols-4"} gap-2`}>
                {Array.from({ length: 8 }, (_, i) => (
                    <ModSlot key={i} />
                ))}
            </div>
        </div>
    )
}