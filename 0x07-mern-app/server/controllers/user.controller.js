import User from "../models/user.model.js";

// extend is a method from the lodash library that allows us to merge two objects
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";

const create = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        return res.status(200).json({
            message: "Successfully signed up!",
        });
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error),
        });
    }
};

const list = async (req, res) => {
    try {
        let user = await User.find().select("name email updated created");
        res.json(user);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error),
        });
    }
};

const userByID = async (req, res, next, id) => {
    // the app will execute the userByID controller
    // function, which fetches and loads the user into
    // the Express request object, before
    // propagating it to the next function that's
    // specific to the request that came in
    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status("400").json({
                error: "User not found",
            });
        }
        req.profile = user;
        next();
    } catch (error) {
        return res.status(400).json({
            error: "User not found",
        });
    }
};

const read = async (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

const update = async (req, res, next) => {
    try {
        let user = req.profile;
        user = extend(user, req.body);
        user.updated = Date.now();
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error),
        });
    }
};

const remove = async (req, res, next) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error),
        });
        
    }
};

export default { create, userByID, read, list, remove, update };
