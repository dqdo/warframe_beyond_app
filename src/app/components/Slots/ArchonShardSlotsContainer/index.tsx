import { ArchonShardSlot } from "@/app/components/Slots/ArchonShardSlotsContainer/ArchonShardSlot";

type ArchonShardSlotsContainerProps = {
    isSidebarOpen: boolean;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
    selectedSlot: string | null;
    setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
    selectedButton: string | null;
}

export function ArchonShardSlotsContainer({ isSidebarOpen, setSelectedButton, selectedSlot, setSelectedSlot, selectedButton }: ArchonShardSlotsContainerProps) {
    return (
        <>
            <div className={`flex gap-2 justify-center mt-3  ${isSidebarOpen ? "-translate-x-0" : "translate-x-0"}`}>
                {Array.from({ length: 5 }, (_, i) => (
                    <ArchonShardSlot id={`archon${i}`} key={i} setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} />
                ))}
            </div>
        </>
    )
}