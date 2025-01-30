import { signout } from "./api-auth";

const auth = {
    authenticate(jwt, cb) {
        // The authenticate method takes the JWT credentials, jwt, and a callback
        // function, cb, as arguments. It stores the credentials in sessionStorage after
        // ensuring window is defined, in other words ensuring this code is running in a
        // browser and hence has access to sessionStorage. Then, it executes the callback
        // function that is passed in
        if (typeof window !== "undefined") {
            sessionStorage.setItem('jwt', JSON.stringify(jwt));
        }
        cb();
    },
    isAuthenticated() {
        // A call to isAuthenticated() will return either the stored credentials or false,
        // depending on whether credentials were found in sessionStorage. Finding
        // credentials in storage will mean a user is signed in, whereas not finding credentials
        // will mean the user is not signed in
        if (typeof window === "undefined") {
            return false;
        }
        if (sessionStorage.getItem('jwt')) {
            return JSON.parse(sessionStorage.getItem('jwt'));
        } else {
            return false
        }
    },
    clearJWT(cb) {
        // This clearJWT method takes a callback function as an argument, and it removes the
        // JWT credential from sessionStorage. The passed in cb() function allows the
        // component initiating the signout functionality to dictate what should happen after a
        // successful sign-out. 
        if(typeof window !== "undefined") {
            sessionStorage.removeItem('jwt')
        }
        cb();
        signout().then((data) => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        })
    }
};

export default auth;
