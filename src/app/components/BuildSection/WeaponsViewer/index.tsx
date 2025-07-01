'use client';

import { useEffect, useState } from "react";
import { fetchWeaponsWithTextures, WeaponWithTexture } from "@/app/lib/api/fetchWeapons";
import Image from 'next/image'

type WeaponsViewerProps = {
    selectedBuildType: string | null;
    query: string;
};

export default function WeaponsViewer({ selectedBuildType, query }: WeaponsViewerProps) {
    const [weapons, setWeapons] = useState<WeaponWithTexture[]>([]);

    useEffect(() => {
        async function loadWeapons() {
            try {
                const weaponList = await fetchWeaponsWithTextures();
                setWeapons(weaponList);
            } catch (err) {
                console.error('Failed to load weapons', err);
            }
        }
        loadWeapons();
    }, []);

    const filteredWeapons = weapons.filter((weapon) => {
        const typeMatch = (() => {
            switch (selectedBuildType) {
                case 'primary': return weapon.productCategory === 'LongGuns';
                case 'secondary': return weapon.productCategory === 'Pistols';
                case 'melee': return weapon.productCategory === 'Melee';
                default: return null;
            }
        })();

        const nameMatch = weapon.name.toLowerCase().includes(query.toLowerCase())

        return typeMatch && nameMatch;
    });

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
            {filteredWeapons.map((weapon, index) => (
                <div key={index} className="select-none flex flex-col items-center bg-zinc-800 border border-gray-700 rounded-2xl p-3">
                    <div className="text-white text-sm mb-2 text-center">{weapon.name}</div>
                    {weapon.textureUrl ? (
                        <Image src={weapon.textureUrl} alt={weapon.name} width={128} height={128} className="w-full h-full" unoptimized />
                    ) : (
                        <p className="text-gray-400 text-xs italic mt-4">No image</p>
                    )}
                </div>
            ))}
        </div>
    );
}