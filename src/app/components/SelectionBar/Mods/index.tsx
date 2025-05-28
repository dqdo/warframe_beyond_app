'use client';

import { useEffect, useState } from 'react';
import { fetchModsWithTextures, ModWithTexture } from '@/app/lib/api/fetchMods';
import Image from 'next/image';

export default function ModsViewer() {
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {mods.map((mod, index) => (
        <div key={index} className="select-none flex flex-col items-center bg-zinc-800 border border-gray-700 rounded-2xl p-3">
          <div className="text-white text-sm mb-2 text-center">{mod.name}</div>
          {mod.textureUrl ? (
              <Image src={mod.textureUrl} alt={mod.name} width={128} height={128} className="w-full h-full" unoptimized/>
          ) : (
            <p className="text-gray-400 text-xs italic mt-4">No image</p>
          )}
        </div>
      ))}
    </div>
  );
}
