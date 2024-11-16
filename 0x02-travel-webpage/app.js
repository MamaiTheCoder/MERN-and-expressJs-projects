const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

const handlers = require('./lib/handlers');

// Configure Handlebars view engine
app.engine('handlebars', engine({
    defaultLayout: 'main', // Name of the default layout file
    // add custom helpers (e.g., for formatting dates, performing conditional logic, etc.
    helpers: {
        capitalize: (str) => str.toUpperCase()
    }
}))

// Disable the X-Powered-By header
app.disable('x-powered-by');

// middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false})); // parse the body of incoming HTTP requests

app.set('view engine', 'handlebars'); // Set view engine to handlebars

// Define the views folder
app.set('views', 'views');

const port = process.env.PORT || 3000;


app.get('/', handlers.home)

app.get('/about', handlers.about)

app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

// Custom 404 page
app.use(handlers.notFound)

// Custom 500 page
app.use(handlers.serverError)

// makes the app to be required as a module.
if (require.main === module) {
    app.listen(port, () => {
        console.log(
            `Express started on http://localhost:${port}; ` +
            `press Ctrl-C to terminate.`
        )
    })
}