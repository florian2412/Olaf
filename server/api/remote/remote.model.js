'use strict';

import mongoose from 'mongoose';

var RemoteSchema = new mongoose.Schema({
  name: String,
  ip: String,
  buttons: [{
    code: String,
    label: String,
    icon: String,
    color: String,
    width: Number,
    height: Number,
    posX: Number,
    posY: Number
  }] 
});

export default mongoose.model('Remote', RemoteSchema);
