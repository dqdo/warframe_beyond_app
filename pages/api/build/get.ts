import { VercelRequest, VercelResponse } from '@vercel/node';
import prismaClient from "../../../lib/prisma";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { buildID, auth0Owner } = req.query;

    try {
        if (auth0Owner) {
            const builds = await prismaClient.build.findMany({
                where: { auth0Owner: auth0Owner as string },
            });
            return res.status(200).json(builds);
        }

        if (buildID) {
            const build = await prismaClient.build.findUnique({
                where: {
                    buildID: buildID as string
                }
            });

            if (!build) {
                return res.status(404).json({ error: "Build not found" });
            }

            return res.status(200).json(build);
        }

        return res.status(400).json({ error: "Missing parameters" });
    } catch (err) {
        console.error(err);
        res.status(500).json("Failed to fetch build");
    }
}