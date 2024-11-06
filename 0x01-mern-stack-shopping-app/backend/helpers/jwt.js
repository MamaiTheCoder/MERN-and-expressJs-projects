const { model } = require('mongoose');

const expressJwt = require('express-jwt').expressjwt; // For newer versions

function authjwt () {
    const secret = process.env.secret;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked, // we specify if the use is admin or not
    }).unless({ // locates apis to be excluded
        path: [
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS']}, // refer to reger101 website
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']}, // refer to reger101 website
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']}, // refer to reger101 website
            '/api/v1/users/login',
            '/api/v1/users/register',
        ],
    })
}

async function isRevoked (req, payload, done) {
    if(!payload.isAdmin) {
        // if isAdmin is false, reject the token.
        done(null, true)
    }

    // if isAdmin is true, accept the token.
    done();
}
module.exports = authjwt;