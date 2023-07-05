import { createRouter } from "next-connect";
import prisma from "@/lib/prisma";
import apiHeaderMiddleware from "@/middleware/apiHeaderMiddleware";

const router = createRouter();
router.use(apiHeaderMiddleware);
router.get(async (req, res) => {
    let id = req.query.id;
    const result = await prisma.user.findUnique({
        where:{
            id:parseInt(id)
        }
    });
    return res.json({
        data:result
    });
});
router.patch(async (req, res) => {
    let id = req.query.id;
    const data = req.body;
    await prisma.user.update({
        where:{
            id:id
        },
        data,
    });

    return res.json({
        message:'data user was success updated'
    });
});
router.delete(async (req, res) => {
    let id = req.query.id;
    
    await prisma.user.delete({
        where:{
            id:id,
        },
    });

    return res.json({
        message:'data deleted!'
    });
});

export default router.handler();
