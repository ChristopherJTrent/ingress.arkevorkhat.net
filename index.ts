import { getLogger } from '@logtape/logtape';
import { configureLogger } from './src/common/logger';
import { prisma } from "./src/common/prisma";
import { app } from './src/router/ExpressApplication';
import { router } from './src/router/RootRouter';
import * as express from 'express'
import { ApiKeyFactory } from './src/common/ApiKeyFactory';
import { exit } from 'process';

async function main() {
	await configureLogger();
	const logger = getLogger(['ingress.arkevorkhat.net', 'moduleMain'])
	logger.debug `logger configured successfully\n`
	let rootUser
	if (await prisma.apiKey.count() < 1) {
		let adminRole
		if (await prisma.role.count() < 1) {
			logger.debug `admin role not found, creating...`
			adminRole = await prisma.role.create({
				data: {
					fqn: 'admin',
					description: 'Administrator role, bypasses authorization entirely. Do not give this to users unless you want them to have full access.'
				}
			})
		} else {
			adminRole = await prisma.role.findFirst({
				where: {
					fqn: 'admin'
				}
			})
		}
		logger.debug `admin role found ${adminRole}`
		if (await prisma.user.count() < 1) {
			logger.debug `root user not found, creating...`
			rootUser = await prisma.user.create({
				data: {
					username: 'root',
					password_hash: 'LOGIN_NOT_PERMITTED',
					roles: {
						connect: {
							fqn: 'admin'
						}
					}
				}
			})
			logger.debug `root user created: ${rootUser}`
		} else {
			rootUser = await prisma.user.findFirst({
				where: {username: 'root'},
				include: {roles: true}
			})
		}
		if (rootUser == undefined || rootUser == null) {
			logger.fatal `root user is unexpectedly null. closing...`
			exit(1)
		}
		const keyFactory = new ApiKeyFactory(rootUser);
		const key = await keyFactory.get()
		logger.debug`generated firstrun api key ${key}`
	}
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