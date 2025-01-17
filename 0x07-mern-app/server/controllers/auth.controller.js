import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

console.log(expressJwt);

const signin = async (req, res) => {
    try {
        let user = await User.findOne({
            "email": req.body.email,
        });

        if (!user) {
            return res.status("401").json({
                error: "User not found",
            });
        }

        if (!user.authenticate(req.body.password)) {
            return res.status("401").send({
                error: "Email and password don't match.",
            });
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET
        )

        res.cookie("t", token, {
            expire: new Date() + 9999,
        });

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(401).json({
            error: "Could not sign in",
        });
    }
};

const signout = (req, res) => {
    res.clearCookie("t");
    return res.status("200").json({
        message: "signed out",
    });
};

// express-jwt verifies that the incoming request has
// a valid JWT in the Authorization header. If the token
// is valid, it appends the verified user's ID in an
// 'auth' key to the request object;
// otherwise, it throws an authentication error
const requireSignin = expressJwt.expressjwt({
    secret: "my_secret_key",
    algorithms: ['HS256'],
    userProperty: 'auth',  // Attach decoded JWT payload to `req.auth`
})

const hasAuthorization = (req, res) => {
    // req.auth object is populated by express-jwt in
    // requireSignin after authentication verification
    // has taken place
    // req.profile is populated by the userByID
    // function in user.controller.js
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!authorized) {
        return res.status('403').json({
            error: "User is not authorized",
        });
    }
    next();
};

export default { signin, signout, requireSignin, hasAuthorization };
