import { ExportUpgrades, ExportImages, dict_en } from "warframe-public-export-plus";

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

export type ModWithTexture = UpgradesEntry & { textureUrl: string | null };

// Type for WFCD mods data
type WfcdMod = {
    uniqueName: string;
    name: string;
    levelStats?: UpgradeLevelStat[];
    description?: string;
    [key: string]: any;
};

export async function fetchModsWithTextures(): Promise<ModWithTexture[]> {
    // Use the imported data directly
    const upgradesData = ExportUpgrades;
    const imagesData = ExportImages;

    // Load WFCD mods data
    let wfcdModsMap = new Map<string, WfcdMod>();
    try {
        const response = await fetch('/data/wfcd-mods.json');
        if (response.ok) {
            const wfcdMods: WfcdMod[] = await response.json();
            // Create a map by uniqueName for quick lookup
            wfcdModsMap = new Map(wfcdMods.map(mod => [mod.uniqueName, mod]));
            console.log(`Loaded ${wfcdModsMap.size} mods from WFCD data`);
        } else {
            console.warn('Could not load WFCD mods data, using fallback');
        }
    } catch (error) {
        console.warn('Error loading WFCD mods data:', error);
    }

    // Helper function to resolve localized names
    const getLocalizedName = (path: string | undefined): string => {
        if (!path) return '';
        const trimmedPath = path.trim();
        const localized = (dict_en as Record<string, string>)[trimmedPath];
        return localized || '';
    };

    // Build a map of uniqueName -> contentHash from ExportImages
    const imageHashMap = new Map<string, string>();
    for (const [imagePath, data] of Object.entries(imagesData)) {
        if (data && typeof data === 'object' && 'contentHash' in data) {
            imageHashMap.set(imagePath, (data as { contentHash: string }).contentHash);
        }
    }

    // Helper function to get texture URL from icon path
    const getTextureUrl = (iconPath: string | undefined): string | null => {
        if (!iconPath) return null;

        let contentHash = imageHashMap.get(iconPath);
        let finalPath = iconPath;

        if (!contentHash) {
            if (iconPath.endsWith('.png')) {
                const jpgPath = iconPath.replace(/\.png$/, '.jpg');
                contentHash = imageHashMap.get(jpgPath);
                if (contentHash) finalPath = jpgPath;
            } else if (iconPath.endsWith('.jpg')) {
                const pngPath = iconPath.replace(/\.jpg$/, '.png');
                contentHash = imageHashMap.get(pngPath);
                if (contentHash) finalPath = pngPath;
            }
        }

        if (!contentHash) return null;
        return `https://content.warframe.com/PublicExport${finalPath}!${contentHash}`;
    };

    const excludedPaths = ['/Randomized', '/Immortal', '/Grimoire', '/CrewShip'];
    const excludedNames = ['Unfused Artifact'];
    const seenNames = new Map<string, boolean>();

    // Process upgrades
    const mods: ModWithTexture[] = [];

    for (const [uniqueName, modData] of Object.entries(upgradesData)) {
        const data = modData as any;

        // Get localized name
        const localizedName = getLocalizedName(data.name);

        // Apply filters
        if (excludedPaths.some((path) => uniqueName.includes(path))) continue;
        if (excludedNames.includes(localizedName)) continue;
        if (seenNames.has(localizedName)) continue;

        seenNames.set(localizedName, true);

        // Handle aura mods
        const isAura = data.compatName === 'AURA' || data.type === 'AURA';
        const baseDrain = isAura ? Math.abs(data.baseDrain || 0) : (data.baseDrain || 0);

        // Get WFCD data for this mod
        const wfcdMod = wfcdModsMap.get(uniqueName);

        // Use WFCD description and levelStats if available, otherwise fallback to localized
        let description: string[] = [];
        let levelStats: UpgradeLevelStat[] | undefined = undefined;

        if (wfcdMod) {
            // Use WFCD levelStats if available
            if (wfcdMod.levelStats && wfcdMod.levelStats.length > 0) {
                levelStats = wfcdMod.levelStats;
            }

            // Use WFCD description if available
            if (wfcdMod.description && wfcdMod.description.trim()) {
                description = [wfcdMod.description];
            }
        }

        // Fallback to warframe-public-export-plus description if WFCD doesn't have it
        if (description.length === 0) {
            const descriptionPath = data.description || '';
            const localizedDescription = getLocalizedName(descriptionPath);

            if (localizedDescription) {
                description = [localizedDescription];
            }
        }

        mods.push({
            uniqueName,
            name: localizedName,
            polarity: data.polarity || '',
            rarity: data.rarity || 'COMMON',
            codexSecret: data.codexSecret || false,
            baseDrain,
            fusionLimit: data.fusionLimit || 0,
            excludeFromCodex: data.excludeFromCodex || false,
            isUtility: data.isUtility || false,
            compatName: data.compatName || '',
            type: data.type || '',
            description,
            subtype: data.subtype,
            levelStats,
            textureUrl: getTextureUrl(data.icon),
        });
    }

    return mods.sort((a, b) => a.name.localeCompare(b.name));
}