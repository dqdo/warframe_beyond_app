import Image from "next/image"
import Dropdown from "@/app/components/Elements/Dropdown"

type ModSlotProps = {
    type: string;
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



export function ModSlot({ type }: ModSlotProps) {
    return (
        <>
            <div className="flex flex-col items-center">
                <div className="">
                    <Dropdown label="---" labelIcon={arrowIcon} options={polarityOptions} styleVariant="modSlot" />
                </div>
                <div className="relative">
                    <Image src={"/images/mods/mod_slot.png"} alt="Mod Slot" height={200} width={200} />

                    {type === "UTLITY" && (
                        <Image src={"/images/mods/IconUtility.png"} alt="Exilus Slot" height={60} width={60} className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    )}

                    {type === "AURA" && (
                        <Image src={"/images/mods/IconAura.png"} alt="Aura Slot" height={60} width={60} className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    )}
                </div>
            </div>
        </>
    )
}