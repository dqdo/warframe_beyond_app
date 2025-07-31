type ItemRankBarProps = {
    count: number;
    totalDrain: number;
};

export function ItemRankBar({ count, totalDrain }: ItemRankBarProps) {
    const currentRank = count - totalDrain;
    const isOverCapacity = currentRank < 0;
    const usedFraction = Math.min(totalDrain / count, 1);
    const fillWidth = `${Math.min(usedFraction * 100, 100)}%`;

    return (
        <div className={`relative w-64 h-5 rounded-4xl overflow-hidden border border-neutral-400 ${isOverCapacity ? "bg-red-800" : "bg-neutral-700"}`}>
            <div className={`absolute left-0 top-0 h-full transition-all duration-200 ${isOverCapacity ? "" : "bg-green-500"}`}
                style={{ width: fillWidth }} />
            <div className="relative z-10 flex items-center justify-center h-full text-sm text-white">
                {currentRank} / {count}
            </div>
        </div>
    );
}
