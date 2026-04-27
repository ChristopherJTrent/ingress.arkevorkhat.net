import type { Request, Response, NextFunction } from 'express';
import type { Optional } from '../common/Optional';

export function ServiceAuthorizationMiddleware(req: Request, res: Response, next: NextFunction): void {
	let apiKey: Optional<string> = undefined
	const authHeader = req.header("Authorization")
	if(authHeader != undefined) {
		const rxp = /(?:Bearer )([a-zA-Z0-9]{32})/
		const matchObj = rxp.exec(authHeader)
		if(matchObj != undefined) {
			apiKey = matchObj[0]
		}
	} else if (req.method in ["POST", "PUT"]){
		if(req.body != undefined && req.body.APIkey != null) {
			apiKey = req.body.APIkey
		}
	}
	if (apiKey == undefined) {
		
	} else {
		
	}
}