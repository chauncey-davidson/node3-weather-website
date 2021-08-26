const request = require('postman-request');

// request({url: url, json: true}, (error, response) => {

//   if (error) {
//     console.log('Unable to connect to weather service.');
//   } else if (response.body.error) {
//     console.log('Unable to find location.');
//   } else {
//     const data = response.body.current;
//     console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + data.temperature + ' degrees out. It feels like ' + data.feelslike + ' degrees out.');
//   }
  
// });

const forecast = (latitude, longitude, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=adc6a0ac0c8b2af22a4d463bd391a397&query=' + longitude + ',' + latitude + '&units=f';

  request({url, json: true}, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service.');
    } else if (body.error) {
      callback('Unable to find location.');
    } else {
      callback(undefined, body.current.weather_descriptions[0] + '. ' + body.current.temperature + ' degrees, feels like ' + body.current.feelslike + ' degrees.');
    }
  });

};


module.exports = forecast;