import type { Prisma, Route, Service, User } from '../../../generated/prisma/client'
import type { DefaultPrismaClient } from '../../../generated/prisma/internal/prismaNamespace'
import type { Optional } from '../../common/Optional'

type UserWithRoles = Prisma.UserGetPayload<{include: {roles: true}}>
type RouteWithRoles = Prisma.RouteGetPayload<{include: {allowedRoles: true}}>
declare global {
    namespace Express {
        interface Request {
			apiKey: Optional<string>,
            serviceName: Optional<string>,
            serviceRequestPath: Optional<string>,
			routeObject: Optional<RouteWithRoles>,
			user: Optional<UserWithRoles>
        }
    }
}

export {}