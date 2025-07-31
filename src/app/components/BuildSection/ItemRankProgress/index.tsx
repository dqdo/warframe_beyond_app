import { useState } from "react";
import { ItemRankBar } from "@/app/components/BuildSection/ItemRankProgress/ItemRankBar";
import { ItemRankCounter } from "@/app/components/BuildSection/ItemRankProgress/ItemRankCounter";
import SlidingButton from "@/app/components/Elements/SlidingButton";

type ItemRankProgressProps = {
    totalDrain: number;
}

export function ItemRankProgress({ totalDrain }: ItemRankProgressProps) {
    const [count, setCount] = useState(0);
    const [isDouble, setIsDouble] = useState(false);

    const displayCount = isDouble ? count * 2 : count;

    return (
        <>
            <ItemRankCounter count={count} setCount={setCount} />
            <div className="justify-self-center">
                <ItemRankBar count={displayCount} totalDrain={totalDrain} />
            </div>
            <div className="flex justify-between m-2">
                <div className="text-base font-bold"> Orokin Reactor </div>
                <SlidingButton isOn={isDouble} onToggle={setIsDouble} />
            </div>
        </>
    );
}
