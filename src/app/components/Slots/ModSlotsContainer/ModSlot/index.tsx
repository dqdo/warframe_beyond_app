import Image from "next/image"
import Dropdown from "@/app/components/Elements/Dropdown"
import { useState } from "react";
import { ModWithTexture } from "@/app/lib/api/fetchMods";
import { ModCard } from "@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard";

type ModSlotProps = {
    id: string;
    type: string;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
    selectedSlot: string | null;
    setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
    selectedButton: string | null;
    assignedMod: ModWithTexture | null;
}

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



export function ModSlot({ type, setSelectedButton, id, selectedSlot, setSelectedSlot, selectedButton, assignedMod }: ModSlotProps) {
    const isSelected = selectedSlot === id;
    const [hover, setHover] = useState(false);

    const handleClick = () => {
        setSelectedButton("mods")
        setSelectedSlot(id)
    }

    const slotClasses = assignedMod ? "relative cursor-default" : `relative cursor-pointer 
    ${selectedButton !== null && isSelected ? "opacity-100 brightness-200" : hover ? "brightness-200 opacity-50" : "opacity-40"}`;

    return (
        <>
            <div className="relative flex flex-col items-center">
                <div className="relative">
                    <Dropdown label="---" labelIcon={arrowIcon} options={polarityOptions} styleVariant="modSlot" />
                </div>
                <div className={`relative`}>
                    <div className={`h-[11vh] w-auto relative cursor-pointer ${slotClasses}`}
                        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={handleClick}>

                        <div className="relative select-none flex flex-col items-center h-[5.5vw] w-[10vw]">
                            {assignedMod ? (
                                <ModCard mod={assignedMod} />
                            ) : (
                                <div className="h-auto w-auto">
                                    <Image src="/images/mods/mod_slot.png" alt="Mod Slot" height={200} width={200} />
                                    {assignedMod == null && (
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            {type === "UTLITY" && (
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