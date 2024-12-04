const getWeatherData = () => [
  {
    location: {
      name: "Portland",
    },
    forecastUrl: "https://api.weather.gov/gridpoints/PQR/112,103/forecast",
    iconUrl: "https://api.weather.gov/icons/land/day/tsra,40?size=medium",
    weather: "Chance Showers And Thunderstorms",
    temp: "59 F",
  },
  {
    location: {
      name: "Bend",
    },
    forecastUrl: "https://api.weather.gov/gridpoints/PDT/34,40/forecast",
    iconUrl: "https://api.weather.gov/icons/land/day/tsra_sct,50?size=medium",
    weather: "Scattered Showers And Thunderstorms",
    temp: "51 F",
  },
  {
    location: {
      name: "Manzanita",
    },
    forecastUrl: "https://api.weather.gov/gridpoints/PQR/73,120/forecast",
    iconUrl: "https://api.weather.gov/icons/land/day/tsra,90?size=medium",
    weather: "Showers And Thunderstorms",
    temp: "55 F",
  },
];

// res.locals is an object that provides a way to pass data from the
// server-side to the view templates (or even other middleware) during
// the lifecycle of a request
// Data stored in res.locals can be accessed directly by the view
// templates when rendering the page
// You can set properties on res.locals in middleware so that the
// data can be used by downstream middleware or the final route handler.
const weatherMiddleware = (req, res, next) => {
    if (!res.locals.partials) res.locals.partials = {}
    res.locals.partials.weatherContext = getWeatherData()
    next()
};

module.exports = weatherMiddleware
