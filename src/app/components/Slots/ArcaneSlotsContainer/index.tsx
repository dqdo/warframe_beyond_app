import { ArcaneSlot } from "@/app/components/Slots/ArcaneSlotsContainer/ArcaneSlot";

type ArcaneSlotsContainerProps = {
    isSidebarOpen: boolean;
}

export function ArcaneSlotsContainer({ isSidebarOpen }: ArcaneSlotsContainerProps) {
    return (
        <>
            <div className={`${isSidebarOpen ? "-translate-x-0" : "translate-x-0"}`}>
                <div className="flex justify-center gap-2 mt-5">
                    <ArcaneSlot />
                    <ArcaneSlot />
                </div>
            </div>

        </>
    )
}