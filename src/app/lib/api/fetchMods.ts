export type UpgradeLevelStat = {
    stats: string[];
};

export type UpgradesEntry = {
    uniqueName: string;
    name: string;
    polarity: string;
    rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'LEGENDARY';
    codexSecret: boolean;
    baseDrain: number;
    fusionLimit: number;
    excludeFromCodex: boolean;
    isUtility: boolean;
    compatName: string;
    type: string;
    description: string[];
    subtype?: string;
    levelStats?: UpgradeLevelStat[];
};

type TextureEntry = {
    uniqueName: string;
    textureLocation: string;
};

export type ModWithTexture = UpgradesEntry & { textureUrl: string | null };

export async function fetchModsWithTextures(): Promise<ModWithTexture[]> {
    const upgradesHash = `ExportUpgrades_en.json!00_02E2DG0ASl+GrgiCwc+yAA`;
    const manifestHash = `ExportManifest.json!00_w5hQItnM-1bKQNJUkXbcog`;

    const [upgradesRes, manifestRes] = await Promise.all([
        fetch(`https://content.warframe.com/PublicExport/Manifest/${upgradesHash}`),
        fetch(`https://content.warframe.com/PublicExport/Manifest/${manifestHash}`)
    ]);

    if (!upgradesRes.ok || !manifestRes.ok) {
        throw new Error('Failed to fetch data');
    }

    const upgradesJson = await upgradesRes.json();
    const manifestJson = await manifestRes.json();

    const upgrades: UpgradesEntry[] = upgradesJson.ExportUpgrades;
    const manifest: TextureEntry[] = manifestJson.Manifest;

    const textureMap = new Map(
        manifest.map((entry) => [entry.uniqueName, entry.textureLocation])
    );

    const excludedPaths = ['/Randomized', '/Immortal', '/Grimoire', '/CrewShip']
    const excludedNames = ['Unfused Artifact']

    return upgrades.filter((mod) => !excludedPaths.some((path) => mod.uniqueName.includes(path)) && !excludedNames.includes(mod.name)).map((mod) => ({
        ...mod, textureUrl: textureMap.has(mod.uniqueName) ? `https://content.warframe.com/PublicExport${textureMap.get(mod.uniqueName)}` : null,
    }));
}
