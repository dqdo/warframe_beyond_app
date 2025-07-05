import { ArchonShardSlot } from "@/app/components/Slots/ArchonShardSlotsContainer/ArchonShardSlot";

type ArchonShardSlotsContainerProps = {
    isSidebarOpen: boolean;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
}

export function ArchonShardSlotsContainer({ isSidebarOpen, setSelectedButton }: ArchonShardSlotsContainerProps) {
    return (
        <>
            <div className={`flex gap-2 justify-center mt-3  ${isSidebarOpen ? "-translate-x-0" : "translate-x-0"}`}>
                {Array.from({ length: 5 }, (_, i) => (
                    <ArchonShardSlot key={i} setSelectedButton={setSelectedButton} />
                ))}
            </div>
        </>
    )
}