import Dropdown from "@/app/components/Elements/Dropdown";
import Image from "next/image";

const buildOptions = [
    { label: 'Warframe', value: 'warframe' },
    { label: 'Primary Weapon', value: 'primary' },
    { label: 'Secondary Weapon', value: 'secondary' },
    { label: 'Melee Weapon', value: 'melee' },
];

const arrowIcon = <Image src="/images/misc/down-arrow-svgrepo-com.svg" alt="arrow" width={12} height={12} className="h-3 w-3" />;

type BuildTypeSelectProps = {
    onSelect?: (val: string | null) => void;
}

export function BuildTypeSelect({ onSelect }: BuildTypeSelectProps) {
    return (
        <div className="flex gap-3">
            <Dropdown label="Select" options={buildOptions} header="Build Type:" labelIcon={arrowIcon} styleVariant="buildSection" onSelect={(option) => onSelect?.(option.value)} />
        </div>
    );
}