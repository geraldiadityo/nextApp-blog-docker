import prisma from "@/lib/prisma";
import apiHeaderMiddleware from "@/middleware/apiHeaderMiddleware";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(apiHeaderMiddleware);

router.get(async (req, res) => {
    const { id } = req.query;

    const result = await prisma.post.findUnique({
        where:{
            id: id
        }
    });

    return res.json({
        data: result
    });
});

