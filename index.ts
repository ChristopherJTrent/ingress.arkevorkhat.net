import { getLogger } from '@logtape/logtape';
import { configureLogger } from './src/common/logger';
import { prisma } from "./src/common/prisma";
import { app } from './src/router/ExpressApplication';
import { router } from './src/router/RootRouter';
import * as express from 'express'

async function main() {
	await configureLogger();
	const logger = getLogger(['ingress.arkevorkhat.net', 'moduleMain'])
	logger.debug `logger configured successfully\n`
    const allUsers = await prisma.user.findMany({
        include: {
            apiKeys: true
        }
    })
    console.log("All Users: ", allUsers)
	const PORT = process.env.LISTEN_PORT ?? 8080
	app.listen(PORT, () => {
		logger.info `express is running on port ${PORT}`
	});
}


main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})