import { ModWithTexture } from "../../../../../../pages/api/fetchMods";

type ItemRankBarProps = {
    count: number;
    totalDrain: number;
    assignedMods: Record<string, ModWithTexture | null>;
    calculatedDrains: Record<string, number>;
};

export function ItemRankBar({ count, totalDrain, assignedMods, calculatedDrains }: ItemRankBarProps) {
    let auraDrain = 0;
    Object.entries(assignedMods).forEach(([slot, mod]) => {
        if (mod?.type === 'AURA' && calculatedDrains[slot]) {
            auraDrain = calculatedDrains[slot];
        }
    });

    const regularDrain = totalDrain - auraDrain;

    const currentRank = count + auraDrain - regularDrain;

    const isOverCapacity = currentRank < 0;
    const usedFraction = Math.min(regularDrain / (count + auraDrain), 1);
    const fillWidth = `${Math.min(usedFraction * 100, 100)}%`;

    return (
        <div className={`relative w-64 h-5 rounded-4xl overflow-hidden border border-neutral-400 ${isOverCapacity ? "bg-red-800" : "bg-neutral-700"}`}>
            <div className={`absolute left-0 top-0 h-full transition-all duration-200 ${isOverCapacity ? "" : "bg-green-500"}`}
                style={{ width: fillWidth }} />
            <div className="relative z-1 flex items-center justify-center h-full text-sm text-white">
                {currentRank} / {count + auraDrain}
            </div>
        </div>
    );
}
