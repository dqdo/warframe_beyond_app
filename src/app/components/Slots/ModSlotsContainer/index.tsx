import { ModSlot } from "@/app/components/Slots/ModSlotsContainer/ModSlot"
import { ModWithTexture } from "@/app/lib/api/fetchMods"
import { useEffect, useState } from "react";

type ModSlotsContainerProps = {
    isSidebarOpen: boolean;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
    selectedSlot: string | null;
    setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
    selectedButton: string | null;
    selectedBuildType: string | null;
    selectedMod: ModWithTexture | null;
}

export function ModSlotsContainer({ isSidebarOpen, setSelectedButton, selectedSlot, setSelectedSlot, selectedButton, selectedBuildType, selectedMod }: ModSlotsContainerProps) {
    const [assignedMods, setAssignedMods] = useState<Record<string, ModWithTexture | null>>({});
    useEffect(() => {
        if (selectedMod && selectedSlot) {
            setAssignedMods(prev => ({
                ...prev,
                [selectedSlot]: selectedMod,
            }));
        }
    }, [selectedMod, selectedSlot]);

    useEffect(() => {
        setAssignedMods({});
        setSelectedSlot(null);
    }, [selectedBuildType]);

    return (
        <div className={`${isSidebarOpen ? "-translate-x-0" : "translate-x-0"}`}>
            <div className="flex justify-center gap-2">
                {selectedBuildType === "Warframe" && (
                    <ModSlot id="aura" type="AURA" setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} assignedMod={assignedMods['aura']} />
                )}

                {selectedBuildType === "Melee" && (
                    <ModSlot id="stance" type="STANCE" setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} assignedMod={assignedMods['stance']} />
                )}

                <ModSlot id="exilus" type="UTLITY" setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} assignedMod={assignedMods['exilus']} />
            </div>
            <div className={`grid ${isSidebarOpen ? "grid-cols-3" : "grid-cols-4"} gap-2`}>
                {Array.from({ length: 8 }, (_, i) => (
                    <ModSlot id={`mod${i}`} key={i} type="Mod" setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} assignedMod={assignedMods[`mod${i}`]} />
                ))}
            </div>
        </div>
    )
}