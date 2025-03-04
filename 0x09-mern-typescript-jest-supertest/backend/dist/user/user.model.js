"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const UserSchema = new mongoose_1.default.Schema()({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        trim: true,
        unique: [true, "Email already exists"],
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        required: [true, "Email is required"],
    },
    hashed_password: {
        type: String,
        required: [true, "Password is required"],
    },
    salt: String,
}, {
    timestamps: true,
});
UserSchema.virtual("password")
    .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
})
    .get(function () {
    return this.hashed_password;
});
UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) {
            return "";
        }
        try {
            return crypto_1.default
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        }
        catch (error) {
            return "";
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + "";
    },
};
UserSchema.path("hashed_password").validate(function (v) {
    if (this._password && this._password.length < 6) {
        this.invalidate("password", "Password must be at least 6 characters.");
    }
    if (this.isNew && !this._password) {
        this.invalidate("password", "Password is required.");
    }
});
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
