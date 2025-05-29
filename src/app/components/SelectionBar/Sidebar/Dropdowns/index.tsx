'use client';

import Dropdown from "@/app/components/Elements/Dropdown";
import { useState } from "react";
import Image from "next/image";

const arrowIcon = <Image src="/images/misc/down-arrow-svgrepo-com.svg" alt="arrow" width={12} height={12} className="h-3 w-3" />;

const colorOptions = [
    { label: 'All', value: 'all' },
    { label: 'Crimson', value: 'crimson', icon: <Image src="/images/archon_shards/crimson_shard.png" alt="crimson" width={12} height={12} className="h-3 w-3" /> },
    { label: 'Amber', value: 'amber', icon: <Image src="/images/archon_shards/amber_shard.png" alt="amber" width={12} height={12} className="h-3 w-3" /> },
    { label: 'Azure', value: 'azure', icon: <Image src="/images/archon_shards/azure_shard.png" alt="azure" width={12} height={12} className="h-3 w-3" /> },
];

const archonTypes = [
    { label: 'All', value: 'all' },
    { label: 'Normal', value: 'normal' },
    { label: 'Tauforged', value: 'tauforged' },
];

const rarityOptions = [
    { label: 'All', value: 'all' },
    { label: 'Common', value: 'common', icon: <Image src="/images/arcanes/rarity/arcane_common.png" alt="common" width={12} height={12} className="h-3 w-3" /> },
    { label: 'Uncommon', value: 'uncommon', icon: <Image src="/images/arcanes/rarity/arcane_uncommon.png" alt="uncommon" width={12} height={12} className="h-3 w-3" /> },
    { label: 'Rare', value: 'rare', icon: <Image src="/images/arcanes/rarity/arcane_rare.png" alt="rare" width={12} height={12} className="h-3 w-3" /> },
    { label: 'Legendary', value: 'legendary', icon: <Image src="/images/arcanes/rarity/arcane_legendary.png" alt="legendary" width={12} height={12} className="h-3 w-3" /> },
];

const polarityOptions = [
    { label: 'All', value: 'all' },
    { label: 'Madurai', value: 'madurai', icon: <Image src="/images/mods/polarities/madurai_symbol.png" alt="madurai" width={12} height={12} className="h-3 w-3" /> },
    { label: 'Vazarin', value: 'vazarin', icon: <Image src="/images/mods/polarities/vazarin_symbol.png" alt="vazarin" width={12} height={12} className="h-3 w-3" /> },
    { label: 'Naramon', value: 'naramon', icon: <Image src="/images/mods/polarities/naramon_symbol.png" alt="naramon" width={12} height={12} className="h-3 w-3" /> },
    { label: 'Zenurik', value: 'zenurik', icon: <Image src="/images/mods/polarities/zenurik_symbol.png" alt="zenurik" width={12} height={12} className="h-3 w-3" /> },
    { label: 'Penjaga', value: 'penjaga', icon: <Image src="/images/mods/polarities/penjaga_symbol.png" alt="penjaga" width={12} height={12} className="h-3 w-3" /> },
    { label: 'Unariu', value: 'unariu', icon: <Image src="/images/mods/polarities/unairu_symbol.png" alt="unariu" width={12} height={12} className="h-3 w-3" /> },
    { label: 'Umbra', value: 'umbra', icon: <Image src="/images/mods/polarities/umbra_symbol.png" alt="umbra" width={12} height={12} className="h-3 w-3" /> },
];

const modTypeOptions = [
    { label: 'Mods', value: 'mods' },
    { label: 'Aura', value: 'aura' },
    { label: 'Exilus', value: 'exilus' },
    { label: 'Stance', value: 'stance' },
];

const gameModeOptions = [
    { label: 'PVE', value: 'pve' },
    { label: 'Conclave', value: 'conclave' },
];

const sortOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Drain', value: 'drain' },
    { label: 'Max Rank', value: 'rank' },
];

export function ArchonShardDropdowns() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <div className="flex gap-3">
            <Dropdown label="All" options={colorOptions} header="Color 1" labelIcon={arrowIcon} isOpen={openDropdown === 'color1'} onToggleOpen={(open) => setOpenDropdown(open ? 'color1' : null)} />
            <Dropdown label="All" options={colorOptions} header="Color 2" labelIcon={arrowIcon} isOpen={openDropdown === 'color2'} onToggleOpen={(open) => setOpenDropdown(open ? 'color2' : null)} />
            <Dropdown label="All" options={archonTypes} header="Type" labelIcon={arrowIcon} isOpen={openDropdown === 'type'} onToggleOpen={(open) => setOpenDropdown(open ? 'type' : null)} />
        </div>
    );
}

export function ArcanesDropdowns() {
    return (
        <div className="flex gap-3">
            <Dropdown label="All" options={rarityOptions} header="Rarity" labelIcon={arrowIcon} />
        </div>
    );
}

export function ModsDropdowns() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <div className="flex gap-3">
            <Dropdown label="All" options={polarityOptions} header="Polarity" labelIcon={arrowIcon} isOpen={openDropdown === 'polarity'} onToggleOpen={(open) => setOpenDropdown(open ? 'polarity' : null)} />
            <Dropdown label="Mods" options={modTypeOptions} header="Type" labelIcon={arrowIcon} isOpen={openDropdown === 'type'} onToggleOpen={(open) => setOpenDropdown(open ? 'type' : null)} />
            <Dropdown label="All" options={rarityOptions} header="Rarity" labelIcon={arrowIcon} isOpen={openDropdown === 'rarity'} onToggleOpen={(open) => setOpenDropdown(open ? 'rarity' : null)} />
            <Dropdown label="PVE" options={gameModeOptions} header="Game Mode" labelIcon={arrowIcon} isOpen={openDropdown === 'gameMode'} onToggleOpen={(open) => setOpenDropdown(open ? 'gameMode' : null)} />
            <Dropdown label="Name" options={sortOptions} header="Sort" labelIcon={arrowIcon} isOpen={openDropdown === 'sort'} onToggleOpen={(open) => setOpenDropdown(open ? 'sort' : null)} />
        </div>
    );
}
