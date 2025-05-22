import Dropdown from "@/app/components/Elements/Dropdown"

const colorOptions = [
    { label: 'All', value: 'all'},
    { label: 'Crimson', value: 'crimson', icon: <img src="/images/archon_shards/crimson_shard.png" className="h-3 w-3"/>},
    { label: 'Amber', value: 'amber', icon: <img src="/images/archon_shards/amber_shard.png" className="h-3 w-3"/>},
    { label: 'Azure', value: 'azure', icon: <img src="/images/archon_shards/azure_shard.png" className="h-3 w-3"/>},
]

const archonTypes = [
    { label: 'All', value: 'all'},
    { label: 'Normal', value: 'normal'},
    { label: 'Tauforged', value: 'tauforged'},
]

const rarityOptions = [
    { label: 'All', value: 'all'},
    { label: 'Common', value: 'common', icon: <img src="/images/arcanes/rarity/arcane_common.png" className="h-3 w-3"/>},
    { label: 'Uncommon', value: 'uncommon', icon: <img src="/images/arcanes/rarity/arcane_uncommon.png" className="h-3 w-3"/>},
    { label: 'Rare', value: 'rare', icon: <img src="/images/arcanes/rarity/arcane_rare.png" className="h-3 w-3"/>},
    { label: 'Legendary', value: 'legendary', icon: <img src="/images/arcanes/rarity/arcane_legendary.png" className="h-3 w-3"/>},
]

const polarityOptions = [
    { label: 'All', value: 'all'},
    { label: 'Madurai', value: 'madurai', icon: <img src="/images/mods/polarities/madurai_symbol.png" className="h-3 w-3"/>},
    { label: 'Vazarin', value: 'vazarin', icon: <img src="/images/mods/polarities/vazarin_symbol.png" className="h-3 w-3"/>},
    { label: 'Naramon', value: 'naramon', icon: <img src="/images/mods/polarities/naramon_symbol.png" className="h-3 w-3"/>},
    { label: 'Zenurik', value: 'zenurik', icon: <img src="/images/mods/polarities/zenurik_symbol.png" className="h-3 w-3"/>},
    { label: 'Penjaga', value: 'penjaga', icon: <img src="/images/mods/polarities/penjaga_symbol.png" className="h-3 w-3"/>},
    { label: 'Unariu', value: 'unariu', icon: <img src="/images/mods/polarities/unairu_symbol.png" className="h-3 w-3"/>},
    { label: 'Umbra', value: 'umbra', icon: <img src="/images/mods/polarities/umbra_symbol.png" className="h-3 w-3"/>},
]

const modTypeOptions = [
    { label: 'Mods', value: 'mods'},
    { label: 'Aura', value: 'aura'},
    { label: 'Exilus', value: 'exilus'},
    { label: 'Stance', value: 'stance'},
]

const gameModeOptions = [
    { label: 'PVE', value: 'pve'},
    { label: 'Conclave', value: 'conclave'},
]

const sortOptions = [
    { label: 'Name', value: 'name'},
    { label: 'Drain', value: 'drain'},
    { label: 'Max Rank', value: 'rank'},
]

const arrowIcon = <img src="/images/misc/down-arrow-svgrepo-com.svg" className="h-3 w-3"/>

export function ArchonShardDropdowns() {
    return (
        <div className="flex gap-30">
            <Dropdown label="All" options={colorOptions} header="Color 1" labelIcon = {arrowIcon}/>
            <Dropdown label="All" options={colorOptions} header="Color 2" labelIcon = {arrowIcon}/>
            <Dropdown label="All" options={archonTypes} header="Type" labelIcon = {arrowIcon}/>
        </div>
    );
}

export function ArcanesDropdowns() {
    return (
        <div className="flex gap-3">
            <Dropdown label="All" options={rarityOptions} header="Rarity" labelIcon = {arrowIcon}/>
        </div>
    );
}

export function ModsDropdowns() {
    return (
        <div className="flex gap-3">
            <Dropdown label="All" options={polarityOptions} header="Polarity" labelIcon = {arrowIcon}/>
            <Dropdown label="Mods" options={modTypeOptions} header="Type" labelIcon = {arrowIcon}/>
            <Dropdown label="All" options={rarityOptions} header="Rarity" labelIcon = {arrowIcon}/>
            <Dropdown label="PVE" options={gameModeOptions} header="Game Mode" labelIcon = {arrowIcon}/>
            <Dropdown label="Name" options={sortOptions} header="Sort" labelIcon = {arrowIcon}/>
        </div>
    );
}