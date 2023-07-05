import prisma from "@/lib/prisma";
import { createRouter } from "next-connect";
import apiHeaderMiddleware from "@/middleware/apiHeaderMiddleware";
import multer from "multer";

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

router.use(apiHeaderMiddleware);
router.get(async (req, res) => {
    let query = req.query.slug;
    const [ id, published ] = query;
    let typePublished = true
    if (published === 'draft'){
        typePublished = false
    }

    const result = await prisma.user.findUnique({
        where:{
            id:parseInt(id)
        },
        include: {
            posts:{
                where:{
                    published:typePublished
                }
            }
        }
    });

    return res.json({
        data:result
    });
});
router.use(upload.array("gambar"));
router.post(async (req, res) => {
    let userId = req.query.user;
    if (!userId){
        return res.status(401).send({ message:'Unauthorized' });
    }

    const { title, gambar, content, published } = req.body;
    
    await prisma.post.create({
        data:{
            title:title,
            contentPic:fileName,
            content: content,
            published:published
        }
    });

    return res.json({
        message :'successfully created!'
    });
});

export default router.handler();

export const config = {
    api: {
        bodyParser: false
    }
};