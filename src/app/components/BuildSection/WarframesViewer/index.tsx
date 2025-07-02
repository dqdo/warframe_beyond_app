'use client';

import { useEffect, useState } from 'react';
import { fetchWarframesWithTextures, WarframeWithTexture } from '@/app/lib/api/fetchWarframes';
import Image from 'next/image';

type WarframesViewerProps = {
    selectedBuildType: string | null;
    query: string;
};


export default function WarframesViewer({ selectedBuildType, query }: WarframesViewerProps) {
    const [warframes, setWarframes] = useState<WarframeWithTexture[]>([]);

    useEffect(() => {
        async function loadWarframes() {
            try {
                const warframeList = await fetchWarframesWithTextures();
                setWarframes(warframeList);
            } catch (err) {
                console.error('Failed to load warframes', err);
            }
        }
        loadWarframes();
    }, []);

    if (selectedBuildType !== 'Warframe') {
        return null;
    }

    const filteredWarframes = warframes.filter((warframe) => {
        const nameMatch = warframe.name.toLowerCase().includes(query.toLowerCase());
        return nameMatch;
    });

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
            {filteredWarframes.map((warframe, index) => (
                <div key={index} className="select-none flex flex-col items-center bg-zinc-800 border border-gray-700 rounded-2xl p-3">
                    <div className="text-white text-sm mb-2 text-center">{warframe.name}</div>
                    {warframe.textureUrl ? (
                        <Image src={warframe.textureUrl} alt={warframe.name} width={128} height={128} className="w-full h-full" unoptimized />
                    ) : (
                        <p className="text-gray-400 text-xs italic mt-4">No image</p>
                    )}
                </div>
            ))}
        </div>
    );
}
