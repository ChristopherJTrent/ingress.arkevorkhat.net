import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../common/prisma';
import { getLogger } from '@logtape/logtape';

const logger = getLogger(['ingress.arkevorkhat.net', 'Authentication'])

export async function AuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.header("Authorization")
	if(authHeader != undefined) {
		const rxp = /(?:Bearer )([a-zA-Z0-9]{32})/
		const matchObj = rxp.exec(authHeader)
		if(matchObj != undefined) {
			req.apiKey = matchObj[0]
		}
	} else if (req.method in ["POST", "PUT"]) {
		if(req.body != undefined && req.body.APIkey != null) {
			req.apiKey = req.body.APIkey
			logger.debug`API key provided as part of request body to ${req.path}`
		}
	} else {
		logger.debug`Authorization not provided on request to ${req.path}`
	}
	if (req.apiKey != undefined) {
		let keyObj = await prisma.apiKey.findFirst({
			where: {
				keyText: req.apiKey,
			},
			include: {
				owner: {
					include: {
						roles: true
					},
					omit: {
						password_hash: true
					}
				},
				roles: true
			}
		}) ?? undefined
		if (keyObj == undefined) {
			req.apiKey = undefined
			next()
			return
		} else if (keyObj.expires_at < new Date()) {
			await prisma.apiKey.delete({ where: {
				id: keyObj.id
			}})
			logger.debug`deleted expired API key ${keyObj.keyText} for user ${keyObj.owner.username}`
			req.apiKeyObject = undefined
			req.apiKey = undefined
			req.user = undefined
		} else {
			req.apiKeyObject = keyObj
			req.user = keyObj.owner
		}
	}
	next()
}