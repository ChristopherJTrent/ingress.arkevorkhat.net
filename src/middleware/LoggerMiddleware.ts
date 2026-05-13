import { getLogger } from '@logtape/logtape'
import type {Request, Response, NextFunction} from 'express'
const logger = getLogger(['ingress.arkevorkhat.net', 'requestLogger'])
export function LoggerMiddleware(req: Request, res: Response, next: NextFunction) {
	logger.debug `request to: ${req.path} from ${req.ip}`
	next()
}