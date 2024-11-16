const express = require('express');
const { engine } = require('express-handlebars');
const app = express();

const fortune = require('./lib/fortune');
const handlers = require('./lib/handlers');

// Configure Handlebars view engine
app.engine('handlebars', engine({
    defaultLayout: 'main', // Name of the default layout file
    // add custom helpers (e.g., for formatting dates, performing conditional logic, etc.
    helpers: {
        capitalize: (str) => str.toUpperCase()
    }
}))

// middleware
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'handlebars'); // Set view engine to handlebars

// Define the views folder
app.set('views', 'views');

const port = process.env.PORT || 3000;


app.get('/', handlers.home)

app.get('/about', handlers.about)

// Custom 404 page
app.use(handlers.notFound)

// Custom 500 page
app.use(handlers.serverError)

app.listen(port, () => {
    console.log(
        `Express started on http://localhost:${port}; ` +
        `press Ctrl-C to terminate.`
    )
})