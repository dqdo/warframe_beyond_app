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

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
