import { BuildResources } from "@/app/components/BuildSection/BuildResources"

export function BuildSection() {
    return (
        <>
            <div className={`fixed left-0 h-[90vh] text-white bg-[#141414] border-r border-b border-white border-t-0 border-l-0 w-full sm:w-[30vw] md:w-[30vw] lg:w-[20vw] overflow-y-auto`}>
                <BuildResources />
            </div>

        </>

    )
}