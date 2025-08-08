import { DATA_HASHES } from "../../src/app/constants/dataHashes";

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
    const upgradesHash = DATA_HASHES.mods.upgrades;
    const manifestHash = DATA_HASHES.manifest.manifest;

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

    const excludedPaths = ['/Randomized', '/Immortal', '/Grimoire', '/CrewShip'];
    const excludedNames = ['Unfused Artifact'];

    const seenNames = new Map<string, boolean>();

    return upgrades.filter((mod) => {
        if (excludedPaths.some((path) => mod.uniqueName.includes(path))) return false;
        if (excludedNames.includes(mod.name)) return false;
        if (seenNames.has(mod.name)) return false;

        seenNames.set(mod.name, true);
        return true;
    })
        .map((mod) => {
            const isAura = mod.compatName === 'AURA' || mod.type === 'AURA';
            const baseDrain = isAura ? Math.abs(mod.baseDrain) : mod.baseDrain;
            
            return {
                ...mod,
                baseDrain,
                textureUrl: textureMap.has(mod.uniqueName) 
                    ? `https://content.warframe.com/PublicExport${textureMap.get(mod.uniqueName)}` 
                    : null,
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
}