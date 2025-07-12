import { DATA_HASHES } from '@/app/lib/constants/dataHashes';

export type WarframeEntry = {
    uniqueName: string;
    name: string;
    parentName: string;
    description: string;
    health: number;
    shield: number;
    armor: number;
    stamina: number;
    power: number;
    codexSecret: boolean;
    masteryReq: number;
    sprintSpeed: number;
    passiveDescription: string;
    exalted: string[];
    abilities: {
        abilityName: string;
        description: string;
        abilityUniqueName?: string;
    }[];
    productCategory: 'Suits' | 'SpaceSuits' | 'MechSuits';
};

type TextureEntry = {
    uniqueName: string;
    textureLocation: string;
};

type AbilityWithTexture = {
    name: string;
    description: string;
    icon?: string;
    uniqueName?: string;
    textureUrl: string | null;
};

export type WarframeWithTexture = Omit<WarframeEntry, 'abilities'> & {
    textureUrl: string | null;
    abilities: AbilityWithTexture[];
};

export async function fetchWarframesWithTextures(): Promise<WarframeWithTexture[]> {
    const warframesHash = DATA_HASHES.warframes.warframes;
    const manifestHash = DATA_HASHES.manifest.manifest;

    const [warframesRes, manifestRes] = await Promise.all([
        fetch(`https://content.warframe.com/PublicExport/Manifest/${warframesHash}`),
        fetch(`https://content.warframe.com/PublicExport/Manifest/${manifestHash}`)
    ]);

    if (!warframesRes.ok || !manifestRes.ok) {
        throw new Error('Failed to fetch data');
    }

    const warframesJson = await warframesRes.json();
    const manifestJson = await manifestRes.json();

    const warframes: WarframeEntry[] = warframesJson.ExportWarframes;
    const manifest: TextureEntry[] = manifestJson.Manifest;

    const textureMap = new Map(
        manifest.map((entry) => [entry.uniqueName, entry.textureLocation])
    );

    return warframes.filter((warframe) => warframe.productCategory === 'Suits').map((warframe) => {
        const warframeTexture = textureMap.has(warframe.uniqueName) ? `https://content.warframe.com/PublicExport${textureMap.get(warframe.uniqueName)}` : null;

        const abilitiesWithTextures: AbilityWithTexture[] = warframe.abilities.map((ability) => {
            const uniqueName = ability.abilityUniqueName;
            const abilityTexture = uniqueName && textureMap.has(uniqueName) ? `https://content.warframe.com/PublicExport${textureMap.get(uniqueName)}` : null;

            return {
                name: ability.abilityName,
                description: ability.description,
                uniqueName: uniqueName,
                icon: undefined,
                textureUrl: abilityTexture,
            };
        });

        return {
            ...warframe,
            textureUrl: warframeTexture,
            abilities: abilitiesWithTextures,
        };
    }).sort((a, b) => a.name.localeCompare(b.name));

}