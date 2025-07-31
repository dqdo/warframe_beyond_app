import Image from "next/image"
import { polarityImages } from '@/app/lib/constants/images'
import { useEffect } from "react";
import { ModWithTexture } from "@/app/lib/api/fetchMods";

type ModCardUpperProps = {
    frameColor: string;
    cardColor: string;
    maxDrain: number;
    polarity: string;
    polarityCheck?: boolean | null;
    onDrainCalculated?: (drain: number) => void;
    mod?: ModWithTexture;
    currentRank: number;
}

export function ModCardUpper({ frameColor, cardColor, maxDrain, polarity, polarityCheck, onDrainCalculated, currentRank }: ModCardUpperProps) {
    let calculatedDrain = maxDrain;

    if (polarityCheck === true) {
        calculatedDrain = Math.ceil(maxDrain / 2);
    } else if (polarityCheck === false) {
        calculatedDrain = Math.round(maxDrain * 1.25);
    }

    useEffect(() => {
        if (onDrainCalculated) {
            onDrainCalculated(calculatedDrain);
        }
    }, [polarityCheck, currentRank, calculatedDrain]);

    const drainColor = polarityCheck === true ? "#4CAF50" : polarityCheck === false ? "#F44336" : cardColor;


    return (
        <div className="pointer-events-none">
            <Image src={`/images/mods/cards/${frameColor}FrameTop.png`} alt="Top Frame" width={200} height={200} loading="lazy" className="z-2 relative" />
            <div className="absolute top-[1.1vw] right-[2%] z-1">
                <Image src={`/images/mods/cards/${frameColor}UpperTab.png`} alt="Top Frame" width={30} height={30} className="w-10 h-4 gap-1" loading="lazy" />
                <div className="ml-0.5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs flex items-center gap-0.5">
                    <div style={{ color: drainColor }}>{calculatedDrain}</div>
                    <div
                        className="w-3 h-3"
                        style={{
                            backgroundColor: drainColor,
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