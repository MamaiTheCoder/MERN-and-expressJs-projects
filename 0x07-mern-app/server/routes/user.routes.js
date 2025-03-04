import e from "express";

import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";


const router = e.Router();

router.route("/api/users")
    .get(userCtrl.list)
    .post(userCtrl.create);

router.route("/api/users/:userId")
    .get(
        authCtrl.requireSignin,
        userCtrl.read
    )
    .put(
        authCtrl.requireSignin,
        authCtrl.hasAuthorization,
        userCtrl.update
    )
    .delete(
        authCtrl.requireSignin,
        authCtrl.hasAuthorization,
        userCtrl.remove
    );


router.route('/api/users/photo/:userId')
    .get(userCtrl.photo, userCtrl.defaultPhoto);

router.route('/api/users/defaultphoto')
    .get(userCtrl.defaultPhoto);

router.param("userId", userCtrl.userByID);

export default router;
