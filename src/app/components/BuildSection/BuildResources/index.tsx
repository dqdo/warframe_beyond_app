import { BuildTypeSelect } from "@/app/components/BuildSection/BuildResources/BuildTypeSelect"
import { ResourceCount } from "@/app/components/BuildSection/BuildResources/ResourceCount"

export function BuildResources() {
    return (
        <>
            <div className="m-2 flex">
                <BuildTypeSelect />
                <ResourceCount />
            </div>
        </>
    )
}