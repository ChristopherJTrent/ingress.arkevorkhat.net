import { prisma } from "./src/common/prisma";

async function main() {
    const user = await prisma.user.create({
        data: {
            username:"testUser",
            password_hash: "invalid",
        }
    })
    console.log("created user: ", user)
    const allUsers = await prisma.user.findMany({
        include: {
            apiKeys: true
        }
    })
    console.log("All Users: ", JSON.stringify(allUsers))
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})