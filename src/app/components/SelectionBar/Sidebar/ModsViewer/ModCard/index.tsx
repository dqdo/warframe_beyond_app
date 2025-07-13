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
                <Image src={`/images/mods/cards/${frameColor}FrameTop.png`} alt="Top Frame" width={200} height={200} loading="lazy" className="z-1 relative" />

                <div className="absolute top-[16%] right-[2%]">
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

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-2 text-white text-sm overflow-hidden w-30 text-center" style={{ color: cardColor }}>
                    {mod.name}
                </div>

                <Image src={`/images/mods/cards/${frameColor}FrameBottom.png`} alt="Bottom Frame" width={200} height={200} className="-mt-5" loading="lazy" />
            </div>
        </>
    )
}