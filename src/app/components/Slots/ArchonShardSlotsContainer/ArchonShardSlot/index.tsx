import Image from "next/image";
import { useState } from "react";

type ArchonShardSlotProps = {
    id: string;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
    selectedButton: string | null;
    selectedSlot: string | null;
    setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
}

export function ArchonShardSlot({ setSelectedButton, selectedSlot, setSelectedSlot, id, selectedButton }: ArchonShardSlotProps) {
    const isSelected = selectedSlot === id;
    const [hover, setHover] = useState(false);

    const handleClick = () => {
        setSelectedButton("archon")
        setSelectedSlot(id)
    }

    return (
        <>
            <div className={`flex justify-center cursor-pointer ${selectedButton !== null && isSelected ? "opacity-100" : hover ? "opacity-60" : "opacity-30"}`}
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={handleClick}>
                <Image src={"/images/archon_shards/hexagon_archon_slot.svg"} alt="Archon Shard Slot" width={120} height={120} />
            </div>
        </>
    )
}