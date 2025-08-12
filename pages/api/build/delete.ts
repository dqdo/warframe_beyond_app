import { VercelRequest, VercelResponse } from '@vercel/node';
import prismaClient from "../../../lib/prisma";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { buildID } = req.body;

    if (!buildID) {
        return res.status(400).json({ error: 'buildID is required' });
    }

    try {
        const build = await prismaClient.build.findUnique({
            where: { buildID: buildID as string },
        });

        if (!build) {
            return res.status(404).json({ error: 'Build not found' });
        }

        await prismaClient.build.delete({
            where: { buildID: buildID as string },
        });

        res.status(200).json({ message: 'Build deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete build' });
    }
}