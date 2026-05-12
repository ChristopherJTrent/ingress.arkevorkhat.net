import {expect, test} from 'vitest'
import { matchRolesByName } from './Authorization'
test.for([
	{allowedRoles: ["admin"], userRoles: ["admin"], expected: true},
	{allowedRoles: ['admin.apiKey'], userRoles: ['admin'], expected: true},
	{allowedRoles: ['admin', 'user.create', 'user.update'], userRoles: ['apiKey.issue', 'filesystem.modify', 'media.download', 'user.create'], expected: true}
])('matchRolesByName($self, $other) -> $expected', ({allowedRoles, userRoles}) => {
	expect(matchRolesByName(allowedRoles, userRoles)).toBe(true)
})