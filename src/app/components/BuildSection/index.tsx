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

export function BuildSection() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBuildType, setSelectedBuildType] = useState<string | null>(null);
    const [query, setQuery] = useState('');

    return (
        <>
            <div className={`fixed left-0 h-[90vh] text-white bg-[#141414] border-r border-b border-white border-t-0 border-l-0 w-full sm:w-[30vw] md:w-[30vw] lg:w-[20vw] overflow-y-auto`}>
                <BuildResources onBuildTypeSelect={(type) => { setSelectedBuildType(type); setQuery(''); }} />

                {selectedBuildType && (
                    <div className="flex justify-center mb-3">
                        <Button text={`Select a ${selectedBuildType}`} variant="selectBuild" onClick={() => { setModalOpen(true); setQuery('') }} />
                    </div>
                )}

                {selectedBuildType == "Warframe" && (
                    <div className="relative z-1">
                        <WarframeAbilitiesViewer />
                    </div>
                )}

                <ItemRankProgress />
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div className="flex flex-col h-179">
                    <div className="flex items-center justify-center">
                        <SearchBar onSearch={setQuery} variant="buildSelect" />
                    </div>
                    <hr className="w-full border-white mt-1" />
                    <div className={`overflow-auto ${BuildSectionStyles['scrollbar-custom']}`}>
                        <WarframesViewer selectedBuildType={selectedBuildType} query={query} />
                        <WeaponsViewer selectedBuildType={selectedBuildType} query={query} />
                    </div>
                </div>
            </Modal>

        </>

    )
}