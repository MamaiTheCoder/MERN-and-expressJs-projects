import express from 'express';
import { getUsers } from '../controllers/user.controller';

const router = express.Router();

router.get('/users', getUsers);

export default router;