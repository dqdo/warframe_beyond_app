import { ModSlotsContainer } from "@/app/components/Slots/ModSlotsContainer"
import { ArcaneSlotsContainer } from "@/app/components/Slots/ArcaneSlotsContainer"
import { ArchonShardSlotsContainer } from "@/app/components/Slots/ArchonShardSlotsContainer"

type SlotsProps = {
    isSidebarOpen: boolean;
}

export function Slots({ isSidebarOpen }: SlotsProps) {
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <ModSlotsContainer isSidebarOpen={isSidebarOpen} />
                <ArcaneSlotsContainer isSidebarOpen={isSidebarOpen} />
                <ArchonShardSlotsContainer isSidebarOpen={isSidebarOpen} />
            </div>
        </>
    )
}