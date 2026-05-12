import type { Prisma, Route, Service, User } from '../../../generated/prisma/client'
import type { DefaultPrismaClient } from '../../../generated/prisma/internal/prismaNamespace'
import type { Optional } from '../../common/Optional'

declare type UserWithRoles = Prisma.UserGetPayload<{include: {roles: true}}>
declare type RouteWithRoles = Prisma.RouteGetPayload<{include: {allowedRoles: true}}>
declare global {
    namespace Express {
        interface Request {
			apiKey: Optional<string>,
			apiKeyObject: Optional<Prisma.ApiKeyGetPayload<{include: {roles: true}}>>,
            serviceName: Optional<string>,
            serviceRequestPath: Optional<string>,
			routeObject: Optional<RouteWithRoles>,
			user: Optional<UserWithRoles>,
			authorized: Optional<boolean>
        }
    }
}

export {}