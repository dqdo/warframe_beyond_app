import { ModsDropdowns, ArcanesDropdowns, ArchonShardDropdowns } from "@/app/components/SelectionBar/Dropdowns";

type SidebarProps = {
    type: string;
    isOpen: boolean;
};

export default function Sidebar({ type, isOpen }: SidebarProps) {
    const dropdowns = () => {
        switch (type) {
            case "mods":
                return <ModsDropdowns />;
            case "arcanes":
                return <ArcanesDropdowns />;
            case "archon":
                return <ArchonShardDropdowns />;
            default:
                return null;
        }
    };
    return (
        <div
            className={`fixed right-0 h-[90vh] text-white bg-neutral-900 border-l border-b border-white border-t-0 border-r-0 transform transition-transform duration-400 ease-in-out
        w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] overflow-hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="p-1 flex flex-col items-center overflow-y-auto">{dropdowns()}</div>
        </div>

    );
}

