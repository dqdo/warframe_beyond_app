import { ArcaneSlot } from "@/app/components/Slots/ArcaneSlotsContainer/ArcaneSlot";

type ArcaneSlotsContainerProps = {
    isSidebarOpen: boolean;
    setSelectedButton: React.Dispatch<React.SetStateAction<string | null>>;
}

export function ArcaneSlotsContainer({ isSidebarOpen, setSelectedButton }: ArcaneSlotsContainerProps) {
    return (
        <>
            <div className={`${isSidebarOpen ? "-translate-x-0" : "translate-x-0"}`}>
                <div className="flex justify-center gap-2 mt-5">
                    <ArcaneSlot setSelectedButton={setSelectedButton} />
                    <ArcaneSlot setSelectedButton={setSelectedButton} />
                </div>
            </div>

        </>
    )
}