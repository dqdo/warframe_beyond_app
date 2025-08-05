import { ModSlotsContainer } from "@/app/components/Slots/ModSlotsContainer"
import { ArcaneSlotsContainer } from "@/app/components/Slots/ArcaneSlotsContainer"
import { ArchonShardSlotsContainer } from "@/app/components/Slots/ArchonShardSlotsContainer"
import { useState, useEffect } from "react";
import { ModWithTexture } from "@/app/lib/api/fetchMods";

type SlotsProps = {
    isSidebarOpen: boolean;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
    selectedButton: string | null;
    selectedBuildType: string | null;
    selectedMod: ModWithTexture | null;
    setSelectedMod: React.Dispatch<React.SetStateAction<ModWithTexture | null>>;
    assignedMods: Record<string, ModWithTexture | null>;
    setAssignedMods: React.Dispatch<React.SetStateAction<Record<string, ModWithTexture | null>>>;
    setTotalDrain: React.Dispatch<React.SetStateAction<number>>;
    calculatedDrains: Record<string, number>;
    setCalculatedDrains: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    currentRanks: Record<string, number>;
    setCurrentRanks: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    slotPolarities: Record<string, string>;
    setSlotPolarities: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export function Slots({
    isSidebarOpen,
    setSelectedButton,
    selectedButton,
    selectedBuildType,
    selectedMod,
    assignedMods,
    setAssignedMods,
    setTotalDrain,
    setSelectedMod,
    calculatedDrains,
    setCalculatedDrains,
    currentRanks,
    setCurrentRanks,
    slotPolarities,
    setSlotPolarities
}: SlotsProps) {
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    useEffect(() => {
        if (selectedButton === null) {
            setSelectedSlot(null);
        }
    }, [selectedButton]);

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="z-1">
                    <ModSlotsContainer
                        isSidebarOpen={isSidebarOpen}
                        setSelectedButton={setSelectedButton}
                        selectedSlot={selectedSlot}
                        setSelectedSlot={setSelectedSlot}
                        selectedButton={selectedButton}
                        selectedBuildType={selectedBuildType}
                        selectedMod={selectedMod}
                        assignedMods={assignedMods}
                        setAssignedMods={setAssignedMods}
                        setTotalDrain={setTotalDrain}
                        setSelectedMod={setSelectedMod}
                        calculatedDrains={calculatedDrains}
                        setCalculatedDrains={setCalculatedDrains}
                        currentRanks={currentRanks}
                        setCurrentRanks={setCurrentRanks}
                        slotPolarities={slotPolarities}
                        setSlotPolarities={setSlotPolarities}
                    />
                </div>
                <ArcaneSlotsContainer isSidebarOpen={isSidebarOpen} setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} selectedBuildType={selectedBuildType} />

                {selectedBuildType == "Warframe" && (
                    <ArchonShardSlotsContainer isSidebarOpen={isSidebarOpen} setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} />
                )}
            </div>
        </>
    )
}