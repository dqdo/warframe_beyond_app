'use client';

import { useEffect, useState } from 'react';
import { fetchModsWithTextures, ModWithTexture } from '@/app/lib/api/fetchMods';
import { ModCard } from '@/app/components/SelectionBar/Sidebar/ModsViewer/ModCard';

type ModsViewerProps = {
  query: string;
  filters?: {
    polarity?: string | null;
    rarity?: string | null;
    type?: string | null;
  };
  expandAll?: boolean;
  selectedBuildType: string | null;
};

export default function ModsViewer({ query, filters, expandAll, selectedBuildType }: ModsViewerProps) {
  const [mods, setMods] = useState<ModWithTexture[]>([]);
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const filteredMods = mods.filter((mod) => {
    const nameMatch = mod.name.toLowerCase().includes(query.toLowerCase());
    const polarityMatch = !filters?.polarity || mod.polarity === filters.polarity;
    const rarityMatch = !filters?.rarity || mod.rarity === filters.rarity;
    const typeMatch = !filters?.type || (filters.type === "UTILITY" ? mod.isUtility === true : mod.type === filters.type);
    const buildTypeMatch = !allowedModTypes || allowedModTypes.includes(mod.type);

    return nameMatch && polarityMatch && rarityMatch && typeMatch && buildTypeMatch;
  });


  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2 p-4">
      {filteredMods.map((mod, index) => (
        <div key={index} className="select-none flex flex-col items-center">

          {mod.textureUrl ? (
            <ModCard mod={mod} expandAll = {expandAll} />
            // <Image src={mod.textureUrl} alt={mod.name} width={128} height={128} className="w-30 h-30" unoptimized loading="lazy" />
          ) : (
            <p className="text-gray-400 text-xs italic mt-4">No image</p>
          )}
        </div>
      ))}
    </div>
  );
}
