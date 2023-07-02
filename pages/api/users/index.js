import { createRouter } from "next-connect";
import prisma from "@/lib/prisma";

const router = createRouter();

router.get(async (req, res) => {
    const result = await prisma.user.findMany({
        where:{
            status:true
        }
    });
    return res.json({
        data:result
    });
});

router.post(async (req, res) => {
    const { firstName, lastName, username, password, profile_pic, status } = req.body;
    
    await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            profile_pic: profile_pic,
            status:status
        }
    });
    
    return res.json({
        message:'data created successfully'
    });
});

export default router.handler();
