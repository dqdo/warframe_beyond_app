import { NextResponse } from 'next/server';
import { LZMA } from 'lzma-purejs';

export async function GET(request) {
  try {
    const LANGUAGE = 'en';
    const indexUrl = `https://origin.warframe.com/PublicExport/index_${LANGUAGE}.txt.lzma`;

    // Step 1: Download the LZMA-compressed index file
    const response = await fetch(indexUrl);
    if (!response.ok) throw new Error('Failed to fetch index file');

    const compressed = new Uint8Array(await response.arrayBuffer());

    // Step 2: Decompress it using lzma-purejs
    const decompressed = LZMA.decompressFile(compressed); // returns Uint8Array
    const jsonString = new TextDecoder().decode(decompressed); // decode to string
    const indexData = JSON.parse(jsonString);

    // Step 3: Find the hashed manifest key
    const fileName = 'ExportWeapons_en.json';
    const key = Object.keys(indexData).find(k => k.startsWith(fileName));
    if (!key) throw new Error(`Manifest file "${fileName}" not found in index.`);

    const manifestUrl = `http://content.warframe.com/PublicExport/Manifest/${key}`;
    const manifestResponse = await fetch(manifestUrl);
    if (!manifestResponse.ok) throw new Error('Failed to fetch manifest file');

    const manifestData = await manifestResponse.json();

    return NextResponse.json({
      indexKey: key,
      manifestUrl,
      payload: manifestData,
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
