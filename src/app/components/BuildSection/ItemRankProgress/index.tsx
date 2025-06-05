import { useState } from "react";
import { ItemRankBar } from "@/app/components/BuildSection/ItemRankProgress/ItemRankBar";
import { ItemRankCounter } from "@/app/components/BuildSection/ItemRankProgress/ItemRankCounter";
import SlidingButton from "@/app/components/Elements/SlidingButton";

export function ItemRankProgress() {
    const [count, setCount] = useState(0);
    const [isDouble, setIsDouble] = useState(false);
    const modDrain = 0;

    const displayCount = isDouble ? count * 2 : count;

    return (
        <>
            <ItemRankCounter count={count} setCount={setCount} />
            <div className="justify-self-center">
                <ItemRankBar count={displayCount} modDrain={modDrain} />
            </div>
            <div className="flex justify-between m-2">
                <div className="text-base font-bold"> Orokin Reactor </div>
                <SlidingButton isOn={isDouble} onToggle={setIsDouble} />
            </div>
        </>
    );
}
