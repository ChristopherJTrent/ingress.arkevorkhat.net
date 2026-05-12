import type { Request, Response, NextFunction } from 'express';
import type { Optional } from '../common/Optional';
import { isSubset, or } from '../common/Functional';
import { STATUS_CODES } from 'http';
import { constants as http} from 'http2';
import { matchRolesByName } from '../common/Authorization';

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
	if (req.user == undefined || req.apiKeyObject == undefined) {
		res.status(http.HTTP_STATUS_UNAUTHORIZED).end().send()
		return
	} else {
		req.authorized = matchRolesByName( //ensure that the API key was given the scope required
			req.routeObject.allowedRoles.map(v => v.fqn),
			req.apiKeyObject.roles.map(v => v.fqn)
		) && matchRolesByName( //ensure that the user also has the required role
			req.routeObject.allowedRoles.map((v) => v.fqn),
			req.user.roles.map((v) => v.fqn)
		);
	}
}