import type { Response, Request, NextFunction } from 'express';
import {prisma} from '../common/prisma'
import { matchRoute } from '../common/RouteMatcher';
import type { Optional } from '../common/Optional';

function sanitizeRequestPath(requestPath: Optional<string>): string {
	if (/\?.*\//.exec(requestPath??"") != null) {
		throw "Illegal Argument, a slash cannot follow a question mark"
	}
	return requestPath?.split("?")[0] ?? ""
}

export async function ServicePresenceMiddleware(req: Request, res: Response, next: NextFunction) {
	if (req.serviceName == null) {
		next()
		return
	}

	const service = await prisma.service.findFirst({
		where: {
			name: req.serviceName
		},
		include: {
			routes: {
				include: {
					allowedRoles: true
				}
			}
		}
	})
	if (service == undefined) {
		res.status(404).end().send()
	}
	else {
		const matched = service.routes
			.filter((v) => matchRoute(v.path, sanitizeRequestPath(req.serviceRequestPath)))
		if (matched.length > 0) {
			req.routeObject = matched[0]!;
			next()
			return
		}
		res.status(404).end().send()
	}
}