import express from 'express';

import userCtrl from '../controllers/user.controllers'

const router = express.Router();

router.route('/users')
    .get(userCtrl.list)
    .post(userCtrl.create);

router.route('/users/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router;
