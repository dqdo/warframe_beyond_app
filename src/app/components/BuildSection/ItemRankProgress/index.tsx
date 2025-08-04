import { useState } from "react";
import { ItemRankBar } from "@/app/components/BuildSection/ItemRankProgress/ItemRankBar";
import { ItemRankCounter } from "@/app/components/BuildSection/ItemRankProgress/ItemRankCounter";
import SlidingButton from "@/app/components/Elements/SlidingButton";
import { ModWithTexture } from "@/app/lib/api/fetchMods";

type ItemRankProgressProps = {
    totalDrain: number;
    assignedMods: Record<string, ModWithTexture | null>;
    calculatedDrains: Record<string, number>;
}

export function ItemRankProgress({ totalDrain, assignedMods, calculatedDrains }: ItemRankProgressProps) {
    const [count, setCount] = useState(30);
    const [isDouble, setIsDouble] = useState(true);

    const displayCount = isDouble ? count * 2 : count;

    return (
        <>
            <ItemRankCounter count={count} setCount={setCount} />
            <div className="justify-self-center">
                <ItemRankBar count={displayCount} totalDrain={totalDrain} assignedMods={assignedMods} calculatedDrains={calculatedDrains} />
            </div>
            <div className="flex justify-between m-2">
                <div className="text-base font-bold"> Orokin Reactor </div>
                <SlidingButton isOn={isDouble} onToggle={setIsDouble} />
            </div>
        </>
    );
}
