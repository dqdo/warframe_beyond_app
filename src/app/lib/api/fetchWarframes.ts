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
        name: string;
        description: string;
        icon?: string;
        uniqueName?: string;
    }[];
    productCategory: 'Suits' | 'SpaceSuits' | 'MechSuits';
};

type TextureEntry = {
    uniqueName: string;
    textureLocation: string;
};

export type WarframeWithTexture = WarframeEntry & { textureUrl: string | null };

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

    return warframes.filter((warframe) => warframe.productCategory === 'Suits').map((warframe) => ({
        ...warframe, textureUrl: textureMap.has(warframe.uniqueName) ? `https://content.warframe.com/PublicExport${textureMap.get(warframe.uniqueName)}` : null,
    })).sort((a, b) => a.name.localeCompare(b.name));

}