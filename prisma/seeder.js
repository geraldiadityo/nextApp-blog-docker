const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
    const dataUser = [
        {
            firstName: 'Geraldi',
            lastName: 'Adityo',
            username: 'superadmin',
            password: bcrypt.hashSync('Ge@140019',8),
            profile_pic: undefined,
            status: true,
            roleId:1
        }
    ];

    const dataRole = [
        {
            nama: 'Administrator'
        }
    ];

    for (const role of dataRole) {
        await prisma.role.create({
            data:role
        });
    }

    for (const user of dataUser) {
        await prisma.user.create({
            data:user
        });
    }
    
    console.log('seeder data has completed!');
}

main()
    .catch((err) => {
        console.error(err);
    })
    .finally(async () => {
        await prisma.$disconnect;
    });

