import express from 'express';

import userRouter from './v1/user';
const router = express.Router();

router.use('/api', userRouter);

export default router;
