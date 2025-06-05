'use client';

import { ChangeEvent } from 'react';

type ItemRankCounterProps = {
    count: number;
    setCount: (val: number) => void;
};

export function ItemRankCounter({ count, setCount }: ItemRankCounterProps) {
    const MIN = 0;
    const MAX = 30;

    const increment = () => setCount(Math.min(count + 1, MAX));
    const decrement = () => setCount(Math.max(count - 1, MIN));


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, '');
        const clean = raw.replace(/^0+(?!$)/, '') || '0';
        const num = parseInt(clean, 10);
        if (!isNaN(num)) {
            setCount(Math.min(Math.max(num, MIN), MAX));
        }
    };

    return (
        <div className="flex items-center justify-between w-full mb-1 text-white">
            <div className="font-bold text-base ml-2">Item Rank</div>
            <div className="relative group mr-2">
                <input type="text" inputMode="numeric" value={count.toString()} onChange={handleChange}
                    className="w-14 text-base text-center py-0 pr-6 bg-stone-900 border border-neutral-700 rounded text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col opacity-0 group-hover:opacity-100">
                    <button onClick={increment} disabled={count >= MAX}
                        className={`text-[0.5rem] px-[4px] rounded-t ${count >= MAX ? 'bg-neutral-600 cursor-not-allowed' : 'bg-neutral-700 hover:bg-green-600'}`}
                    >
                        ▲
                    </button>
                    <button onClick={decrement} disabled={count <= MIN}
                        className={`text-[0.5rem] px-[4px] rounded-b ${count <= MIN ? 'bg-neutral-600 cursor-not-allowed' : 'bg-neutral-700 hover:bg-red-600'}`}
                    >
                        ▼
                    </button>
                </div>
            </div>
        </div>
    );
}
