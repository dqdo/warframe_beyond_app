import Image from "next/image";

type ArchonShardSlotProps = {
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
}

export function ArchonShardSlot({ setSelectedButton }: ArchonShardSlotProps) {
    const handleClick = () => {
        setSelectedButton("archon")
    }

    return (
        <>
            <div className="flex justify-center opacity-30 cursor-pointer" onClick={handleClick}>
                <Image src={"/images/archon_shards/hexagon_archon_slot.svg"} alt="Archon Shard Slot" width={120} height={120} />
            </div>
        </>
    )
}