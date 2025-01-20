import User from "../models/user.model.js";
import formidable from 'formidable';
import fs from 'fs';
import path from "path";

// extend is a method from the lodash library that allows us to merge two objects
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";
// import profileImage from './../dist/profile-pic.png';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name of the current module (equivalent to __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can use __dirname as usual:
const imagePath = path.join(__dirname, 'dist', 'profile-pic.png');



const create = async (req, res) => {
    const user = new User(req.body);
    console.log(user);

    try {
        await user.save();
        return res.status(200).json({
            message: "Successfully signed up!",
        });
    } catch (error) {
        console.log('Error in create controller: ', error.message)
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
        console.log('Error in list controller: ', error.message)
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
            return res.status(400).json({
                error: "User not found",
            });
        }
        req.profile = user;
        next();
    } catch (error) {
        console.log('Error in userByID controller: ', error.message)
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
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req, async(err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }
        let user = req.profile;
        user = extend(user, fields);
        user.updated = Date.now()
        
        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        try {
            await user.save();
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        } catch (error) {
            console.log('Error in update controller: ', error.message)
            return res.status(400).json({
                error: errorHandler.getErrorMessage(error),
            });
        }
    })
};

const remove = async (req, res, next) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (error) {
        console.log('Error in remove controller: ', error.message)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error),
        });
        
    }
};

const photo = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set("Content-Type", req.profile.photo.contentType);
        return res.send(req.profile.photo.data);
    }
    next();
}

const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() + profileImage)
}

export default { create, userByID, read, list, remove, update, defaultPhoto, photo };
