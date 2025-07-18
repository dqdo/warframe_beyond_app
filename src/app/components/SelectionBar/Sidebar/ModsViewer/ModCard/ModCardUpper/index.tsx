import Image from "next/image"
import { polarityImages } from '@/app/lib/constants/images'

type ModCardUpperProps = {
    frameColor: string;
    cardColor: string;
    totalDrain: number;
    polarity: string;
}

export function ModCardUpper({ frameColor, cardColor, totalDrain, polarity }: ModCardUpperProps) {
    return (
        <div className="pointer-events-none">
            <Image src={`/images/mods/cards/${frameColor}FrameTop.png`} alt="Top Frame" width={200} height={200} loading="lazy" className="z-2 relative" />
            <div className="absolute top-[45%] right-[2%] z-1">
                <Image src={`/images/mods/cards/${frameColor}UpperTab.png`} alt="Top Frame" width={30} height={30} className="w-10 h-4 gap-1" loading="lazy" />
                <div className="ml-0.5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs flex items-center gap-0.5">
                    <div style={{ color: cardColor }}>{totalDrain}</div>
                    <div
                        className="w-3 h-3"
                        style={{
                            backgroundColor: cardColor,
                            WebkitMaskImage: `url(${polarityImages[polarity]})`,
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            WebkitMaskSize: 'contain',
                            maskImage: `url(${polarityImages[polarity]})`,
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            maskSize: 'contain',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}