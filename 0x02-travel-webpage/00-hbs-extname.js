const express = require('express');
const { engine } = require('express-handlebars');

const handlers = require('./lib/handlers');
const weatherMiddleware = require('./lib/middleware/weather');

const app = express();

//configure Handlebarsview engine
app.engine('hbs', engine({
    defaultLayout: '00-main',
    extname: '.hbs',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    }
}))

app.set('view engine','hbs')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('00-home'))

app.listen(port, () => {
    console.log(
        `Express started on http://localhost:${port}` +
        '; press Ctrl-C to terminate.'
    )
})