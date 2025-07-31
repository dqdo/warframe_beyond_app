import { BuildResources } from "@/app/components/BuildSection/BuildResources"
import { ItemRankProgress } from "@/app/components/BuildSection/ItemRankProgress"
import Button from "@/app/components/Elements/Button"
import { Modal } from "@/app/components/Elements/Modal"
import { useState } from "react";
import SearchBar from "@/app/components/Elements/SearchBar"
import WarframesViewer from "@/app/components/BuildSection/WarframesViewer"
import WeaponsViewer from "@/app/components/BuildSection/WeaponsViewer";
import BuildSectionStyles from "@/app/components/BuildSection/BuildSection.module.css"
import { WarframeAbilitiesViewer } from "@/app/components/BuildSection/WarframeAbilitiesViewer";
import { WarframeWithTexture } from "@/app/lib/api/fetchWarframes";
import { WeaponWithTexture } from "@/app/lib/api/fetchWeapons";
import Image from "next/image";
import { WarframeInfo } from "@/app/components/BuildSection/WarframeInfo";

type BuildSectionProps = {
    selectedBuildType: string | null;
    onBuildTypeSelect: (type: string | null) => void;
    totalDrain: number;
}

export function BuildSection({ selectedBuildType, onBuildTypeSelect, totalDrain }: BuildSectionProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedWarframe, setSelectedWarframe] = useState<WarframeWithTexture | null>(null);
    const [selectedWeapon, setSelectedWeapon] = useState<WeaponWithTexture | null>(null);

    return (
        <>
            <div className={`fixed left-0 h-[90vh] text-white bg-[#141414] border-r border-b border-white border-t-0 border-l-0 w-full sm:w-[30vw] md:w-[30vw] lg:w-[20vw] z-2`}>
                <BuildResources onBuildTypeSelect={(type) => { onBuildTypeSelect(type); setQuery(''); setSelectedWarframe(null); setSelectedWeapon(null); }} />

                {selectedBuildType && (
                    <div className="flex flex-col items-center gap-3 mb-3">

                        {selectedWarframe && selectedBuildType === "Warframe" && (
                            <div className="cursor-pointer" onClick={() => { setModalOpen(true); setQuery('') }}>
                                <div className="text-white text-sm items-center justify-center flex">{selectedWarframe.name}</div>
                                {selectedWarframe.textureUrl && (
                                    <Image src={selectedWarframe.textureUrl} alt={selectedWarframe.name} width={128} height={128} unoptimized loading="lazy" className="w-55 h-55" />
                                )}
                            </div>
                        )}

                        {selectedWeapon && selectedBuildType !== "Warframe" && (
                            <div className="cursor-pointer" onClick={() => { setModalOpen(true); setQuery('') }}>
                                <div className="text-white text-sm items-center justify-center flex">{selectedWeapon.name}</div>
                                {selectedWeapon.textureUrl && (
                                    <Image src={selectedWeapon.textureUrl} alt={selectedWeapon.name} width={128} height={128} unoptimized loading="lazy" className="w-55 h-55" />
                                )}
                            </div>
                        )}

                        {!selectedWarframe && !selectedWeapon && (
                            <Button text={`Select a ${selectedBuildType}`} variant="selectBuild" onClick={() => { setModalOpen(true); setQuery('') }} />
                        )}
                    </div>
                )}

                <div className="relative z-10">
                    {selectedBuildType === "Warframe" && selectedWarframe && (
                        <WarframeAbilitiesViewer warframe={selectedWarframe} />
                    )}
                </div>

                <ItemRankProgress totalDrain={totalDrain} />

                {selectedWarframe && selectedBuildType == "Warframe" && (
                    <WarframeInfo warframe={selectedWarframe} />
                )}
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div className="flex flex-col h-179">
                    <div className="flex items-center justify-center">
                        <SearchBar onSearch={setQuery} variant="buildSelect" />
                    </div>
                    <hr className="w-full border-white mt-1" />
                    <div className={`overflow-auto ${BuildSectionStyles['scrollbar-custom']}`}>
                        <WarframesViewer selectedBuildType={selectedBuildType} query={query} onSelect={(warframe) => {
                            setSelectedWarframe(warframe);
                            setModalOpen(false);
                        }} />
                        <WeaponsViewer selectedBuildType={selectedBuildType} query={query} onSelect={(weapon) => {
                            setSelectedWeapon(weapon);
                            setModalOpen(false);
                        }} />
                    </div>
                </div>
            </Modal>

        </>

    )
}