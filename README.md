# Olaf

![alt tag](https://github.com/sylcastaing/olaf/blob/master/client/assets/images/logo.png)

Olaf is a Web Application to build home automation system. You can get temperature information and control your devices (TV, box, and all IR components). Olaf implements also a TodoList to forget nothing ! 

In the future, olaf is also a mobile application and you can control the application with your voice !  

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.3.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](https://nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](https://bower.io/) (`npm install --global bower`)
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Arduino

Olaf work with Arduino Uno Boards. 
This application is testing with this configuration : 

First Arduino :
- Arduino Uno CMS with Grove Base Shield
- Upload [Configurable Firmata](https://github.com/firmata/ConfigurableFirmata) on the board

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

On Windows, you can also start `start.bat` to run mongod and gulp. 

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
