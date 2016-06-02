'use strict';

var express = require('express');
var controller = require('./weather.controller');

import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/:start/:end', auth.isAuthenticated(), controller.search);

module.exports = router;
