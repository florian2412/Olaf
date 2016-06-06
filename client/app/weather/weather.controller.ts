'use strict';

class WeatherController {

  private socket: Object;
  private weather: Object;
  private $mdToast: Object;

  public weathers: Object[] = [];
  public currentWeather = {
    indoorTemp: Number,
    outdoorTemp: Number,
    pressure: Number
  };

  public socketSend = {
    indoorTemp: false,
    outdoorTemp: false,
    pressure: false
  };

  public todayDate: Date;
  public startDate: Date;
  public endDate: Date;

  private temperatureChart = Object;
  private pressureChart = Object;

  constructor(socket, weather, $mdToast) {
    this.socket = socket;
    this.weather = weather;
    this.$mdToast = $mdToast;

    this.initDate();
    this.initSocket();
    this.initCharts();
  }

  public initDate() {
    this.todayDate = new moment().toDate();
    this.startDate = new moment().subtract(1, 'days').toDate();
    this.endDate = this.todayDate;
    this.getWeather();
  }

  public getWeather() {
    this.weather.get(this.startDate, this.endDate, (weathers) => {
      this.weathers = weathers;
      this.feedCharts();

      if (!this.socketSend.indoorTemp && this.weathers.indoorTemps.length) {
        this.currentWeather.indoorTemp = this.weathers.indoorTemps[0][1];
      }
      if (!this.socketSend.outdoorTemp && this.weathers.outdoorTemps.length) {
        this.currentWeather.outdoorTemp = this.weathers.outdoorTemps[0][1];
      }
      if (!this.socketSend.pressure && this.weathers.pressures.length) {
        this.currentWeather.pressure = this.weathers.pressures[0][1];
      }
    });
  }

  private initSocket() {
    this.socket.socket.on('weather:save', (weather) => {
      switch (weather.type) {
        case 'indoorTemp':
          this.socketSend.indoorTemp = true;
          this.currentWeather.indoorTemp = weather.value;
          if (this.endDate === this.todayDate) {
            this.temperatureChart.series[0].addPoint([new Date(weather.date).getTime(), weather.value]);
          }
          break;
        case 'outdoorTemp':
          this.socketSend.outdoorTemp = true;
          this.currentWeather.outdoorTemp = weather.value;
          if (this.endDate === this.todayDate) {
            this.temperatureChart.series[1].addPoint([new Date(weather.date).getTime(), weather.value]);
          }
          break;
        case 'pressure':
          this.socketSend.pressure = true;
          this.currentWeather.pressure = weather.value;
          if (this.endDate === this.todayDate) {
            this.pressureChart.series[0].addPoint([new Date(weather.date).getTime(), weather.value]);
          }
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
    if (this.weathers.indoorTemps.length === 0 && this.weathers.outdoorTemps.length === 0 && this.weathers.pressures.length === 0) {
      this.showToast();
    } else {
      this.temperatureChart.series[0].setData(this.weathers.indoorTemps);
      this.temperatureChart.series[1].setData(this.weathers.outdoorTemps);
      this.pressureChart.series[0].setData(this.weathers.pressures);
    }
  }

  private showToast() {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent('Aucunes données trouvées pour ces dates.')
        .hideDelay(3000));
  }
}

angular.module('olafApp')
  .controller('WeatherController', WeatherController);
