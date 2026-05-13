import {Router, type Request, type Response} from 'express'
import { prisma } from '../common/prisma';
const router = Router();
router.get('/', async (req, res) => {
	const roles = await prisma.role.findMany()
	res.json(roles).send();
})

export {router as rolesController}