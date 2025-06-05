type ItemRankBarProps = {
    count: number;
    modDrain?: number;
};

export function ItemRankBar({ count, modDrain = 0 }: ItemRankBarProps) {
    const currentRank = Math.max(count - modDrain, 0);

    return (
        <div className="justify-center border border-neutral-400 bg-neutral-700 w-63 h-5 flex items-center text-sm rounded-4xl text-white">
            {currentRank} / {count}
        </div>
    );
}
