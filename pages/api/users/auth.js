import prisma from "@/lib/prisma";
import { createRouter } from "next-connect";

import jwt from 'jsonwebtoken';
const bcrypt = require("bcryptjs");
const router = createRouter();

router.get(async (req, res) => {});
router.post(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({
            message:'some field is empty'
        });
    }
    const dataUser = await prisma.user.findUnique({
        where:{
            username:username
        }
    });

    if (!(dataUser && bcrypt.compareSync(password, dataUser.password))){
        return res.status(401).send({ message:"username or password is incorrect" });
    }

    const token = jwt.sign({sub: dataUser.id}, process.env.JWT_SECRET_KEY, {expiresIn:'7d'});
    const userJson = dataUser;
    delete userJson.password;

    return res.json({
        data:userJson,
        token:token
    });
});

export default router.handler();
