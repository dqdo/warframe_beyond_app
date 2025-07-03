import Image from "next/image"

export function ArcaneSlot() {
    return (
        <>
            <div className="opacity-40 justify-center flex">
                <Image src={"/images/arcanes/arcane_slot.png"} alt="Arcane Slot" height={150} width={150} />
            </div>
        </>
    )
}