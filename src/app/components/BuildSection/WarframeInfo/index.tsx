import { WarframeWithTexture } from "@/app/lib/api/fetchWarframes";
type WarframeInfoProps = {
    warframe: WarframeWithTexture;
}

export function WarframeInfo({ warframe }: WarframeInfoProps) {
    return (
        <>
            <div className="m-2 text-sm text-white">
                <div><strong>Energy:</strong> {warframe.power}</div>
                <div><strong>Health:</strong> {warframe.health}</div>
                <div><strong>Shield:</strong> {warframe.shield}</div>
                <div><strong>Armor:</strong> {warframe.armor}</div>
                <div><strong>Sprint Speed:</strong> {warframe.sprintSpeed}</div>
            </div>
        </>
    )
}