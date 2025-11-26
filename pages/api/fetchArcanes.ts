import { ExportArcanes, ExportImages, dict_en } from "warframe-public-export-plus";

export type ArcaneLevelStat = {
    stats: string[];
};

export type RelicArcaneEntry = {
    uniqueName: string;
    name: string;
    codexSecret?: boolean;
    rarity?: string;
    levelStats?: ArcaneLevelStat[];
    fusionLimit?: number;
    distillPointValue?: number;
};

export type ArcaneWithTexture = RelicArcaneEntry & { textureUrl: string | null };

// Type for raw arcane data from the export
type RawArcaneData = {
    name?: string;
    icon?: string;
    codexSecret?: boolean;
    rarity?: string;
    levelStats?: ArcaneLevelStat[];
    fusionLimit?: number;
    distillPointValue?: number;
    relicRewards?: unknown;
    [key: string]: unknown;
};

export async function fetchArcanesWithTextures(): Promise<ArcaneWithTexture[]> {
    // Use the imported data directly
    const relicArcaneData = ExportArcanes;
    const imagesData = ExportImages;

    // Helper function to resolve localized names
    const getLocalizedName = (path: string | undefined): string => {
        if (!path) return '';
        return (dict_en as Record<string, string>)[path] || path;
    };

    // Build a map of uniqueName -> contentHash from ExportImages.json
    const imageHashMap = new Map<string, string>();
    for (const [imagePath, data] of Object.entries(imagesData)) {
        if (data && typeof data === 'object' && 'contentHash' in data) {
            imageHashMap.set(imagePath, (data as { contentHash: string }).contentHash);
        }
    }

    // Helper function to get texture URL from icon path
    const getTextureUrl = (iconPath: string | undefined): string | null => {
        if (!iconPath) return null;
        const contentHash = imageHashMap.get(iconPath);
        if (!contentHash) return null;
        return `https://content.warframe.com/PublicExport${iconPath}!${contentHash}`;
    };

    // Process arcanes
    const arcanes: ArcaneWithTexture[] = [];

    for (const [uniqueName, arcaneData] of Object.entries(relicArcaneData)) {
        const data = arcaneData as any;

        // Filter only arcanes (those without relicRewards property)
        // Note: Some arcanes may not have levelStats in ExportRelicArcane
        if ("relicRewards" in data) continue;

        arcanes.push({
            uniqueName,
            name: getLocalizedName(data.name),
            codexSecret: data.codexSecret,
            rarity: data.rarity,
            levelStats: data.levelStats,
            fusionLimit: data.fusionLimit,
            distillPointValue: data.distillPointValue,
            textureUrl: getTextureUrl(data.icon),
        });
    }

    return arcanes.sort((a, b) => a.name.localeCompare(b.name));
}