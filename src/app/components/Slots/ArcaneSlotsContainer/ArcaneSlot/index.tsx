import Image from "next/image"
import { useState } from "react";

type ArcaneSlotProps = {
    id: string;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
    selectedSlot: string | null;
    setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
    selectedButton: string | null;
}

export function ArcaneSlot({ setSelectedButton, selectedSlot, setSelectedSlot, id, selectedButton }: ArcaneSlotProps) {
    const isSelected = selectedSlot === id;
    const [hover, setHover] = useState(false);

    const handleClick = () => {
        setSelectedButton("arcanes")
        setSelectedSlot(id)
    }

    return (
        <>
            <div className={`justify-center flex cursor-pointer ${selectedButton != null && isSelected ? 'opacity-100' : hover ? 'opacity-60' : 'opacity-30'}`}
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={handleClick}>
                <Image src={"/images/arcanes/arcane_slot.png"} alt="Arcane Slot" height={150} width={150} />
            </div>
        </>
    )
}