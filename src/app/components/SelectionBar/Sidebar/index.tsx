import { useState } from "react";
import { ModsDropdowns, ArcanesDropdowns, ArchonShardDropdowns } from "@/app/components/SelectionBar/Sidebar/Dropdowns";
import SearchBar from "@/app/components/Elements/SearchBar";
import ModsViewer from '@/app/components/SelectionBar/Sidebar/ModsViewer';
import ArcanesViewer from "@/app/components/SelectionBar/Sidebar/ArcanesViewer";
import SidebarStyles from '@/app/components/SelectionBar/Sidebar/Sidebar.module.css';
import SlidingButton from "@/app/components/Elements/SlidingButton";
import { ModWithTexture } from "@/app/lib/api/fetchMods";
import { WarframeWithTexture } from "@/app/lib/api/fetchWarframes";
import { WeaponWithTexture } from "@/app/lib/api/fetchWeapons";

type SidebarProps = {
    type: string;
    isOpen: boolean;
    selectedBuildType: string | null;
    setSelectedMod: (mod: ModWithTexture | null) => void;
    selectedMod: ModWithTexture | null;
    assignedMods: Record<string, ModWithTexture | null>;
    selectedWarframe: WarframeWithTexture | null;
    selectedWeapon: WeaponWithTexture | null;
};

export default function Sidebar({ type, isOpen, selectedBuildType, setSelectedMod, assignedMods, selectedMod, selectedWarframe, selectedWeapon }: SidebarProps) {
    const [query, setQuery] = useState('');
    const [expandAll, setExpandAll] = useState(false);
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
                <div className="w-full ml-10 mt-3 flex gap-3 justify-start">
                    {type === "mods" && <div className="flex gap-3"><SlidingButton isOn={expandAll} onToggle={setExpandAll} />Expand Mods</div>}
                </div>
            </div>

            {selectedBuildType && (
                <div className="overflow-y-auto mt-5 min-h-[70%] max-h-[85%]">
                    {(type === "mods" && (selectedWarframe || selectedWeapon)) && <ModsViewer query={query} filters={filters} expandAll={expandAll} selectedBuildType={selectedBuildType} setSelectedMod={setSelectedMod} assignedMods={assignedMods} selectedMod={selectedMod} selectedWarframe={selectedWarframe} />}
                    {type === "arcanes" && <ArcanesViewer query={query} filters={filters} />}
                </div>
            )}
        </div>
    );
}
