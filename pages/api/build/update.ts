import { VercelRequest, VercelResponse } from '@vercel/node';
import prismaClient from "../../../lib/prisma";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { buildID, ...updateData } = req.body;

    try {
        const updatedBuild = await prismaClient.build.update({
            where: {
                buildID: buildID as string
            },
            data: updateData
        });

        res.status(200).json(updatedBuild);
    } catch (err) {
        console.error(err);
        res.status(500).json("Failed to update build");
    }
}