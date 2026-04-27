import type { Response, Request, NextFunction } from 'express';
import {prisma} from '../common/prisma'
export async function ServicePresenceMiddleware(req: Request, res: Response, next: NextFunction) {
	if (req.serviceName == null) {
		next()
		return
	}
	const service = await prisma.service.findFirst({
		where: {
			name: req.serviceName
		}
	})
	if (service == undefined) {
		res.status(404).end()
	}
	else {
		next()
	}
}