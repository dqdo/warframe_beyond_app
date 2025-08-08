import { DATA_HASHES } from "../../src/app/constants/dataHashes";

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


type TextureEntry = {
    uniqueName: string;
    textureLocation: string;
};

export type WeaponWithTexture = WeaponsEntry & { textureUrl: string | null };

export async function fetchWeaponsWithTextures(): Promise<WeaponWithTexture[]> {
    const weaponsHash = DATA_HASHES.weapons.weapons;
    const manifestHash = DATA_HASHES.manifest.manifest;

    const [weaponsRes, manifestRes] = await Promise.all([
        fetch(`https://content.warframe.com/PublicExport/Manifest/${weaponsHash}`),
        fetch(`https://content.warframe.com/PublicExport/Manifest/${manifestHash}`)
    ]);

    if (!weaponsRes.ok || !manifestRes.ok) {
        throw new Error('Failed to fetch data');
    }

    const weaponsJson = await weaponsRes.json();
    const manifestJson = await manifestRes.json();

    const weapons: WeaponsEntry[] = weaponsJson.ExportWeapons;
    const manifest: TextureEntry[] = manifestJson.Manifest;

    const textureMap = new Map(
        manifest.map((entry) => [entry.uniqueName, entry.textureLocation])
    );

    return weapons.map((weapon) => ({
        ...weapon, textureUrl: textureMap.has(weapon.uniqueName) ? `https://content.warframe.com/PublicExport${textureMap.get(weapon.uniqueName)}` : null,
    })).sort((a, b) => a.name.localeCompare(b.name));

}