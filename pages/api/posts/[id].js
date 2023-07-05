import { createRouter } from "next-connect";
import prisma from "@/lib/prisma";

const router = createRouter();

router.get(async (req, res) => {
    let id = req.query.id;
    const result = await prisma.post.findUnique({
        where:{
            id:id
        }
    });

    return res.json({
        data:result
    });
});

export default router.handler();

