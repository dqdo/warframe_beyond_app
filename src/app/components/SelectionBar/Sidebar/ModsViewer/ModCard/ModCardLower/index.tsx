import Image from "next/image"

type ModCardLowerProps = {
    frameColor: string;
    expandAll?: boolean;
}

export function ModCardLower({ frameColor, expandAll }: ModCardLowerProps) {
    return (
        <>
            <Image src={`/images/mods/cards/${frameColor}FrameBottom.png`} alt="Bottom Frame" width={200} height={200} loading="lazy"
            className={`z-2 relative ${expandAll ? 'mt-[80%]' : '-mt-[14%]'}`} />
            <hr className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 w-[65%] border-t-[0.1rem] border-[#7DF9FF] z-3" />
        </>
    )
}