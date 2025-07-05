import { ModSlotsContainer } from "@/app/components/Slots/ModSlotsContainer"
import { ArcaneSlotsContainer } from "@/app/components/Slots/ArcaneSlotsContainer"
import { ArchonShardSlotsContainer } from "@/app/components/Slots/ArchonShardSlotsContainer"

type SlotsProps = {
    isSidebarOpen: boolean;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
}

export function Slots({ isSidebarOpen, setSelectedButton }: SlotsProps) {

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="z-10">
                    <ModSlotsContainer isSidebarOpen={isSidebarOpen} setSelectedButton={setSelectedButton} />
                </div>
                <ArcaneSlotsContainer isSidebarOpen={isSidebarOpen} setSelectedButton={setSelectedButton} />
                <ArchonShardSlotsContainer isSidebarOpen={isSidebarOpen} setSelectedButton={setSelectedButton} />
            </div>
        </>
    )
}