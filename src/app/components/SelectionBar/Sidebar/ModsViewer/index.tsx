'use client';

import { useEffect, useState } from 'react';
import { fetchModsWithTextures, ModWithTexture } from '@/app/lib/api/fetchMods';
import Image from 'next/image';

type ModsViewerProps = {
  query: string;
  filters?: {
    polarity?: string | null;
    rarity?: string | null;
    type?: string | null;
  };
};


export default function ModsViewer({ query, filters }: ModsViewerProps) {
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

  const filteredMods = mods.filter((mod) => {
    const nameMatch = mod.name.toLowerCase().includes(query.toLowerCase());
    const polarityMatch = !filters?.polarity || mod.polarity === filters.polarity;
    const rarityMatch = !filters?.rarity || mod.rarity === filters.rarity;
    const typeMatch = !filters?.type || (filters.type === "UTILITY" ? mod.isUtility === true : mod.type === filters.type);

    return nameMatch && polarityMatch && rarityMatch && typeMatch;
  });


  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {filteredMods.map((mod, index) => (
        <div key={index} className="select-none flex flex-col items-center bg-zinc-800 border border-gray-700 rounded-2xl p-3">
          <div className="text-white text-sm mb-2 text-center">{mod.name}</div>
          {mod.textureUrl ? (
            <Image src={mod.textureUrl} alt={mod.name} width={128} height={128} className="w-full h-full" unoptimized />
          ) : (
            <p className="text-gray-400 text-xs italic mt-4">No image</p>
          )}
        </div>
      ))}
    </div>
  );
}
