import { createRouter } from "next-connect";
import prisma from "@/lib/prisma";

const router = createRouter();

router.get(async (req, res) => {
    const result = await prisma.post.findMany({
        where:{
            published:true
        }
    });

    return res.json({
        data:result
    });
    // let query = req.query;
    // const { param1, param2 } = query;
    // return res.json({
    //     message:`ini params1 ${param1}, ini params ${param2}`
    // });
});

export default router.handler();
