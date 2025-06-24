import { DATA_HASHES } from '@/app/lib/constants/dataHashes';

export type ArcaneLevelStat = {
    stats: string[];
};

export type RelicArcaneEntry = {
    uniqueName: string;
    name: string;
    codexSecret?: boolean;
    rarity?: string;
    levelStats: ArcaneLevelStat[];
};

type TextureEntry = {
    uniqueName: string;
    textureLocation: string;
};

export type ArcaneWithTexture = RelicArcaneEntry & { textureUrl: string | null };

export async function fetchArcanesWithTextures(): Promise<ArcaneWithTexture[]> {
    const RelicArcaneHash = DATA_HASHES.arcanes.relicArcane;
    const manifestHash = DATA_HASHES.manifest.manifest;

    const [relicArcaneRes, manifestRes] = await Promise.all([
        fetch(`https://content.warframe.com/PublicExport/Manifest/${RelicArcaneHash}`),
        fetch(`https://content.warframe.com/PublicExport/Manifest/${manifestHash}`)
    ]);

    if (!relicArcaneRes.ok || !manifestRes.ok) {
        throw new Error('Failed to fetch data');
    }

    const relicArcaneJson = await relicArcaneRes.json();
    const manifestJson = await manifestRes.json();

    const arcanes: RelicArcaneEntry[] = relicArcaneJson.ExportRelicArcane.filter(
        (entry: RelicArcaneEntry) =>
            Array.isArray(entry.levelStats) && !("relicRewards" in entry)
    );

    const manifest: TextureEntry[] = manifestJson.Manifest;

    const textureMap = new Map(
        manifest.map((entry) => [entry.uniqueName, entry.textureLocation])
    );

    return arcanes.map((arcane) => ({
        ...arcane, textureUrl: textureMap.has(arcane.uniqueName) ? `https://content.warframe.com/PublicExport${textureMap.get(arcane.uniqueName)}` : null,
    }));
}