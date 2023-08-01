import prisma from "@/lib/prisma";
import apiHeaderMiddleware from "@/middleware/apiHeaderMiddleware";
import { createRouter } from "next-connect";
import multer from "multer";
let fileName = 'posts' + '-' + new Date().getDate();
const fs = require("fs");
const upload = multer({
    storage: multer.diskStorage({
        destination: './public/upload/content/',
        filename: (req, file, cb) => cb(null, getFileName(file)),
    })
});

const getFileName = (file) => {
    fileName += '-' + file.originalname.substring();
    return fileName;
}
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

router.use(upload.array("gambar"));
router.patch(async (req, res) => {
    const { id } = req.query;
    const { title, gambar, content, categorie } = req.body;

    const dataCategorie = await prisma.categorie.findFirst({
        where:{
            nama: categorie
        }
    });

    const dataArticle = await prisma.post.findUnique({
        where:{
            id: id
        }
    });
    const currentFile = dataArticle.contentPic;
    let data;
    if (gambar === 'null'){
        data = {
            title: title,
            content: content,
            categorieId: dataCategorie.id
        };
    } else {
        fs.unlinkSync('./public/upload/content/'+currentFile);
        data = {
            title: title,
            content: content,
            contentPic: fileName,
            categorieId: dataCategorie.id
        };
    }

    await prisma.post.update({
        where:{
            id: id
        },
        data: data
    });
    
    return res.status(200).send({
        message: `article with id: ${id} was updated successfully`
    });
});

export default router.handler();

export const config = {
    api:{
        bodyParser: false
    }
};



