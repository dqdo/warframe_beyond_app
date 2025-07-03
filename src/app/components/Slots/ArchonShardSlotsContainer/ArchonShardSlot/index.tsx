import Image from "next/image";

export function ArchonShardSlot() {
    return (
        <>
            <div className="flex justify-center opacity-30">
                <Image src={"/images/archon_shards/hexagon_archon_slot.svg"} alt="Archon Shard Slot" width={120} height={120} />
            </div>
        </>
    )
}