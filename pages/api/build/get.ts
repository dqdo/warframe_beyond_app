import { VercelRequest, VercelResponse } from '@vercel/node';
import prismaClient from "../../../lib/prisma";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { buildID } = req.query;

    try {
        const build = await prismaClient.build.findUnique({
            where: {
                buildID: buildID as string
            }
        });

        if (!build) {
            return res.status(404).json({ error: "Build not found" });
        }

        res.status(200).json(build);
    } catch (err) {
        console.error(err);
        res.status(500).json("Failed to fetch build");
    }
}