import { BuildResources } from "@/app/components/BuildSection/BuildResources"
import { ItemRankProgress } from "@/app/components/BuildSection/ItemRankProgress"
import Button from "@/app/components/Elements/Button"
import { Modal } from "@/app/components/Elements/Modal"
import { useState } from "react";
import SearchBar from "@/app/components/Elements/SearchBar"

export function BuildSection() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <div className={`fixed left-0 h-[90vh] text-white bg-[#141414] border-r border-b border-white border-t-0 border-l-0 w-full sm:w-[30vw] md:w-[30vw] lg:w-[20vw] overflow-y-auto`}>
                <BuildResources />
                <div className="flex justify-center mb-3">
                    <Button text={"Select A New Build: "} variant="selectBuild" onClick={() => setModalOpen(true)} />
                </div>
                <ItemRankProgress />
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div className="items-center justify-center flex">
                    <SearchBar onSearch={(q) => console.log(q)} variant="buildSelect" />
                </div>
            </Modal>

        </>

    )
}