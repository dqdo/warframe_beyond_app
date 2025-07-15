import { ModWithTexture } from "@/app/lib/api/fetchMods"
import Image from "next/image"

type ModCardBodyProps = {
    mod: ModWithTexture;
    cardColor: string;
    expandAll?: boolean;
    frameColor: string;
}


export function ModCardBody({ mod, cardColor, expandAll, frameColor }: ModCardBodyProps) {
    return (
        <>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[19%] w-[93%] h-auto">
                {mod.textureUrl ? (
                    <div className="relative w-full h-full">
                        {expandAll && (
                            <div>
                                <Image src={`/images/mods/cards/${frameColor}Background.png`} alt={`${frameColor} Background`} width={200} height={200}
                                    className="absolute top-[55%] w-full h-full scale-[1.1]" style={{ clipPath: "inset(0 0 10% 0)" }} />
                            </div>
                        )}

                        <Image src={mod.textureUrl} alt={mod.name} width={200} height={200} unoptimized loading="lazy"
                            className={`w-full h-full object-cover rounded-b-3xl z-1`}
                            style={{ clipPath: expandAll ? "inset(0 0 25% 0)" : "inset(0 0 60% 0)" }} />
                    </div>
                ) : (
                    <p className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs italic">
                        No image
                    </p>
                )}
                <div style={{ backgroundColor: cardColor }} className="absolute top-0 left-0 w-full h-[45%] opacity-70 brightness-20 rounded-b-3xl" />
            </div>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-2 text-white text-[91%] overflow-hidden w-32 text-center leading-tight" style={{ color: cardColor }}>
                {mod.name}
            </div>
        </>
    )
}