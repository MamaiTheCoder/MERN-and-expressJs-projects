const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const app = express();

const { credentials } = require("./config");
const handlers = require("./lib/handlers");
const weatherMiddleware = require("./lib/middleware/weather");

// Configure Handlebars view engine
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main", // Name of the default layout file
    // add custom helpers (e.g., for formatting dates, performing conditional logic, etc.
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
      capitalize: (str) => str.toUpperCase(),
    },
  })
);

// Disable the X-Powered-By header
app.disable("x-powered-by");

// middleware
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(credentials.cookieSecret));
// make sure to link coolie middleware before session middleware.
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
  })
);
app.use(bodyParser.urlencoded({ extended: true })); // parse the body of incoming HTTP requests. req.body now becomes available
app.use(weatherMiddleware);

app.set("view engine", "handlebars"); // Set view engine to handlebars

// Define the views folder
app.set("views", "views");

const port = process.env.PORT || 3000;

app.get("/", handlers.home);
app.get("/section-test", handlers.sectionTest);

app.get("/about", handlers.about);

app.get("/newsletter-signup", handlers.newsletterSignup);

app.get("/newsletter-signup/process", handlers.newsletterSignupProcess);

app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

app.get("/headers", (req, res) => {
  res.type("text/plain");
  const headers = Object.entries(req.headers).map(
    ([key, value]) => `${key}: ${value}`
  );
  res.send(headers.join("\n"));
});

// Custom 404 page
app.use(handlers.notFound);

// Custom 500 page
app.use(handlers.serverError);

// makes the app to be required as a module.
if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}; ` +
        `press Ctrl-C to terminate.`
    );
  });
} else {
  module.exports = app;
}
