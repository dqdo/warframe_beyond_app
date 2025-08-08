import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { ModWithTexture } from "../../../../../../../../pages/api/fetchMods";

type ModCardBodyProps = {
    mod: ModWithTexture;
    cardColor: string;
    expandAll?: boolean;
    frameColor: string;
    hover?: boolean;
    currentRank?: number;
}

function getModDetails(mod: ModWithTexture, currentRank?: number) {
    const levelStats = mod.levelStats ?? [];
    const levelIndex = currentRank !== undefined ? currentRank : levelStats.length - 1;

    const stats = levelStats[levelIndex]?.stats ?? [];
    const description = mod.description ?? [];

    return (
        <>
            {stats.map((stat, i) => (
                <div key={`stat-${i}`}>{stat}</div>
            ))}
            {stats.length === 0 &&
                description.map((line, i) => (
                    <div key={`desc-${i}`}>{line}</div>
                ))}
        </>
    );
}


export function ModCardBody({ mod, cardColor, expandAll, frameColor, hover, currentRank }: ModCardBodyProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [dynamicTop, setDynamicTop] = useState(77);
    const [clipInset, setClipInset] = useState("inset(0 0 25% 0)");


    useEffect(() => {
        if (containerRef.current && contentRef.current) {
            const containerHeight = containerRef.current.offsetHeight;
            const contentHeight = contentRef.current.scrollHeight;

            const overflow = contentHeight - containerHeight;
            const overflowRatio = 0.8;
            const offsetPercent = overflow > 0 ? overflow * overflowRatio : 0;

            const newTop = Math.max(20, 77 - offsetPercent);
            setDynamicTop(newTop);

            const baseClip = 25;
            const maxClip = 80;

            if (overflow > 0) {
                const clipAdjustment = Math.min(overflow * 0.8, maxClip - baseClip);
                const newClip = Math.min(baseClip + clipAdjustment, maxClip);
                setClipInset(`inset(0 0 ${newClip}% 0)`);
            } else {
                setClipInset(`inset(0 0 ${baseClip}% 0)`);
            }
        }
    }, [mod.levelStats, expandAll, hover]);

    return (
        <div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[19%] w-[93%] h-auto">
                {mod.textureUrl ? (
                    <div className="relative w-full h-full">
                        <div>
                            {(expandAll || hover) === true && (
                                <div>
                                    <Image src={`/images/mods/cards/${frameColor}Background.png`} alt={`${frameColor} Background`} width={200} height={200}
                                        className="transition-all duration-300 ease-in-out absolute top-[0%] w-full h-[170%] scale-[1.1]" style={{ clipPath: "inset(0 0 10% 0)" }} />

                                    <div className="transition-all duration-300 ease-in-out relative z-1 top-5">
                                        <Image src={`/images/mods/cards/${frameColor}SideLight.png`} alt={`${frameColor} Sidelight Left`} width={10} height={20} style={{ transform: 'scaleX(-1)' }}
                                            className="absolute left-0 -translate-x-1.5 w-[12px] h-auto" />
                                        <Image src={`/images/mods/cards/${frameColor}SideLight.png`} alt={`${frameColor} Sidelight Right`} width={10} height={20}
                                            className="absolute right-0 translate-x-1.5 w-[12px] h-auto" />
                                    </div>
                                    <div ref={containerRef} className="absolute h-[81px] w-[160px] left-1/2 -translate-x-1/2 z-1" style={{ top: `${dynamicTop}%` }}>
                                        <div ref={contentRef} className="absolute left-1/2 -translate-x-1/2 text-white text-center leading-tight flex flex-col items-center"
                                            style={{ color: cardColor }}>
                                            <div className="text-[0.9rem] w-33 text-center">
                                                {mod.name}
                                            </div>
                                            <div className="text-[0.7rem] w-[100%] h-auto text-center whitespace-normal break-words" style={{ color: cardColor }}>
                                                {getModDetails(mod, currentRank)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Image src={mod.textureUrl} alt={mod.name} width={200} height={200} loading="lazy" quality={75}
                            className={`w-full h-full object-cover rounded-b-3xl transition duration-300 ease-in-out z-1 ${hover ? 'scale-[1.01]' :''}`}
                            style={{ clipPath: (expandAll || hover) ? clipInset : "inset(0 0 60% 0)" }} />

                        {(expandAll || hover) === false && (
                            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 justify-center items-center flex w-[80%]">
                                <div className="text-center text-[91%] leading-tight" style={{ color: cardColor }}>
                                    {mod.name}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs italic">
                        No image
                    </p>
                )}
                <div style={{ backgroundColor: cardColor }} className={`absolute top-0 left-0 w-full rounded-b-3xl 
                    ${(expandAll || hover) ? 'h-[150%] opacity-20 brightness-40' : 'h-[45%] opacity-70 brightness-10'}`} />
            </div>
        </div>
    )
}