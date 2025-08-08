import Dropdown from "@/app/components/Elements/Dropdown";
import Image from "next/image";

const buildOptions = [
    { label: 'Warframe', value: 'Warframe' },
    { label: 'Primary Weapon', value: 'Primary' },
    { label: 'Secondary Weapon', value: 'Secondary' },
    { label: 'Melee Weapon', value: 'Melee' },
];

const arrowIcon = <Image src="/images/misc/down-arrow-svgrepo-com.svg" alt="arrow" width={12} height={12} className="h-3 w-3" />;

type BuildTypeSelectProps = {
    onSelect?: (val: string | null) => void;
    selectedBuildType: string | null;
}

export function BuildTypeSelect({ onSelect, selectedBuildType }: BuildTypeSelectProps) {
    const initialOption = buildOptions.find(option => option.label === selectedBuildType);
  
    return (
        <div className="flex gap-3">
            <Dropdown label="Select" options={buildOptions} header="Build Type:" labelIcon={arrowIcon} styleVariant="buildSection" onSelect={(option) => onSelect?.(option.value)} initialOption={initialOption} />
        </div>
    );
}