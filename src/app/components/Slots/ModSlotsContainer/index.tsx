import { ModSlot } from "@/app/components/Slots/ModSlotsContainer/ModSlot"
import { useEffect, useState } from "react";
import { ModWithTexture } from "../../../../../pages/api/fetchMods";

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
    currentRanks: Record<string, number>;
    setCurrentRanks: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    slotPolarities: Record<string, string>;
    setSlotPolarities: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export function ModSlotsContainer({
    isSidebarOpen,
    setSelectedButton,
    selectedSlot,
    setSelectedSlot,
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
}: ModSlotsContainerProps) {
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

    const checkExilusCompatibility = (slotType: string | null, mod: ModWithTexture | null): boolean => {
        if (!mod) return true;

        const isExilusSlot = slotType === 'UTILITY';
        const isExilusMod = mod.isUtility;

        if (isExilusSlot && !isExilusMod) {
            setSelectedSlot(null);
            setSelectedMod(null);
            return false;
        }

        return true;
    };

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

            const auraCheck = checkAuraCompatibility(slotType, selectedMod);
            const exilusCheck = checkExilusCompatibility(slotType, selectedMod);

            if (auraCheck && exilusCheck) {
                setAssignedMods(prev => ({
                    ...prev,
                    [selectedSlot]: selectedMod,
                }));
            }

            setSelectedSlot(null);
        }
    }, [selectedMod, selectedSlot]);

    useEffect(() => {
        setSelectedSlot(null);
    }, [selectedBuildType]);

    return (
        <div className={`${isSidebarOpen ? "-translate-x-0" : "translate-x-0"}`}>
            <div className="flex justify-center gap-[40px]">
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
                        currentRanks={currentRanks}
                        setCurrentRanks={setCurrentRanks}
                        slotPolarities={slotPolarities}
                        setSlotPolarities={setSlotPolarities}
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
                        currentRanks={currentRanks}
                        setCurrentRanks={setCurrentRanks}
                        slotPolarities={slotPolarities}
                        setSlotPolarities={setSlotPolarities}
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
                    currentRanks={currentRanks}
                    setCurrentRanks={setCurrentRanks}
                    slotPolarities={slotPolarities}
                    setSlotPolarities={setSlotPolarities}
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
            <div className={`grid ${isSidebarOpen ? "lg:grid-cols-2 2xl:grid-cols-3" : "lg:grid-cols-3 2xl:grid-cols-4"} mt-[60px] gap-x-[10px] gap-y-[60px]`}>
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
                        currentRanks={currentRanks}
                        setCurrentRanks={setCurrentRanks}
                        slotPolarities={slotPolarities}
                        setSlotPolarities={setSlotPolarities}
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