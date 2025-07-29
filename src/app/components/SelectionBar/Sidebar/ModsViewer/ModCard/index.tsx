import { ModWithTexture } from "@/app/lib/api/fetchMods"
import { ModCardUpper } from "@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard/ModCardUpper";
import { ModCardLower } from "@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard/ModCardLower";
import { ModCardBody } from "@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard/ModCardBody";
import { useState, useRef, useEffect } from "react";

type ModCardProps = {
    mod: ModWithTexture;
    expandAll?: boolean;
    currentRank: number;
}

export function ModCard({ mod, expandAll, currentRank }: ModCardProps) {
    const [hover, setHover] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                const isHovering = (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                );
                setHover(isHovering);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

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

    const totalDrain = mod.baseDrain + currentRank;

    return (
        <>
            <div
                ref={cardRef}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ease-in-out  ${expandAll ? 'z-5' : hover ? 'z-5' : 'z-0'}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >

                <div className="relative pointer-events-none">
                    <ModCardUpper frameColor={frameColor} cardColor={cardColor} totalDrain={totalDrain} polarity={mod.polarity} />
                </div>

                <div className="relative flex items-center justify-center pointer-events-none">
                    <ModCardBody mod={mod} cardColor={cardColor} expandAll={expandAll} frameColor={frameColor} hover={hover} />
                </div>

                <div className="relative pointer-events-none">
                    <ModCardLower frameColor={frameColor} expandAll={expandAll} cardColor={cardColor} mod={mod} hover={hover} currentRank={currentRank} />
                </div>

            </div>
        </>
    )
}