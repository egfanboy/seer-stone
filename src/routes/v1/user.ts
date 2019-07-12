import express from 'express';
import UserController from '../../controllers/user/user';
// import validateRegister from '../../middleware/user/validate-register';
// import validateLogin from '../middleware/user/validate-login';
// import checkActivationToken from '../middleware/user/check-activation-token';
import authentication from '../../middleware/authentication';
import { check } from 'express-validator';

const router = express.Router();

const UserCtrl = new UserController();

import validateRegister from '../../middleware/user/validate-register';
import validateUpdate from '../../middleware/user/validate-update';

router.post('/users/register', validateRegister, UserCtrl.register);
router.patch('/users/:userId', validateUpdate, UserCtrl.update);
// router.post('/login', validateLogin, UserController.login);
// router.post(
//     '/activate/:userId/:token',
//     checkActivationToken,
//     UserController.activate
// );

// router.get('/user', authentication, UserController.get);

export default router;
