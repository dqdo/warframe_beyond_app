import Image from "next/image";
import Dropdown from "@/app/components/Elements/Dropdown";
import { useEffect, useRef, useState } from "react";
import { ModWithTexture } from "@/app/lib/api/fetchMods";
import { ModCard } from "@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard";
import Button from "@/app/components/Elements/Button";
import { ModRank } from "@/app/components/Slots/ModSlotsContainer/ModSlot/ModRank";

type ModSlotProps = {
    id: string;
    type: string;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
    selectedSlot: string | null;
    setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
    selectedButton: string | null;
    assignedMod: ModWithTexture | null;
    setAssignedMods: React.Dispatch<React.SetStateAction<Record<string, ModWithTexture | null>>>;
};

const arrowIcon = <Image src="/images/misc/down-arrow-svgrepo-com.svg" alt="arrow" width={12} height={12} className="h-3 w-3" />;

const polarityOptions = [
    { label: '---', value: '' },
    { label: ' ', value: 'AP_ATTACK', icon: <Image src="/images/mods/polarities/madurai_symbol.png" alt="madurai" width={12} height={12} className="h-3 w-3" /> },
    { label: ' ', value: 'AP_DEFENSE', icon: <Image src="/images/mods/polarities/vazarin_symbol.png" alt="vazarin" width={12} height={12} className="h-3 w-3" /> },
    { label: ' ', value: 'AP_TACTIC', icon: <Image src="/images/mods/polarities/naramon_symbol.png" alt="naramon" width={12} height={12} className="h-3 w-3" /> },
    { label: ' ', value: 'AP_POWER', icon: <Image src="/images/mods/polarities/zenurik_symbol.png" alt="zenurik" width={12} height={12} className="h-3 w-3" /> },
    { label: ' ', value: 'AP_PRECEPT', icon: <Image src="/images/mods/polarities/penjaga_symbol.png" alt="penjaga" width={12} height={12} className="h-3 w-3" /> },
    { label: ' ', value: 'AP_WARD', icon: <Image src="/images/mods/polarities/unairu_symbol.png" alt="unariu" width={12} height={12} className="h-3 w-3" /> },
    { label: ' ', value: 'AP_UMBRA', icon: <Image src="/images/mods/polarities/umbra_symbol.png" alt="umbra" width={12} height={12} className="h-3 w-3" /> },
    { label: ' ', value: 'AP_ANY', icon: <Image src="/images/mods/polarities/any_polarity.svg" alt="any" width={12} height={12} className="h-3 w-3 invert" /> },
];

export function ModSlot({ type, setSelectedButton, id, selectedSlot, setSelectedSlot, selectedButton, assignedMod, setAssignedMods }: ModSlotProps) {
    const isSelected = selectedSlot === id;
    const [hover, setHover] = useState(false);
    const slotRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const lastMouseX = useRef(0);
    const lastMouseY = useRef(0);
    const [currentModRank, setCurrentModRank] = useState<number | null>(assignedMod ? assignedMod.fusionLimit : null);


    useEffect(() => {
        if (assignedMod) {
            setCurrentModRank(assignedMod.fusionLimit);
        } else {
            setCurrentModRank(null);
            setHover(false);
        }
    }, [assignedMod]);

    const checkHoverState = () => {
        if (!slotRef.current) return;

        const rect = slotRef.current.getBoundingClientRect();
        const isMouseOver = (
            lastMouseX.current >= rect.left &&
            lastMouseX.current <= rect.right &&
            lastMouseY.current >= rect.top &&
            lastMouseY.current <= rect.bottom
        );

        setHover(isMouseOver);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            lastMouseX.current = e.clientX;
            lastMouseY.current = e.clientY;

            if (slotRef.current) {
                const rect = slotRef.current.getBoundingClientRect();
                const isHovering = (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                );
                setHover(isHovering);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const handleDragEnd = () => {
            isDraggingRef.current = false;
            checkHoverState();
            document.dispatchEvent(new MouseEvent('mousemove', {
                clientX: lastMouseX.current,
                clientY: lastMouseY.current
            }));
        };

        document.addEventListener('dragend', handleDragEnd);
        return () => document.removeEventListener('dragend', handleDragEnd);
    }, []);

    const handleClick = () => {
        setSelectedButton("mods");
        setSelectedSlot(id);
        if (isSelected) {
            setSelectedSlot(null);
        }
    };

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (assignedMod) {
            setAssignedMods(prev => ({
                ...prev,
                [id]: null
            }));
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        isDraggingRef.current = true;

        const data = e.dataTransfer.getData("application/json");

        try {
            const parsed = JSON.parse(data);
            const mod: ModWithTexture = parsed.mod || parsed;
            const fromSlotId: string | undefined = parsed.fromSlotId;

            setAssignedMods((prev) => {
                const newAssignedMods = { ...prev };
                const targetSlotMod = newAssignedMods[id];

                if (fromSlotId && fromSlotId !== id) {
                    if (targetSlotMod) {
                        newAssignedMods[fromSlotId] = targetSlotMod;
                    } else {
                        newAssignedMods[fromSlotId] = null;
                    }
                }

                newAssignedMods[id] = mod;

                return newAssignedMods;
            });

            lastMouseX.current = e.clientX;
            lastMouseY.current = e.clientY;
            checkHoverState();

            setTimeout(() => {
                document.dispatchEvent(new MouseEvent('mousemove', {
                    clientX: e.clientX,
                    clientY: e.clientY
                }));
            }, 10);
        } catch (err) {
            console.error("Invalid drop data", err);
        }
    };

    const slotClasses = assignedMod ? "relative cursor-default" : `relative cursor-pointer 
    ${selectedButton !== null && isSelected ? "opacity-100 brightness-200" : hover ? "brightness-200 opacity-50" : "opacity-40"}`;

    return (
        <>
            <div className="relative flex flex-col items-center">
                <div className="relative flex">
                    {assignedMod && (
                        <div className="absolute right-[5vw] translate-y-1/2">
                            <Button text="✖" variant="removeMod" onClick={() => {
                                setAssignedMods((prev) => ({
                                    ...prev,
                                    [id]: null,
                                }));
                            }} />
                        </div>
                    )}
                    <div className="">
                        <Dropdown label="---" labelIcon={arrowIcon} options={polarityOptions} styleVariant="modSlot" />
                    </div>

                </div>
                <div className={`relative`} ref={slotRef}>
                    <div className={`h-[11vh] w-auto relative cursor-pointer ${slotClasses}`}
                        onClick={handleClick}
                        onContextMenu={handleRightClick}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >

                        <div className="relative select-none flex flex-col items-center h-[5.5vw] w-[10vw]">
                            {assignedMod ? (
                                <div className="w-full h-full">
                                    <div draggable
                                        onDragStart={(e) => {
                                            e.dataTransfer.setData("application/json", JSON.stringify({ mod: assignedMod, fromSlotId: id }));
                                        }}
                                        className="cursor-grab"
                                    >
                                        <ModCard mod={assignedMod} />
                                    </div>
                                    <div className="absolute top-[100%] mt-[0.3vw] left-1/2 -translate-x-1/2">
                                        {currentModRank != null && (
                                            <ModRank currentModRank={currentModRank} fusionLimit={assignedMod.fusionLimit} setCurrentModRank={setCurrentModRank} />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="h-auto w-auto">
                                    <Image src="/images/mods/mod_slot.png" alt="Mod Slot" height={200} width={200} />
                                    {assignedMod == null && (
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            {type === "UTILITY" && (
                                                <Image src={"/images/mods/IconUtility.png"} alt="Exilus Slot" height={60} width={60} />
                                            )}

                                            {type === "STANCE" && (
                                                <Image src={"/images/mods/IconStance.png"} alt="Stance Slot" height={60} width={60} />
                                            )}

                                            {type === "AURA" && (
                                                <Image src={"/images/mods/IconAura.png"} alt="Aura Slot" height={60} width={60} />
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}