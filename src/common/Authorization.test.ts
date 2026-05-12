import {expect, test} from 'vitest'
import { matchRolesByName } from './Authorization'
test.for([
	{allowedRoles: ["admin"], userRoles: ["admin"], expected: true},
	{allowedRoles: ['admin.apiKey'], userRoles: ['admin'], expected: true}
])('matchRolesByName($self, $other) -> $expected', ({allowedRoles, userRoles}) => {
	expect(matchRolesByName(allowedRoles, userRoles)).toBe(true)
})