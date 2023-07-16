import { createRouter } from "next-connect";
import prisma from "@/lib/prisma";
import apiHeaderMiddleware from "@/middleware/apiHeaderMiddleware";

const router = createRouter();

router.get(async (req, res) => {
    const result = await prisma.categorie.findMany()
    return res.json({
        data: result
    });
});

router.use(apiHeaderMiddleware);
router.post(async (req, res) => {
    const { nama } = req.body;
    
    await prisma.categorie.create({
        data:{
            nama: nama
        }
    });
    return res.status(201).send({
        message: "created data categorie was successfully"
    });
});

export default router.handler();
