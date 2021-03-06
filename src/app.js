const path = require('path');

const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');

const geocode = require('./Utils/geocode');
const forecast = require('./Utils/forecast');


const app = express();
const port = process.env.PORT || 3000; //Heroku port environment variable

//Define paths for Express Config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew'
  });
});


app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Andrew Mead bruh',
    message: 'This is a simple message'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Andrew Mead'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.'
    });
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

    if (error) {
      return res.send({
        error: error
      });
    }
  
    forecast(longitude, latitude, (error, forecastData) => {
  
      if (error) {
        return res.send({
          error: error
        });
      }

      res.send({
        location,
        forecastData
      });
    });
  
  });

});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Error 404',
    name: 'Andrew Mead',
    errorMessage: 'Help article not found.'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error 404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found.'
  });
});


app.listen(port, () => {
  console.log('Server is up on port' + port + '.');
}); //port 80 normal, 3000 development port