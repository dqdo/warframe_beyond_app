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
        <div className="flex w-auto text-[0.75rem] space-x-[1vw] bg-stone-800 rounded-sm px-2 py-1 items-center">
            <div className="cursor-pointer font-bold select-none" onClick={decrementRank}>
                −
            </div>

            <div className="w-auto flex items-center gap-1">
                <div>Rank:</div>
                <div>{currentModRank}</div>
            </div>

            <div className="cursor-pointer font-bold select-none" onClick={incrementRank}>
                +
            </div>
        </div>
    );
}