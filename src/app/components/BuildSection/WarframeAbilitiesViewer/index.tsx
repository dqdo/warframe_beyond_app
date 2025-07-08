import Button from "@/app/components/Elements/Button"
import { useState } from "react";

export function WarframeAbilitiesViewer() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <>
            <div className="flex justify-center items-center gap-4 mb-2">
                {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                        <Button variant="warframeAbilities" />
                        {hoveredIndex === i && (
                            <div className="absolute top-14 w-auto h-auto min-w-20 min-h-20 opacity-95 bg-neutral-900 border border-neutral-500 rounded-sm">

                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}