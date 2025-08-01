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
    setSelectedMod: React.Dispatch<React.SetStateAction<ModWithTexture | null>>;
    assignedMods: Record<string, ModWithTexture | null>;
    setAssignedMods: React.Dispatch<React.SetStateAction<Record<string, ModWithTexture | null>>>;
    setTotalDrain: React.Dispatch<React.SetStateAction<number>>;
    calculatedDrains: Record<string, number>;
    setCalculatedDrains: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export function ModSlotsContainer({ isSidebarOpen, setSelectedButton, selectedSlot, setSelectedSlot, selectedButton, selectedBuildType, selectedMod, assignedMods, setAssignedMods, setTotalDrain, setSelectedMod, calculatedDrains, setCalculatedDrains }: ModSlotsContainerProps) {
    const [polarityMatches, setPolarityMatches] = useState<Record<string, boolean | null>>({});

    useEffect(() => {
        const calculateTotalDrain = () => {
            const total = Object.values(calculatedDrains).reduce(
                (sum, drain) => sum + drain,
                0
            );
            setTotalDrain(total);
        };

        calculateTotalDrain();
    }, [calculatedDrains, polarityMatches]);

    const checkAuraCompatibility = (slotType: string | null, mod: ModWithTexture | null): boolean => {
        if (!mod) return true;

        const isAuraSlot = slotType === 'AURA';
        const isAuraMod = mod.compatName === 'AURA' || mod.type === 'AURA';

        if (isAuraSlot && !isAuraMod) {
            setSelectedSlot(null);
            setSelectedMod(null);
            return false;
        }

        if (!isAuraSlot && isAuraMod) {
            setSelectedSlot(null);
            setSelectedMod(null);
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (selectedMod && selectedSlot) {
            let slotType = 'Mod';
            if (selectedSlot === 'aura') slotType = 'AURA';
            if (selectedSlot === 'stance') slotType = 'STANCE';
            if (selectedSlot === 'exilus') slotType = 'UTILITY';

            if (checkAuraCompatibility(slotType, selectedMod)) {
                setAssignedMods(prev => ({
                    ...prev,
                    [selectedSlot]: selectedMod,
                }));
            }
            setSelectedSlot(null);
        }
    }, [selectedMod, selectedSlot]);

    useEffect(() => {
        setAssignedMods({});
        setSelectedSlot(null);
    }, [selectedBuildType]);

    return (
        <div className={`${isSidebarOpen ? "-translate-x-0" : "translate-x-0"}`}>
            <div className="flex justify-center gap-[1.5vw]">
                {selectedBuildType === "Warframe" && (
                    <ModSlot
                        id="aura"
                        type="AURA"
                        setSelectedButton={setSelectedButton}
                        selectedSlot={selectedSlot}
                        setSelectedSlot={setSelectedSlot}
                        selectedButton={selectedButton}
                        assignedMod={assignedMods['aura']}
                        setAssignedMods={setAssignedMods}
                        setPolarityMatch={(slotId, match) => {
                            setPolarityMatches(prev => ({
                                ...prev,
                                [slotId]: match,
                            }))
                        }}
                        setCalculatedDrains={(slotId, drain) => {
                            setCalculatedDrains(prev => ({
                                ...prev,
                                [slotId]: drain,
                            }))
                        }}
                    />
                )}

                {selectedBuildType === "Melee" && (
                    <ModSlot
                        id="stance"
                        type="STANCE"
                        setSelectedButton={setSelectedButton}
                        selectedSlot={selectedSlot}
                        setSelectedSlot={setSelectedSlot}
                        selectedButton={selectedButton}
                        assignedMod={assignedMods['stance']}
                        setAssignedMods={setAssignedMods}
                        setPolarityMatch={(slotId, match) => {
                            setPolarityMatches(prev => ({
                                ...prev,
                                [slotId]: match,
                            }))
                        }}
                        setCalculatedDrains={(slotId, drain) => {
                            setCalculatedDrains(prev => ({
                                ...prev,
                                [slotId]: drain,
                            }))
                        }}
                    />
                )}

                <ModSlot
                    id="exilus"
                    type="UTILITY"
                    setSelectedButton={setSelectedButton}
                    selectedSlot={selectedSlot}
                    setSelectedSlot={setSelectedSlot}
                    selectedButton={selectedButton}
                    assignedMod={assignedMods['exilus']}
                    setAssignedMods={setAssignedMods}
                    setPolarityMatch={(slotId, match) => {
                        setPolarityMatches(prev => ({
                            ...prev,
                            [slotId]: match,
                        }))
                    }}
                    setCalculatedDrains={(slotId, drain) => {
                        setCalculatedDrains(prev => ({
                            ...prev,
                            [slotId]: drain,
                        }))
                    }}
                />
            </div>
            <div className={`grid ${isSidebarOpen ? "grid-cols-3" : "grid-cols-4"} mt-[2.5vw] gap-x-[1vw] gap-y-[2.5vw]`}>
                {Array.from({ length: 8 }, (_, i) => (
                    <ModSlot
                        id={`mod${i}`}
                        key={i}
                        type="Mod"
                        setSelectedButton={setSelectedButton}
                        selectedSlot={selectedSlot}
                        setSelectedSlot={setSelectedSlot}
                        selectedButton={selectedButton}
                        assignedMod={assignedMods[`mod${i}`]}
                        setAssignedMods={setAssignedMods}
                        setPolarityMatch={(slotId, match) => {
                            setPolarityMatches(prev => ({
                                ...prev,
                                [slotId]: match,
                            }))
                        }}
                        setCalculatedDrains={(slotId, drain) => {
                            setCalculatedDrains(prev => ({
                                ...prev,
                                [slotId]: drain,
                            }))
                        }}
                    />
                ))}
            </div>
        </div>
    )
}