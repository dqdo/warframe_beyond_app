import { VercelRequest, VercelResponse } from '@vercel/node';
import prismaClient from "../../../lib/prisma";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const buildID = typeof req.query.buildID === "string" ? req.query.buildID : null;

    try {
        if (!buildID) {
            return res.status(400).json("Missing buildID parameter");
        }

        const build = await prismaClient.build.findUnique({
            where: { buildID }
        });

        if (build) {
            res.status(200).json(build);
        } else {
            res.status(404).json("Build not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Failed to get build");
    }
}