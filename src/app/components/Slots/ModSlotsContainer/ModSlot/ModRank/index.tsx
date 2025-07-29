type ModRankProps = {
    currentModRank: number;
    setCurrentModRank: React.Dispatch<React.SetStateAction<number | null>>;
    fusionLimit: number;
}

export function ModRank({ currentModRank, setCurrentModRank, fusionLimit }: ModRankProps) {
    const incrementRank = () => {
        if (currentModRank === null) return;
        setCurrentModRank((prev) => prev !== null ? Math.min(prev + 1, fusionLimit) : prev);
    };

    const decrementRank = () => {
        if (currentModRank === null) return;
        setCurrentModRank((prev) => prev !== null ? Math.max(prev - 1, 0) : prev);
    };

    return (
        <div className="flex w-auto space-x-[1vw] bg-stone-800 rounded-sm px-1 items-center opacity-50 transition-opacity duration-200 hover:opacity-100">
            <div className="cursor-pointer font-extrabold text-[1.25rem] select-none transition-colors duration-200 hover:text-red-500" onClick={decrementRank}>
                −
            </div>

            <div className="w-auto flex items-center gap-1 text-[0.75rem]">
                <div>Rank:</div>
                <div>{currentModRank}</div>
            </div>

            <div className="cursor-pointer font-extrabold text-[1.25rem] select-none transition-colors duration-200 hover:text-green-500" onClick={incrementRank}>
                +
            </div>
        </div>
    );
}