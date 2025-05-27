'use client';

import { useEffect, useState } from 'react';
import { fetchModNames } from '@/app/lib/api/fetchMods';

export default function ModsViewer() {
  const [modNames, setModNames] = useState<string[]>([]);

  useEffect(() => {
    async function loadModNames() {
      try {
        const names = await fetchModNames();
        setModNames(names);
      } catch (err) {
        console.error('Failed to load mods', err);
      }
    }
    loadModNames();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {modNames.map((name, index) => (
        <div key={index} className="border rounded p-2 text-center bg-grey shadow">
          <h3 className="font-roboto text-sm">{name}</h3>
        </div>
      ))}
    </div>
  );
}
