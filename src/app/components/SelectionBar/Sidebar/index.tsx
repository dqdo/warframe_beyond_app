type SidebarProps = {
    type: string;
    isOpen: boolean;
};

export default function Sidebar({ type, isOpen }: SidebarProps) {
    return (
        <div
            className={`fixed right-0 w-150 h-215 text-white bg-neutral-900 border-l border-b border-white border-t-0 border-r-0 transform transition-transform duration-400 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <h2 className="p-4 font-bold">{type}</h2>
        </div>
    );
}

