import { createRouter } from "next-connect";
import prisma from "@/lib/prisma";
import apiHeaderMiddleware from "@/middleware/apiHeaderMiddleware";

const router = createRouter();
router.use(apiHeaderMiddleware);
router.get(async (req, res) => {
    let id = req.query.id;
    const result = await prisma.categorie.findUnique({
        where:{
            id: parseInt(id)
        }
    });

    return res.json({
        data: result
    });
});

router.put(async (req, res) => {
    let id = req.query.id;
    const { nama } = req.body;
    
    await prisma.categorie.update({
        where:{
            id: parseInt(id)
        },
        data:{
            nama: nama
        }
    });

    return res.status(200).send({
        message: 'data categorie was successfully updated!'
    });
});

router.delete(async (req, res) => {
    let id = req.query.id;
    
    await prisma.categorie.delete({
        where:{
            id: parseInt(id)
        }
    });
    
    return res.status(200).send({
        message:'data categorie was successfully deleted!'
    });
});

export default router.handler();
