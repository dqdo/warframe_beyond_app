import Button from '@/app/components/Elements/Button'
import AnyPolarityIcon from '@/app/components/SelectionBar/ButtonSelections/AnyPolarityIcon';

export default function ButtonSelections() {
    return (
        <div className='flex space-x-4'>
            <Button text = "Archon Shards" icon = "/images/archon_shards/archon_shard.png" iconSize='w-11 h-11'/>
            <Button text = "Arcanes" icon = "/images/arcanes/arcane_icon_inactive.png" iconSize='w-14 h-14'/>
            <Button text = "Mods" icon={<AnyPolarityIcon className="w-7 h-7 text-red-500" />}/>
        </div>
    );
}