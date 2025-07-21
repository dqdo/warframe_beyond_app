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
}

export function Slots({ isSidebarOpen, setSelectedButton, selectedButton, selectedBuildType, selectedMod }: SlotsProps) {

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
                    <ModSlotsContainer isSidebarOpen={isSidebarOpen} setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} selectedBuildType={selectedBuildType} selectedMod={selectedMod} />
                </div>

                <ArcaneSlotsContainer isSidebarOpen={isSidebarOpen} setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} selectedBuildType={selectedBuildType} />

                {selectedBuildType == "Warframe" && (
                    <ArchonShardSlotsContainer isSidebarOpen={isSidebarOpen} setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} />
                )}
            </div>
        </>
    )
}