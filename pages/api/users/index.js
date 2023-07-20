import { createRouter } from "next-connect";
import prisma from "@/lib/prisma";
import apiHeaderMiddleware from "@/middleware/apiHeaderMiddleware";
const router = createRouter();

const bcrypt = require("bcryptjs");
router.get(async (req, res) => {
    const result = await prisma.user.findMany({
        include:{
            role: true
        }
    });
    return res.json({
        data:result
    });
});
router.use(apiHeaderMiddleware);
router.post(async (req, res) => {
    const { firstName, lastName, username, password, status, role } = req.body;
    const dataRole = await prisma.role.findUnique({
        where:{
            nama: role
        }
    });
    const roleId = dataRole.id;
    await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: bcrypt.hashSync(password, 8),
            profile_pic: undefined,
            status:status,
            roleId: roleId
        }
    });
    
    return res.json({
        message:'data created successfully'
    });
});

export default router.handler();
