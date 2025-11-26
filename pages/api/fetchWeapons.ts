import { ExportWeapons, ExportImages, dict_en } from "warframe-public-export-plus";

export type WeaponsEntry = {
    name: string;
    uniqueName: string;
    codexSecret: boolean;
    damagePerShot: number[];
    totalDamage: number;
    description: string;
    criticalChance: number;
    criticalMultiplier: number;
    procChance: number;
    fireRate: number;
    masteryReq: number;
    productCategory: | "Pistols" | "LongGuns" | "Melee" | "SpaceGuns" | "SpaceMelee" | "SpecialItems" | "CrewShipWeapons";
    excludeFromCodex: boolean;
    slot: 0 | 1 | 5 | 7 | 13;
    accuracy: number;
    omegaAttenuation: number;
    maxLevelCap?: number;
    noise: string;
    trigger: string;
    magazineSize: number;
    reloadTime: number;
    sentinel: boolean;
    multishot: number;
};

export type WeaponWithTexture = WeaponsEntry & { textureUrl: string | null };

// Type for WFCD weapons data
type WfcdWeapon = {
    uniqueName: string;
    name: string;
    description?: string;
    [key: string]: any;
};

export async function fetchWeaponsWithTextures(): Promise<WeaponWithTexture[]> {
    // Use the imported data directly
    const weaponsData = ExportWeapons;
    const imagesData = ExportImages;

    // Load WFCD weapons data
    let wfcdWeaponsMap = new Map<string, WfcdWeapon>();
    try {
        const response = await fetch('/data/wfcd-weapons.json');
        if (response.ok) {
            const wfcdWeapons: WfcdWeapon[] = await response.json();
            // Create a map by uniqueName for quick lookup
            wfcdWeaponsMap = new Map(wfcdWeapons.map(weapon => [weapon.uniqueName, weapon]));
            console.log(`Loaded ${wfcdWeaponsMap.size} weapons from WFCD data`);
        } else {
            console.warn('Could not load WFCD weapons data, using fallback');
        }
    } catch (error) {
        console.warn('Error loading WFCD weapons data:', error);
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

    const excludedPaths = ['/Randomized', '/CrewShip'];
    const seenNames = new Map<string, boolean>();

    // Process weapons
    const weapons: WeaponWithTexture[] = [];

    for (const [uniqueName, weaponData] of Object.entries(weaponsData)) {
        const data = weaponData as any;

        // Get localized name
        const localizedName = getLocalizedName(data.name);

        // Apply filters
        if (excludedPaths.some((path) => uniqueName.includes(path))) continue;
        if (seenNames.has(localizedName)) continue;

        seenNames.set(localizedName, true);

        // Get WFCD data for this weapon
        const wfcdWeapon = wfcdWeaponsMap.get(uniqueName);

        // Use WFCD description if available, otherwise fallback to localized
        let description = '';

        if (wfcdWeapon && wfcdWeapon.description && wfcdWeapon.description.trim()) {
            description = wfcdWeapon.description;
        } else {
            // Fallback to warframe-public-export-plus description
            const descriptionPath = data.description || '';
            description = getLocalizedName(descriptionPath);
        }

        weapons.push({
            name: localizedName,
            uniqueName,
            codexSecret: data.codexSecret || false,
            damagePerShot: data.damagePerShot || [],
            totalDamage: data.totalDamage || 0,
            description,
            criticalChance: data.criticalChance || 0,
            criticalMultiplier: data.criticalMultiplier || 0,
            procChance: data.procChance || 0,
            fireRate: data.fireRate || 0,
            masteryReq: data.masteryReq || 0,
            productCategory: data.productCategory || 'SpecialItems',
            excludeFromCodex: data.excludeFromCodex || false,
            slot: data.slot || 0,
            accuracy: data.accuracy || 0,
            omegaAttenuation: data.omegaAttenuation || 0,
            maxLevelCap: data.maxLevelCap,
            noise: data.noise || '',
            trigger: data.trigger || '',
            magazineSize: data.magazineSize || 0,
            reloadTime: data.reloadTime || 0,
            sentinel: data.sentinel || false,
            multishot: data.multishot || 1,
            textureUrl: getTextureUrl(data.icon),
        });
    }

    return weapons.sort((a, b) => a.name.localeCompare(b.name));
}