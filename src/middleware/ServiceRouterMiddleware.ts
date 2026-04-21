import type {  Request, Response, NextFunction } from "express";
import { Router } from "express";
Router().use((a, b, c) => {})

export function ServiceRouterMiddleware(req: Request, res: Response, next: NextFunction) {
    if(req.path.startsWith("/admin")) {
        next()
    } else {
        const segments = req.path.split("/").filter(Boolean)
        if (segments[0] == undefined) {
            next()
            return
        }
        req.serviceName = segments[0]
        req.serviceRequestPath = segments.slice(1).join("/")
    }
}