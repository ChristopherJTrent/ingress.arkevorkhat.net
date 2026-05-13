import { Router } from 'express';
import { rolesController } from '../controller/roles';

const router: Router = Router()

router.use('/roles', rolesController)

export {router}