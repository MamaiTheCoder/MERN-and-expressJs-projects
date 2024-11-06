const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


const api = process.env.API_URL


const app = express();

app.use(cors());
app.options('*', cors())

// middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// Database
mongoose.connect('mongodb+srv://jmakoks:cNSXgJvJLDIP6mxM@cluster0.wytu0.mongodb.net/eshop-database?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('database connected successful')
}).catch((error) => {
    console.log(error)
})

// Server
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
});
