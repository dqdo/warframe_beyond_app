import { ModSlot } from "@/app/components/Slots/ModSlotsContainer/ModSlot"
import { ModWithTexture } from "@/app/lib/api/fetchMods"
import { useEffect } from "react";

type ModSlotsContainerProps = {
    isSidebarOpen: boolean;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
    selectedSlot: string | null;
    setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
    selectedButton: string | null;
    selectedBuildType: string | null;
    selectedMod: ModWithTexture | null;
    assignedMods: Record<string, ModWithTexture | null>;
    setAssignedMods: React.Dispatch<React.SetStateAction<Record<string, ModWithTexture | null>>>;
}

export function ModSlotsContainer({ isSidebarOpen, setSelectedButton, selectedSlot, setSelectedSlot, selectedButton, selectedBuildType, selectedMod, assignedMods, setAssignedMods }: ModSlotsContainerProps) {
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
                    <ModSlot id="aura" type="AURA" setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} assignedMod={assignedMods['aura']} setAssignedMods={setAssignedMods} />
                )}

                {selectedBuildType === "Melee" && (
                    <ModSlot id="stance" type="STANCE" setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} assignedMod={assignedMods['stance']} setAssignedMods={setAssignedMods} />
                )}

                <ModSlot id="exilus" type="UTILITY" setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} assignedMod={assignedMods['exilus']} setAssignedMods={setAssignedMods} />
            </div>
            <div className={`grid ${isSidebarOpen ? "grid-cols-3" : "grid-cols-4"} gap-2`}>
                {Array.from({ length: 8 }, (_, i) => (
                    <ModSlot id={`mod${i}`} key={i} type="Mod" setSelectedButton={setSelectedButton} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedButton={selectedButton} assignedMod={assignedMods[`mod${i}`]} setAssignedMods={setAssignedMods} />
                ))}
            </div>
        </div>
    )
}