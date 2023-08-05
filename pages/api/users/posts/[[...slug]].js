import prisma from "@/lib/prisma";
import { createRouter } from "next-connect";
import apiHeaderMiddleware from "@/middleware/apiHeaderMiddleware";
import multer from "multer";
const fs = require('fs');
let fileName = 'posts' + '-' + new Date().getDate();
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

router.get(async (req, res) => {
    let query = req.query.slug;
    const [ id, published ] = query;
    let typePublished = true
    let result;
    const user = await prisma.user.findUnique({
        where:{
            id: parseInt(id)
        },
        include:{
            role: true
        }
    });
    let role = user.role.nama;
    if (role === 'Administrator' || role === 'Publisher'){
        if (published === 'draft'){
            typePublished = false;
            result = await prisma.post.findMany({
                where:{
                    published: typePublished
                },
                include: {
                    categorie: true,
                    author: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        } else {
            typePublished = true;
            result = await prisma.post.findMany({
                where:{
                    published: typePublished
                },
                include: {
                    categorie: true,
                    author: true
                },
                orderBy: {
                    publishAt: 'desc'
                }
            });
        }
    } else {
        if (published === 'draft'){
            typePublished = false
            result = await prisma.post.findMany({
                where:{
                    AND: [
                        {authorId: parseInt(id)},
                        {published: typePublished}
                    ],
                },
                include: {
                    categorie: true,
                    author: true
                },
                orderBy:{
                    createdAt: 'desc',
                }
            });
        } else {
            result = await prisma.post.findMany({
                where:{
                    AND: [
                        {authorId: parseInt(id)},
                        {published: typePublished}
                    ],
                },
                include: {
                    categorie: true,
                    author: true
                },
                orderBy: {
                    publishAt: 'desc'
                }
            });
        }
    }
    
    
    // const result = await prisma.user.findUnique({
    //     where:{
    //         id:parseInt(id)
    //     },
    //     include: {
    //         posts:{
    //             where:{
    //                 published:typePublished
    //             }
    //         }
    //     }
    // });
    
    return res.json({
        data:result
    });
});
router.use(apiHeaderMiddleware);
router.use(upload.array("gambar"));
router.post(async (req, res) => {
    const [ id ] = req.query.slug;

    if (!id){
        return res.status(401).send({ message:'Unauthorized' });
    }

    // const { title, content, categorie , published } = req.body;

    // console.log(req.body.title);
    const { title, content, categorie, published } = req.body;

    const dataCategorie = await prisma.categorie.findFirst({
        where:{
            nama: categorie
        }
    });

    
    
    await prisma.post.create({
        data:{
            title:title,
            contentPic:fileName,
            content: content,
            categorieId: dataCategorie.id,
            authorId: parseInt(id),
            published:false
        }
    });

    return res.status(200).send({
        message: 'data was article was uploaded!'
    });
});

router.delete(async (req, res) => {
    const [ id ] = req.query.slug;
    
    const dataPost = await prisma.post.findUnique({
        where:{
            id: id
        }
    });

    const currentFileName = dataPost.contentPic;
    fs.unlinkSync('./public/upload/content/'+currentFileName);

    await prisma.post.delete({
        where:{
            id: id
        }
    });

    return res.status(200).send({
        message: `post with id: ${id} successfully deleted!`
    });
});

router.patch(async (req, res) => {
    const [ id ] = req.query.slug;
    const date = new Date();
    const currentDate = date.toISOString();
    await prisma.post.update({
        where:{
            id: id
        },
        data:{
            published: true,
            publishAt: currentDate
        }
    });

    return res.status(200).send({
        message: 'article was published!'
    });
});


export default router.handler();

export const config = {
    api: {
        bodyParser: false,
    }
};