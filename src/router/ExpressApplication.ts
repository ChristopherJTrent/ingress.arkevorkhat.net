import * as Express from 'express'
import { AuthenticationMiddleware } from '../middleware/AuthenticationMiddleware'
import { ServicePresenceMiddleware } from '../middleware/ServicePresenceMiddleware'
import { ServiceParserMiddleware } from '../middleware/ServiceParserMiddleware'
import { ServiceDisabledMiddleware } from '../middleware/ServiceDisabledMiddleware'
import { ServiceAuthorizationMiddleware } from '../middleware/ServiceAuthorizationMiddleware'
import { router } from './RootRouter'

const app = Express.default()

app.use([
	AuthenticationMiddleware,
	ServiceParserMiddleware,
	ServicePresenceMiddleware,
	ServiceDisabledMiddleware,
	ServiceAuthorizationMiddleware
])

app.use("/admin", router)

export { app } 