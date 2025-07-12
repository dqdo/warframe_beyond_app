import Button from "@/app/components/Elements/Button";
import { useState } from "react";
import { WarframeWithTexture } from "@/app/lib/api/fetchWarframes";
import Image from "next/image";

type WarframeAbilitiesViewerProps = {
    warframe: WarframeWithTexture;
};

export function WarframeAbilitiesViewer({ warframe }: WarframeAbilitiesViewerProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="flex justify-center items-center gap-4 mb-2">
            {warframe.abilities.map((ability, i) => (
                <div key={i} className="relative cursor-pointer" onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                    <Button variant="warframeAbilities" />

                    {ability.textureUrl && (
                        <Image src={ability.textureUrl} alt={ability.name} width={48} height={48} unoptimized className="absolute top-0 left-0 w-full h-full" />
                    )}

                    {hoveredIndex === i && (
                        <div className="absolute top-14 min-w-72 h-auto opacity-95 bg-neutral-900 border border-neutral-500 rounded-sm text-white text-sm p-2">
                            <div className="font-bold mb-1">{ability.name}</div>
                            <hr />
                            <div>{ability.description}</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
