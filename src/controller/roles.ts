import {Router, type Request, type Response} from 'express'
import { prisma } from '../common/prisma';
import type { Optional } from '../common/Optional';
import { getLogger } from '@logtape/logtape';

const logger = getLogger(['ingress.arkevorkhat.net', 'rolesController'])

const router = Router();
router.get('/', async (req, res) => {
	const roles = await prisma.role.findMany()
	res.json(roles).send();
})
router.post('/create', async (req, res) => {
	try{
		logger.debug `${req.body}`
		const body = req.body as { fqn: string, description: string }
		const created = await prisma.role.create({
			data: {
				fqn: body.fqn,
				description: body.description
			}
		})
		if (created != undefined) {
			res.status(201).end().send()
		}
	} catch (e) {
		logger.debug `error: ${e}`
		res.status(500).json(e)
	}
})

export {router as rolesController}