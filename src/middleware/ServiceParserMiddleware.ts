import type {  Request, Response, NextFunction } from "express";

export function ServiceParserMiddleware(req: Request, res: Response, next: NextFunction) {
    if(req.path.startsWith("/admin")) {
        next()
    } else {
        const segments = req.path.split("/").filter(Boolean)
        if (segments[0] == undefined) {
            next()
            return
        }
        req.serviceName = segments[0]
		if (segments.length == 1) {
			req.serviceRequestPath = "/"
		} else {
			req.serviceRequestPath = segments.slice(1).join("/")
		}
    }
}