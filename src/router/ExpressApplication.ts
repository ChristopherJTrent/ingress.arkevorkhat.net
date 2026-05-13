import * as Express from 'express'
import { AuthenticationMiddleware } from '../middleware/AuthenticationMiddleware'
import { ServicePresenceMiddleware } from '../middleware/ServicePresenceMiddleware'
import { ServiceParserMiddleware } from '../middleware/ServiceParserMiddleware'
import { ServiceDisabledMiddleware } from '../middleware/ServiceDisabledMiddleware'
import { ServiceAuthorizationMiddleware } from '../middleware/ServiceAuthorizationMiddleware'
import { router as adminRouter } from './RootRouter'
import { LoggerMiddleware } from '../middleware/LoggerMiddleware'
import { middleware as openApi } from 'express-openapi-validator'

const app = Express.default()

app.use([
	Express.json(),
	LoggerMiddleware,
	AuthenticationMiddleware,
	ServiceParserMiddleware,
	ServicePresenceMiddleware,
	ServiceDisabledMiddleware,
	ServiceAuthorizationMiddleware
])

app.use("/admin", [
	...openApi({
		apiSpec: 'src/api/ingress.yaml',
		validateRequests: true,
		validateResponses: true
	}),
	(err, req, res, next) => {
		if(err == undefined) {
			next()
			return
		}
		res.status(err.status || 500).json({
			message: err.message,
			errors: err.errors
		})
	},
	adminRouter
])

export { app } 