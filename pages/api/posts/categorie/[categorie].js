import prisma from "@/lib/prisma";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(async (req, res) => {
    const { categorie } = req.query;

    const dataCategorie = await prisma.categorie.findFirst({
        where:{
            nama: categorie,
        }
    });

    const result = await prisma.post.findMany({
        where:{
            AND: [
                {categorieId: dataCategorie.id},
                {published: true}
            ],
        },
        include:{
            categorie: true,
            author: true
        }
    });

    return res.status(200).send({
        data: result
    });

});

export default router.handler();
