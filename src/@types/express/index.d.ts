import type { Route, Service } from '../../../generated/prisma/client'

declare global {
    namespace Express {
        interface Request {
            serviceName: string?,
            serviceRequestPath: string?,
			routeObject: Route?
        }
    }
}

export {}