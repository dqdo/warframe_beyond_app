import { VercelRequest, VercelResponse } from '@vercel/node'
import prismaClient from "../../../lib/prisma"
import { nanoid } from 'nanoid';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const data = req.body;
    try {
        const newBuild = await prismaClient.build.create({
            data: {
                buildID: nanoid(),
                orokinReactor: data.orokinReactor ?? true,
                itemRank: data.itemRank ?? 30,
                buildType: data.buildType,
                assignedMods: data.assignedMods || {},
                slotPolarities: data.slotPolarities || {},
                currentModRanks: data.currentModRanks || {},
                selectedWarframe: data.selectedWarframe || null,
                selectedWeapon: data.selectedWeapon || null,
            },
        });

        res.status(200).json({ buildID: newBuild.buildID });
    } catch (err) {
        console.error(err);
        res.status(500).json("Failed to create build");
    }
}