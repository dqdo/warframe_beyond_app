import { BuildTypeSelect } from "@/app/components/BuildSection/BuildResources/BuildTypeSelect"
import { ResourceCount } from "@/app/components/BuildSection/BuildResources/ResourceCount"

type BuildResourcesProps = {
    onBuildTypeSelect: (val: string | null) => void;
};

export function BuildResources({ onBuildTypeSelect }: BuildResourcesProps) {
    return (
        <div className="m-2 flex">
            <BuildTypeSelect onSelect={onBuildTypeSelect} />
            <ResourceCount />
        </div>
    );
}