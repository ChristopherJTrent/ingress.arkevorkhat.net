import type { Prisma } from '../../generated/prisma/client';
import { isSubset, or } from './Functional';

export function matchRolesByName(allowedRoles: string[], userRoles: string[]) {
	return allowedRoles.some((v) => 
		v in userRoles
	||	userRoles.some(role => isSubset(v.split('.'), role.split('.'))
	))
}