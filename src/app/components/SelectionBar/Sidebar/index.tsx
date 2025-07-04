import { useState } from "react";
import { ModsDropdowns, ArcanesDropdowns, ArchonShardDropdowns } from "@/app/components/SelectionBar/Sidebar/Dropdowns";
import SearchBar from "@/app/components/Elements/SearchBar";
import ModsViewer from '@/app/components/SelectionBar/Sidebar/ModsViewer';
import ArcanesViewer from "@/app/components/SelectionBar/Sidebar/ArcanesViewer";
import SidebarStyles from '@/app/components/SelectionBar/Sidebar/Sidebar.module.css'

type SidebarProps = {
    type: string;
    isOpen: boolean;
};

export default function Sidebar({ type, isOpen }: SidebarProps) {
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState<{
        polarity?: string | null;
        rarity?: string | null;
        type?: string | null;
    }>({});

    const updateFilter = (key: keyof typeof filters, value: string | null) => {
        setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    };

    const getPlaceholder = () => {
        switch (type) {
            case "mods":
                return "Search for Mods";
            case "arcanes":
                return "Search for Arcanes";
            case "archon":
                return "Search for Archon Shards";
            default:
                return "Search...";
        }
    };

    const dropdowns = () => {
        switch (type) {
            case "mods":
                return <ModsDropdowns onPolarityChange={(val) => updateFilter("polarity", val)} onRarityChange={(val) => updateFilter("rarity", val)} onTypeChange={(val) => updateFilter("type", val)} />;
            case "arcanes":
                return <ArcanesDropdowns onRarityChange={(val) => updateFilter("rarity", val)} />;
            case "archon":
                return <ArchonShardDropdowns />;
            default:
                return null;
        }
    };

    return (
        <div
            className={`fixed right-0 h-[90vh] text-white bg-neutral-900 border-l border-b border-white border-t-0 border-r-0 transform transition-transform duration-400 ease-in-out
        w-full sm:w-[25vw] md:w-[30vw] lg:w-[35vw] overflow-hidden flex flex-col
        ${SidebarStyles['scrollbar-custom']} ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="flex flex-col items-center">
                <SearchBar onSearch={setQuery} placeholder={getPlaceholder()} />
                {dropdowns()}
            </div>

            <div className="overflow-y-auto mt-5">
                {type === "mods" && <ModsViewer query={query} filters={filters} />}
                {type === "arcanes" && <ArcanesViewer query={query} filters={filters} />}
            </div>
        </div>
    );
}
