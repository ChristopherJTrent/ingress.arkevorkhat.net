import type { Request, Response, NextFunction } from 'express';
import type { Optional } from '../common/Optional';
import { isSubset, or } from '../common/Functional';
import { STATUS_CODES } from 'http';
import { constants } from 'http2';

export function ServiceAuthorizationMiddleware(req: Request, res: Response, next: NextFunction): void {
	if (req.routeObject == undefined) {
		next()
		return
	}
	if (req.routeObject.allowAllRequests === true) {
		req.authorized = true
		next()
		return
	}
	if (req.user == undefined) {
		res.status(constants.HTTP_STATUS_UNAUTHORIZED).end().send()
		return
	} else {
		req.authorized = req.routeObject.allowedRoles.filter((v) => or(
			() => v.fqn in req.user!.roles.map(vv => vv.fqn),
			() => {
				const roleSegments = v.fqn.split(".")
				return req.user!.roles.some((role) => isSubset(roleSegments, role.fqn.split('.')))
			}
		)).length > 0
	}
}