'use client';

import { useState } from 'react';

export function ItemRankCounter() {
    const [count, setCount] = useState(0);
    const MIN = 0;
    const MAX = 30;

    const increment = () => setCount(prev => Math.min(prev + 1, MAX));
    const decrement = () => setCount(prev => Math.max(prev - 1, MIN));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        const cleanedValue = rawValue.replace(/^0+(?!$)/, '') || '0';
        const num = parseInt(cleanedValue, 10);
        if (!isNaN(num)) {
            setCount(Math.min(Math.max(num, MIN), MAX));
        }
    };

    return (
        <div className="flex items-center justify-between w-full p-2 text-white">
            <div className="font-bold text-base ml-2">Item Rank</div>

            <div className="relative group mr-2">
                <input type="text" inputMode="numeric" value={count.toString()} onChange={handleChange}
                    className="w-14 text-base text-center font-base py-0 pr-6 bg-stone-900 border border-neutral-700 rounded text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col opacity-0 group-hover:opacity-100">
                    <button onClick={increment} disabled={count >= MAX}
                        className={`text-[0.5rem] px-[4px] rounded-t ${count >= MAX ? 'bg-neutral-600 cursor-not-allowed' : 'bg-neutral-700 hover:bg-green-600'
                            }`}
                    >
                        ▲
                    </button>
                    <button onClick={decrement} disabled={count <= MIN}
                        className={`text-[0.5rem] px-[4px] rounded-b ${count <= MIN ? 'bg-neutral-600 cursor-not-allowed' : 'bg-neutral-700 hover:bg-red-600'
                            }`}
                    >
                        ▼
                    </button>
                </div>
            </div>
        </div>
    );
}
