import { ModWithTexture } from "@/app/lib/api/fetchMods"
// import Image from "next/image"
// import { useState } from "react";
import { ModCardUpper } from "@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard/ModCardUpper";
import { ModCardLower } from "@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard/ModCardLower";
import { ModCardBody } from "@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard/ModCardBody";

type ModCardProps = {
    mod: ModWithTexture;
    expandAll?: boolean;
}

export function ModCard({ mod, expandAll }: ModCardProps) {
    // const [hover, setHover] = useState(false);
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

    // const stats = mod.levelStats?.[mod.levelStats.length - 1]?.stats ?? [];
    // const description = mod.description ?? [];

    // const showDetails = expandAll || hover;

    return (
        <>
            <div className="relative cursor-pointer">

                <div className="relative">
                    <ModCardUpper frameColor={frameColor} cardColor={cardColor} totalDrain={totalDrain} polarity={mod.polarity}/>
                </div>
                
                <div className="relative flex items-center justify-center">
                    <ModCardBody mod = {mod} cardColor = {cardColor} expandAll = {expandAll} frameColor={frameColor}/>
                </div>

                <div className="relative">
                    <ModCardLower frameColor={frameColor} expandAll = {expandAll}/>
                </div>

            </div>
        </>
    )
}