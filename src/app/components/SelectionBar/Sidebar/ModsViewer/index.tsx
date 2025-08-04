'use client';

import { useEffect, useState } from 'react';
import { fetchModsWithTextures, ModWithTexture } from '@/app/lib/api/fetchMods';
import { ModCard } from '@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard';
import { WarframeWithTexture } from '@/app/lib/api/fetchWarframes';

type ModsViewerProps = {
  query: string;
  filters?: {
    polarity?: string | null;
    rarity?: string | null;
    type?: string | null;
  };
  expandAll?: boolean;
  selectedBuildType: string | null;
  setSelectedMod: (mod: ModWithTexture | null) => void;
  selectedMod: ModWithTexture | null;
  assignedMods: Record<string, ModWithTexture | null>;
  selectedWarframe: WarframeWithTexture | null;
};

export default function ModsViewer({ query, filters, expandAll, selectedBuildType, setSelectedMod, assignedMods, selectedMod, selectedWarframe }: ModsViewerProps) {
  const [mods, setMods] = useState<ModWithTexture[]>([]);

  useEffect(() => {
    async function loadMods() {
      try {
        const modList = await fetchModsWithTextures();
        setMods(modList);
      } catch (err) {
        console.error('Failed to load mods', err);
      }
    }
    loadMods();
  }, []);

  function getSelectedBuildTypeMods(buildType: string | null): string[] | null {
    if (!buildType) return null;

    const map: Record<string, string[]> = {
      warframe: ["WARFRAME", "AURA"],
      primary: ["PRIMARY"],
      secondary: ["SECONDARY"],
      melee: ["MELEE", "STANCE"],
    };

    return map[buildType.toLowerCase()] || null;
  }

  const allowedModTypes = getSelectedBuildTypeMods(selectedBuildType);

  const assignedModNames = Object.values(assignedMods).filter((mod): mod is ModWithTexture => mod !== null).map(mod => mod.uniqueName);

  const filteredMods = mods.filter((mod) => {
    const nameMatch = mod.name.toLowerCase().includes(query.toLowerCase());
    const polarityMatch = !filters?.polarity || mod.polarity === filters.polarity;
    const rarityMatch = !filters?.rarity || mod.rarity === filters.rarity;
    const typeMatch = !filters?.type || (filters.type === "UTILITY" ? mod.isUtility === true : mod.type === filters.type);
    const buildTypeMatch = !allowedModTypes || allowedModTypes.includes(mod.type);
    const notAlreadyAssigned = !assignedModNames.includes(mod.uniqueName);

    const isAugment = mod.polarity === 'AP_POWER'
    const isAugmentCompatible = selectedWarframe && mod.subtype === selectedWarframe?.parentName
    const allowedAugments = !isAugment || isAugmentCompatible;

    return nameMatch && polarityMatch && rarityMatch && typeMatch && buildTypeMatch && notAlreadyAssigned && allowedAugments;
  });

  useEffect(() => {
    if (selectedMod && assignedModNames.includes(selectedMod.uniqueName)) {
      setSelectedMod(null);
    }
  }, [assignedModNames, selectedMod, setSelectedMod]);


  return (
    <div className={`grid lg:grid-cols-2 2xl:grid-cols-3 gap-2 p-4`}>
      {filteredMods.map((mod, index) => (
        <div key={index} className={`relative cursor-grab select-none flex flex-col items-center ${expandAll ? 'h-[300px]' : 'h-[100px]'}`}
          onClick={() => {
            if (!assignedModNames.includes(mod.uniqueName)) {
              setSelectedMod(mod);
            }
          }}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("application/json", JSON.stringify(mod));
          }}>
          {mod.textureUrl ? (
            <div className='relative w-[180px] h-full'>
              <ModCard mod={mod} expandAll={expandAll} currentRank={mod.fusionLimit} />
            </div>
          ) : (
            <p className="text-gray-400 text-xs italic mt-4">No image</p>
          )}
        </div>
      ))}
    </div>
  );
}
