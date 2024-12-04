import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    // generate JWT_SECRET with open rand -base64 32
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true, // prevents XSS attacks cross-site scripting attacks
        sameSite: 'strict', // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== 'development' // cookie only works in https
    })
};

export default generateTokenAndSetCookie;