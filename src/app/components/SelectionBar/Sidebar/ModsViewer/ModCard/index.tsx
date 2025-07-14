import { ModWithTexture } from "@/app/lib/api/fetchMods"
import Image from "next/image"
import { polarityImages } from '@/app/lib/constants/images'

type ModCardProps = {
    mod: ModWithTexture;
}

export function ModCard({ mod }: ModCardProps) {
    const rarityToFrameColor: Record<string, string> = {
        COMMON: "Bronze",
        UNCOMMON: "Silver",
        RARE: "Gold",
        LEGENDARY: "Legendary"
    };

    const frameColor = rarityToFrameColor[mod.rarity] || "Bronze";

    const rarityToCardColor: Record<string, string> = {
        COMMON: "#c79989",
        UNCOMMON: "#bec0c2",
        RARE: "#fbecc4",
        LEGENDARY: "#dfdfdf"
    }

    const cardColor = rarityToCardColor[mod.rarity] || "#ffffff";

    const totalDrain = mod.baseDrain + mod.fusionLimit;

    return (
        <>
            <div className="relative">
                <Image src={`/images/mods/cards/${frameColor}FrameTop.png`} alt="Top Frame" width={200} height={200} loading="lazy" className="z-2 relative" />

                <div className="absolute top-[16%] right-[2%] z-1">
                    <Image src={`/images/mods/cards/${frameColor}UpperTab.png`} alt="Top Frame" width={30} height={30} className="w-10 h-4 gap-1" loading="lazy" />
                    <div className="ml-0.5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs flex items-center gap-0.5">
                        <div style={{ color: cardColor }}>{totalDrain}</div>
                        <div
                            className="w-3 h-3"
                            style={{
                                backgroundColor: cardColor,
                                WebkitMaskImage: `url(${polarityImages[mod.polarity]})`,
                                WebkitMaskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'center',
                                WebkitMaskSize: 'contain',
                                maskImage: `url(${polarityImages[mod.polarity]})`,
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                maskSize: 'contain',
                            }}
                        />
                    </div>
                </div>

                <div className="relative flex items-center justify-center">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[19%] w-[93%] h-auto">
                        {mod.textureUrl ? (
                            <Image src={mod.textureUrl} alt={mod.name} width={200} height={200} unoptimized loading="lazy" className="w-full h-full object-cover rounded-b-3xl" style={{ clipPath: "inset(0 0 60% 0)" }} />
                        ) : (
                            <p className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs italic"> No image</p>
                        )}

                        <div style={{ backgroundColor: cardColor }} className="absolute top-0 left-0 w-full h-[45%] opacity-70 brightness-20 rounded-b-3xl" />
                    </div>
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-2 text-white text-[91%] overflow-hidden w-32 text-center leading-tight" style={{ color: cardColor }}>
                        {mod.name}
                    </div>
                </div>

                <div className="relative">
                    <Image src={`/images/mods/cards/${frameColor}FrameBottom.png`} alt="Bottom Frame" width={200} height={200} className="-mt-[14%] z-2 relative" loading="lazy" />
                    <hr className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 w-[65%] border-t-[0.1rem] border-[#7DF9FF] z-3" />
                </div>
            </div>
        </>
    )
}