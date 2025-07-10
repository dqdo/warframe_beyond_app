'use client';

import { useEffect, useState } from 'react';
import { fetchModsWithTextures, ModWithTexture } from '@/app/lib/api/fetchMods';
import Image from 'next/image';
import { polarityImages, rarityImages } from '@/app/lib/constants/images'

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

function getModDetails(mod: ModWithTexture) {
  const stats = mod.levelStats?.[mod.levelStats.length - 1]?.stats ?? [];
  const description = mod.description ?? [];

  return (
    <>
      {stats.map((stat, i) => (
        <div key={`stat-${i}`}>{stat}</div>
      ))}
      {stats.length === 0 &&
        description.map((line, i) => (
          <div key={`desc-${i}`}>{line}</div>
        ))}
    </>
  );
}

export default function ModsViewer({ query, filters, expandAll, selectedBuildType }: ModsViewerProps) {
  const [mods, setMods] = useState<ModWithTexture[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      warframe: ["WARFRAME"],
      primary: ["PRIMARY"],
      secondary: ["SECONDARY"],
      melee: ["MELEE"],
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {filteredMods.map((mod, index) => (
        <div key={index} className="select-none flex flex-col items-center bg-zinc-800 border border-gray-700 rounded-2xl p-3" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
          <div className='flex gap-2'>
            {mod.rarity && rarityImages[mod.rarity] && (
              <Image src={rarityImages[mod.rarity]} alt={`${mod.rarity} icon`} width={15} height={15} className="w-5 h-5" loading="lazy" />
            )}

            <div className="text-white text-sm mb-2 text-center">{mod.name}</div>
            {mod.polarity && polarityImages[mod.polarity] && (
              <Image src={polarityImages[mod.polarity]} alt={`${mod.polarity} icon`} width={15} height={15} className="w-5 h-5" loading="lazy" />
            )}
          </div>

          {mod.textureUrl ? (
            <Image src={mod.textureUrl} alt={mod.name} width={128} height={128} className="w-30 h-30" unoptimized loading="lazy" />
          ) : (
            <p className="text-gray-400 text-xs italic mt-4">No image</p>
          )}

          <div className={`transition-all duration-500 overflow-hidden text-xs text-gray-300 mt-2 text-center 
          ${expandAll || hoveredIndex === index ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'}`}>
            {(expandAll || hoveredIndex === index) && getModDetails(mod)}
          </div>
        </div>
      ))}
    </div>
  );
}
