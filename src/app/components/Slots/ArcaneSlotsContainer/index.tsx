import { ArcaneSlot } from "@/app/components/Slots/ArcaneSlotsContainer/ArcaneSlot";

type ArcaneSlotsContainerProps = {
    isSidebarOpen: boolean;
}

export function ArcaneSlotsContainer({ isSidebarOpen }: ArcaneSlotsContainerProps) {
    return (
        <>
            <div className={`flex justify-center gap-2 mt-5 ${isSidebarOpen ? "-translate-x-10" : "translate-x-0"}`}>
                <ArcaneSlot />
                <ArcaneSlot />
            </div>
        </>
    )
}