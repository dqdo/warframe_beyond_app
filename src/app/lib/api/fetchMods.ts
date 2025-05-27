export type UpgradesEntry = {
    uniqueName: string;
    name: string;
    polarity: string;
    rarity: string;
    codexSecret: boolean;
    baseDrain: number;
    fusionLimit: number;
    compatName: string;
    type: string;
    description: string[];
}

export async function fetchModNames(): Promise<string[]> {
    const exportUpgradesHash = `ExportUpgrades_en.json!00_02E2DG0ASl+GrgiCwc+yAA`
    const upgradesRes = await fetch(`https://content.warframe.com/PublicExport/Manifest/${exportUpgradesHash}`);

    if (!upgradesRes.ok) {
        throw new Error('Failed to fetch upgrades data');
    }
    const upgradesJson = await upgradesRes.json();
    const upgradesData: UpgradesEntry[] = upgradesJson.ExportUpgrades;

    return upgradesData.map((upgrade) => upgrade.name);
}
