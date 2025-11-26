import { ExportAbilities, ExportWarframes, ExportImages, dict_en } from "warframe-public-export-plus";

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
    // Use the imported data directly
    const warframesData = ExportWarframes;
    const abilitiesData = ExportAbilities;
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

    // Build a map of ability uniqueName -> ability data
    const abilityMap = new Map<string, any>();
    for (const [uniqueName, abilityData] of Object.entries(abilitiesData)) {
        abilityMap.set(uniqueName, abilityData);
    }

    // Helper function to get texture URL from icon path
    const getTextureUrl = (iconPath: string | undefined): string | null => {
        if (!iconPath) return null;
        const contentHash = imageHashMap.get(iconPath);
        if (!contentHash) return null;
        return `https://content.warframe.com/PublicExport${iconPath}!${contentHash}`;
    };

    // Process warframes
    const warframes: WarframeWithTexture[] = [];

    for (const [uniqueName, warframeData] of Object.entries(warframesData)) {
        const data = warframeData as any;

        // Filter only Suits (not SpaceSuits or MechSuits)
        if (data.productCategory !== 'Suits') continue;

        // Process abilities
        const abilitiesWithTextures: AbilityWithTexture[] = (data.abilities || []).map((ability: any) => {
            const abilityUniqueName = ability.uniqueName;
            const abilityDetails = abilityUniqueName ? abilityMap.get(abilityUniqueName) : null;

            return {
                name: getLocalizedName(ability.name || abilityDetails?.name),
                description: getLocalizedName(ability.description || abilityDetails?.description),
                uniqueName: abilityUniqueName,
                icon: ability.icon || abilityDetails?.icon,
                textureUrl: getTextureUrl(ability.icon || abilityDetails?.icon),
            };
        });

        warframes.push({
            uniqueName,
            name: getLocalizedName(data.name),
            parentName: data.parentName || '',
            description: getLocalizedName(data.description),
            health: data.health || 0,
            shield: data.shield || 0,
            armor: data.armor || 0,
            stamina: data.stamina || 0,
            power: data.power || 0,
            codexSecret: data.codexSecret || false,
            masteryReq: data.masteryReq || 0,
            sprintSpeed: data.sprintSpeed || 1.0,
            passiveDescription: getLocalizedName(data.passiveDescription),
            exalted: data.exalted || [],
            abilities: abilitiesWithTextures,
            productCategory: data.productCategory,
            textureUrl: getTextureUrl(data.icon),
        });
    }

    return warframes.sort((a, b) => a.name.localeCompare(b.name));
}