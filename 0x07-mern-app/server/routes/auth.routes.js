import e from "express";

import authCtrl from "../controllers/auth.controller.js";

const router = e.Router();

router.route("/api/auth/signin")
    .post(authCtrl.signin);

router.route("/api/auth/signout")
    .get(authCtrl.signout);

export default router;
