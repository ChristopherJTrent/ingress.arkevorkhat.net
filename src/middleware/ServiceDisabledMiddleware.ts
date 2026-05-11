import type { Request, Response, NextFunction } from 'express';

export function ServiceDisabledMiddleware(req: Request, res: Response, next: NextFunction) {
	if (req.routeObject == undefined) {
		next()
		return
	}
	if (req.routeObject.disabled) {
		res.status(404).end().send()
		return
	}
	next()
}