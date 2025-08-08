import { BuildTypeSelect } from "@/app/components/BuildSection/BuildResources/BuildTypeSelect"
import { ResourceCount } from "@/app/components/BuildSection/BuildResources/ResourceCount"

type BuildResourcesProps = {
    onBuildTypeSelect: (val: string | null) => void;
    selectedBuildType: string | null;
};

export function BuildResources({ onBuildTypeSelect, selectedBuildType}: BuildResourcesProps) {
    return (
        <div className="m-2 flex">
            <BuildTypeSelect onSelect={onBuildTypeSelect} selectedBuildType={selectedBuildType} />
            <ResourceCount />
        </div>
    );
}