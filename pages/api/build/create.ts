import { VercelRequest, VercelResponse } from '@vercel/node'
import prismaClient from "../../../lib/prisma"
import { nanoid } from 'nanoid';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }

    try {
        const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

        if (!data.buildType) {
            return res.status(400).json({ message: 'buildType is required' });
        }

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

        return res.status(200).json({ buildID: newBuild.buildID });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to create build" });
    }
}