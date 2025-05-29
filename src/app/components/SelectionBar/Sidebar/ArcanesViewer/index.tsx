'use client';

import { useEffect, useState } from 'react';
import { fetchArcanesWithTextures, ArcaneWithTexture } from '@/app/lib/api/fetchArcanes';
import Image from 'next/image';

export default function ArcanesViewer() {
  const [arcanes, setArcanes] = useState<ArcaneWithTexture[]>([]);

  useEffect(() => {
    async function loadArcanes() {
      try {
        const arcaneList = await fetchArcanesWithTextures();
        setArcanes(arcaneList);
      } catch (err) {
        console.error('Failed to load arcanes', err);
      }
    }
    loadArcanes();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {arcanes.map((arcane, index) => (
        <div key={index} className="select-none flex flex-col items-center bg-zinc-800 border border-gray-700 rounded-2xl p-3">
          <div className="text-white text-sm mb-2 text-center">{arcane.name}</div>
          {arcane.textureUrl ? (
            <Image src={arcane.textureUrl} alt={arcane.name} width={128} height={128} className="w-full h-full" unoptimized />
          ) : (
            <p className="text-gray-400 text-xs italic mt-4">No image</p>
          )}
        </div>
      ))}
    </div>
  );
}