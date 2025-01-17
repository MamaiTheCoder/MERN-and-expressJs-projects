import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
});
// password string that's provided by the user is not
// stored directly in the user document. Instead,
// it is handled as a virtual field.

UserSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// encryption logic and salt generation logic are used to
// generate the hashed_password and salt values
// representing the password value, are defined as
// UserSchema methods

UserSchema.methods = {
  authenticate: function (plainText) {
    /* called to verify sign-in attempts by matching the
    user-provided password text with the hashed_password
    stored in the database for a specific user
     */
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    // generate an encrypted hash from the plain-text password
    // and a unique salt value using the cryptomodule from Node
    // If the password is not provided, an empty string is returned
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    // generates a unique and random salt value using
    // the current timestamp at execution and Math.random()
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

// add custom validation constraints to the actual password
// string that's selected by the end user,

UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    // if the password is less than 6 characters long,
    // the user document will not be saved to the database
    // and an error message will be returned to the user
    // to notify them of the error
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    // if the hashed_password field is not set, the user
    // document will not be saved to
    // the database and an error message will be returned
    // to the user
    this.invalidate("password", "Password is required");
  }
}, null);

const User = mongoose.model("User", UserSchema);

export default User;
