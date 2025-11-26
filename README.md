## Troubleshooting

If you are running the project locally and **Mods, Warframes, or Weapons are not showing up**, your local data export may be outdated.  
If items are missing **in production** (https://warframe-beyond-app.vercel.app/), that simply means I have not yet updated the data hashes.

Download and extract the latest Warframe data export:

https://origin.warframe.com/PublicExport/index_en.txt.lzma

Extract the file using **7-Zip**, **WinRAR**, or any LZMA-compatible tool.  
After extraction, make sure the **hash values are updated** to match the newest export.

You can update the hashes here:

src/app/constants/dataHashes.ts

To have access to any mods, please select a build type (Warframe, Primary, etc.) and select one of those build types in the select square. Happy building!
