'use strict';

import five from 'johnny-five';
import Weather from '../api/weather/weather.model'

var Board = new five.Board();

export function init() {
  Board.on('ready', function () {

    // Indoor Temperature
    new five.Thermometer({
      pin: 'A0',
      freq: 100000,
      toCelsius: function (raw) {
        var CELSIUS_TO_KELVIN = 273.15;
        var adcres = 1023;
        var beta = 3975;
        var rb = 10000;
        var tempr = 298.15;

        var rthermistor = (adcres - raw) * rb / raw;
        var tempc = 1 / (Math.log(rthermistor / rb) / beta + 1 / tempr) - CELSIUS_TO_KELVIN;

        return tempc;
      }
    }).on('data', function () {
      saveWeather('indoorTemp', round(this.celsius));
    });

    // Outdoor Temperature
    new five.Thermometer({
      controller: 'DS18B20',
      pin: 2,
      freq: 100000
    }).on('data', function () {
      saveWeather('outdoorTemp', round(this.celsius));
    });

    // Pressure
    new five.Barometer({
      controller: 'BMP085',
      freq: 100000
    }).on('data', function () {
      saveWeather('pressure', round(this.pressure * 10));
    });
  });
}

function saveWeather(type, value) {
  new Weather({
    date: new Date(),
    type: type,
    value: value
  }).save();
}

function round(value) {
  return Math.round(value * 10) / 10
}
