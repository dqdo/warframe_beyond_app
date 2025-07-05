import Image from "next/image"

type ArcaneSlotProps = {
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
}

export function ArcaneSlot({ setSelectedButton }: ArcaneSlotProps) {

    const handleClick = () => {
        setSelectedButton("arcanes")
    }

    return (
        <>
            <div className="opacity-40 justify-center flex cursor-pointer" onClick={handleClick}>
                <Image src={"/images/arcanes/arcane_slot.png"} alt="Arcane Slot" height={150} width={150} />
            </div>
        </>
    )
}