'use strict';

class WeatherController {

  private socket: Object;
  private weather: Object;

  public weathers: Object[] = [];
  public currentWeather = {
    indoorTemp: Number,
    outdoorTemp: Number,
    pressure: Number
  };

  public todayDate: Date;
  public startDate: Date;
  public endDate: Date;

  private temperatureChart = Object;
  private pressureChart = Object;

  constructor(socket, weather) {
    this.socket = socket;
    this.weather = weather;

    this.initSocket();
    this.initCharts();

    this.todayDate = new moment().toDate();
    this.startDate = this.todayDate;
    this.endDate = new moment().subtract(1, 'days').toDate();
    this.getWeather();
  }

  public getWeather() {
    this.weather.get(this.startDate, this.endDate, (weathers) => {
      this.weathers = weathers;
      this.feedCharts();
    });
  }

  private initSocket() {
    this.socket.socket.on('weather:save', (weather) => {
      switch (weather.type) {
        case 'indoorTemp':
          this.currentWeather.indoorTemp = weather.value;
          break;
        case 'outdoorTemp':
          this.currentWeather.outdoorTemp = weather.value;
          break;
        case 'pressure':
          this.currentWeather.pressure = weather.value;
          break;
      }
    });
  }

  private initCharts() {
    this.temperatureChart = Highcharts.chart('temperatureChart', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Températures'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          hour: '%H',
          minute: '%H:%M'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Température'
        }
      },
      series: [{
        name: 'Température intérieur',
        }, {
        name: 'Température extérieur',
        }],
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%H:%M', this.x) + ' ' + this.y + '°C';
        }
      }
    });

    this.pressureChart = Highcharts.chart('pressureChart', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Pression Athmosphérique'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          hour: '%H',
          minute: '%H:%M'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Pression'
        }
      },
      series: [{
        name: 'Pression'
        }],
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%H:%M', this.x) + ' ' + this.y + 'hPa';
        }
      }
    });
  }

  private feedCharts() {
    this.temperatureChart.series[0].setData(this.weathers.indoorTemps);
    this.temperatureChart.series[1].setData(this.weathers.outdoorTemps);
    this.pressureChart.series[0].setData(this.weathers.pressures);
  }
}

angular.module('olafApp')
  .controller('WeatherController', WeatherController);
