import Image from "next/image"
import { ModWithTexture } from "@/app/lib/api/fetchMods"

type ModCardLowerProps = {
    frameColor: string;
    expandAll?: boolean;
    cardColor: string;
    mod: ModWithTexture;
}

export function ModCardLower({ frameColor, expandAll, cardColor, mod }: ModCardLowerProps) {
    return (
        <div>
            <Image src={`/images/mods/cards/${frameColor}FrameBottom.png`} alt="Bottom Frame" width={200} height={200} loading="lazy"
                className={`z-2 relative ${expandAll ? 'mt-[82%]' : '-mt-[14%]'}`} />

            {expandAll && (
                <div className="absolute top-[38%] left-1/2 -translate-x-1/2 w-[145px] h-auto">
                    <Image src={`/images/mods/cards/${frameColor}LowerTab.png`} alt={`${frameColor} Lower Tab`} width={145} height={145} loading="lazy"
                        className="absolute" />
                    <div className="absolute w-full h-4.5 flex items-center justify-center font-semibold text-xs" style={{ color: cardColor }}>
                        {mod.compatName}
                    </div>
                </div>
            )}

            <hr className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 w-[65%] border-t-[0.1rem] border-[#7DF9FF] z-3" />
        </div>
    )
}