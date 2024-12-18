const fortune = require("./fortune");

exports.home = (req, res) => res.render("home");
exports.sectionTest = (req, res) => res.render("section-test");

exports.about = (req, res) =>
  res.render("about", { fortune: fortune.getfortune() });

exports.notFound = (req, res) => res.render("404");

exports.newsletterSignup = (req, res) => {
  console.log('newsletterSignup')
  res.render("newsletter-signup", { csrf: "CRF token goes here" });
};

exports.newsletterSignupProcess = (req, res) => {
  console.log("Form (from querystring): " + req.query.form);
  console.log("CSRF token (from hidden form field): " + req.body._csrf);
  console.log("Name (from visible form field): " + req.body.name);
  console.log("Email (from visible form field): " + req.body.email);
  res.redirect(303, "/newsletter-signup/thank-you");
};

exports.newsletterSignupThankYou = (req, res) => {
  res.render("newsletter-signup-thank-you");
};

// Express recognizes the error handler by way of its four
// arguments, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render("500");
/* eslint-enable no-unused-vars */
