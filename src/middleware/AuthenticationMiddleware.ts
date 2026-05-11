import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../common/prisma';

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
		}
	}
	if (req.apiKey != undefined) {
		let keyObj = await prisma.apiKey.findFirst({
			where: {
				keyText: req.apiKey
			},
			include: {
				owner: {
					include: {
						roles: true
					}
				}
			}
		}) ?? undefined
		if (keyObj == undefined) {
			req.apiKey = undefined
			next()
			return
		}
		req.user = keyObj.owner
	}
}