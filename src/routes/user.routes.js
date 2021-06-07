import { Router } from 'express'

const router = Router();

import * as userCtr from '../controllers/user.controller'
const { checkToken } = require('../auth/token_validation');

router.get('/', checkToken,userCtr.readAllUsuario);
router.get('/:id', userCtr.readUsuario);
router.delete('/:id', checkToken, userCtr.deleteUsuario);
router.put('/:id', checkToken, userCtr.updateUsuario);
router.post('/', userCtr.createUsuario);

export default router;