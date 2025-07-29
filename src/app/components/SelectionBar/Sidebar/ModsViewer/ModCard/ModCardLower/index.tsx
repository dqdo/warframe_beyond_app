import Image from "next/image"
import { ModWithTexture } from "@/app/lib/api/fetchMods"

type ModCardLowerProps = {
    frameColor: string;
    expandAll?: boolean;
    cardColor: string;
    mod: ModWithTexture;
    hover?: boolean;
    currentRank: number;
}

export function ModCardLower({ frameColor, expandAll, cardColor, mod, hover, currentRank }: ModCardLowerProps) {
    return (
        <div className="pointer-events-none relative">
            <Image src={`/images/mods/cards/${frameColor}FrameBottom.png`} alt="Bottom Frame" width={200} height={200} loading="lazy"
                className={`z-2 relative transition-all duration-200 ease-in-out ${(expandAll || hover) ? 'mt-[82%]' : '-mt-[14%]'}`} />

            {(expandAll || hover) && (
                <div className="absolute top-[38%] left-1/2 -translate-x-1/2 lg:w-[8.5rem] md:w-[8.5rem] sm:w-[8.5rem] h-full ">
                    <Image src={`/images/mods/cards/${frameColor}LowerTab.png`} alt={`${frameColor} Lower Tab`} width={145} height={145} loading="lazy"
                        className="absolute transition-all duration-200 ease-in-out" />
                    <div className="absolute w-full h-4 flex items-center justify-center font-semibold text-xs" style={{ color: cardColor }}>
                        {mod.compatName}
                    </div>
                </div>
            )}

            {currentRank == mod.fusionLimit && (
                <hr className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[65%] border-t-[0.1rem] border-[#a6e6ff] z-3" />
            )}

            <div className="absolute bottom-[0.7vw] left-1/2 -translate-x-1/2 w-[65%] flex justify-center text-[0.5rem] z-4 gap-0.5">
                {Array.from({ length: mod.fusionLimit }, (_, i) => {
                    const ranked = i < (currentRank ?? mod.fusionLimit);
                    return (
                        <span key={i} className={ranked ? 'text-[#a6e6ff]' : 'text-[#525252]'} style={ranked ? { filter: 'drop-shadow(0 0 0.1rem #a6e6ff)' } : {}}>
                            ★
                        </span>
                    );
                })}
            </div>
        </div>
    )
}