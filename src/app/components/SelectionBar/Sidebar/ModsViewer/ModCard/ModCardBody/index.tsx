import { ModWithTexture } from "@/app/lib/api/fetchMods"
import Image from "next/image"

type ModCardBodyProps = {
    mod: ModWithTexture;
    cardColor: string;
    expandAll?: boolean;
    frameColor: string;
}

function getModDetails(mod: ModWithTexture) {
    const stats = mod.levelStats?.[mod.levelStats.length - 1]?.stats ?? [];
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


export function ModCardBody({ mod, cardColor, expandAll, frameColor }: ModCardBodyProps) {
    return (
        <div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[19%] w-[93%] h-auto">
                {mod.textureUrl ? (
                    <div className="relative w-full h-full">
                        <div>
                            {expandAll === true && (
                                <div>
                                    <Image src={`/images/mods/cards/${frameColor}Background.png`} alt={`${frameColor} Background`} width={200} height={200}
                                        className="absolute top-[60%] w-full h-[99%] scale-[1.1]" style={{ clipPath: "inset(0 0 10% 0)" }} />

                                    <div className="relative z-1 top-5">
                                        <Image src={`/images/mods/cards/${frameColor}SideLight.png`} alt={`${frameColor} Sidelight Left`} width={10} height={20} style={{ transform: 'scaleX(-1)' }}
                                            className="absolute left-0 -translate-x-1.5 w-[0.75vw] h-auto" />
                                        <Image src={`/images/mods/cards/${frameColor}SideLight.png`} alt={`${frameColor} Sidelight Right`} width={10} height={20}
                                            className="absolute right-0 translate-x-1.5 w-[0.75vw] h-auto" />
                                    </div>

                                    <div
                                        className={`absolute top-[76%] left-1/2 -translate-x-1/2 z-2 text-white text-center leading-tight flex flex-col items-center`}
                                        style={{ color: cardColor }}
                                    >
                                        <div className="text-[95%] w-33 text-center">
                                            {mod.name}
                                        </div>
                                        <div className="text-[80%] w-[8vw] h-16 text-center overflow-hidden" style={{ color: cardColor }}>
                                            {getModDetails(mod)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Image src={mod.textureUrl} alt={mod.name} width={200} height={200} unoptimized loading="lazy"
                            className={`w-full h-full object-cover rounded-b-3xl z-1`}
                            style={{ clipPath: expandAll ? "inset(0 0 25% 0)" : "inset(0 0 60% 0)" }} />

                        {expandAll === false && (
                            <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 justify-center items-center flex">
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
                    ${expandAll ? 'h-[145%] opacity-20 brightness-40' : 'h-[45%] opacity-70 brightness-10'}`} />
            </div>
        </div>
    )
}