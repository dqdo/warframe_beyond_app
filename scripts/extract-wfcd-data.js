// scripts/extract-wfcd-data.js
// Run this with Node.js to generate the mods JSON file
// Usage: node scripts/extract-wfcd-data.js

const fs = require('fs');
const path = require('path');

async function extractWfcdModsData() {
    try {
        console.log('Loading @wfcd/items...');
        const Items = require('@wfcd/items');
        
        console.log('Extracting Mods data...');
        const items = new Items({ category: ['Mods'] });
        
        // Transform the data to only include what we need
        const modsData = items.map(item => ({
            uniqueName: item.uniqueName,
            name: item.name,
            levelStats: item.levelStats,
            description: item.description,
            isAugment: item.isAugment,
            isPrime: item.isPrime,
            tradable: item.tradable,
            transmutable: item.transmutable,
            masterable: item.masterable,
            wikiaUrl: item.wikiaUrl,
            wikiaThumbnail: item.wikiaThumbnail,
            category: item.category,
            rarity: item.rarity,
            polarity: item.polarity,
            baseDrain: item.baseDrain,
            fusionLimit: item.fusionLimit,
            compatName: item.compatName,
            type: item.type,
            drops: item.drops,
            patchlogs: item.patchlogs,
            introduced: item.introduced,
        }));
        
        // Create output directory if it doesn't exist
        const outputDir = path.join(process.cwd(), 'public', 'data');
        if (!fs.existsSync(outputDir)) {
            console.log(`Creating directory: ${outputDir}`);
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Write the JSON file
        const outputPath = path.join(outputDir, 'wfcd-mods.json');
        fs.writeFileSync(outputPath, JSON.stringify(modsData, null, 2));
        
        console.log(`Successfully extracted ${modsData.length} mods`);
        console.log(`Output file: ${outputPath}`);
        console.log(`File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
        
        // Also create a minified version
        const minifiedPath = path.join(outputDir, 'wfcd-mods.min.json');
        fs.writeFileSync(minifiedPath, JSON.stringify(modsData));
        console.log(`Minified file: ${minifiedPath}`);
        console.log(`Minified size: ${(fs.statSync(minifiedPath).size / 1024 / 1024).toFixed(2)} MB`);
        
        // Print some stats
        const augmentCount = modsData.filter(m => m.isAugment).length;
        const primeCount = modsData.filter(m => m.isPrime).length;
        const tradableCount = modsData.filter(m => m.tradable).length;
        
        console.log('\nStatistics:');
        console.log(`   Total Mods: ${modsData.length}`);
        console.log(`   Augments: ${augmentCount}`);
        console.log(`   Prime Mods: ${primeCount}`);
        console.log(`   Tradable: ${tradableCount}`);
        
    } catch (error) {
        console.error('Error extracting mods data:', error);
        process.exit(1);
    }
}

// Run the extraction
extractWfcdModsData();
