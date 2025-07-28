import { ArcaneSlot } from "@/app/components/Slots/ArcaneSlotsContainer/ArcaneSlot";

type ArcaneSlotsContainerProps = {
    isSidebarOpen: boolean;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
    selectedSlot: string | null;
    setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
    selectedButton: string | null;
    selectedBuildType: string | null;
}

export function ArcaneSlotsContainer({ isSidebarOpen, setSelectedButton, selectedSlot, setSelectedSlot, selectedButton, selectedBuildType }: ArcaneSlotsContainerProps) {
    return (
        <>
            <div className={`${isSidebarOpen ? "-translate-x-0" : "translate-x-0"}`}>
                <div className="flex justify-center gap-2 mt-[2.5vw]">
                    <ArcaneSlot id="arcane1" setSelectedButton={setSelectedButton} setSelectedSlot={setSelectedSlot} selectedSlot={selectedSlot} selectedButton={selectedButton} />
                    {selectedBuildType == "Warframe" && (
                        <ArcaneSlot id="arcane2" setSelectedButton={setSelectedButton} setSelectedSlot={setSelectedSlot} selectedSlot={selectedSlot} selectedButton={selectedButton} />
                    )}
                </div>
            </div>

        </>
    )
}