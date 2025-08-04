import { ModWithTexture } from "@/app/lib/api/fetchMods"
import { ModCardUpper } from "@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard/ModCardUpper";
import { ModCardLower } from "@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard/ModCardLower";
import { ModCardBody } from "@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard/ModCardBody";
import { useState, useRef, useEffect } from "react";

type ModCardProps = {
    mod: ModWithTexture;
    expandAll?: boolean;
    currentRank: number;
    polarityCheck?: boolean | null;
    onDrainCalculated?: (drain: number) => void;
}

export function ModCard({ mod, expandAll, currentRank, polarityCheck, onDrainCalculated}: ModCardProps) {
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


    const maxDrain = mod.baseDrain + currentRank;

    return (
        <>
            <div
                ref={cardRef}
                className={`absolute left-0 w-full h-[100px] transition-all duration-200 ease-in-out ${expandAll ? 'z-5 top-[60px]' : hover ? 'z-5 scale-[1.1]' : 'z-0'}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >

                <div className={`relative pointer-events-none`}>
                    <ModCardUpper frameColor={frameColor} cardColor={cardColor} maxDrain={maxDrain} polarity={mod.polarity} polarityCheck={polarityCheck} onDrainCalculated={onDrainCalculated} mod={mod} currentRank={currentRank} hover={hover} expandAll={expandAll} />
                </div>

                <div className={`relative flex items-center justify-center pointer-events-none ${hover || expandAll ? '-top-[60px]' : ''}`}>
                    <ModCardBody mod={mod} cardColor={cardColor} expandAll={expandAll} frameColor={frameColor} hover={hover} currentRank={currentRank} />
                </div>

                <div className={`relative pointer-events-none ${hover || expandAll ? '-top-[60px]' : ''}`}>
                    <ModCardLower frameColor={frameColor} expandAll={expandAll} cardColor={cardColor} mod={mod} hover={hover} currentRank={currentRank} />
                </div>

            </div>
        </>
    )
}