'use strict';

import mongoose from 'mongoose';

var RemoteSchema = new mongoose.Schema({
  name: String,
  position: Number,
  type: String,
  ip: String,
  buttons: [{
    code: String,
    label: String,
    icon: String,
    color: String,
    sizeX: Number,
    sizeY: Number,
    row: Number,
    col: Number
  }] 
});

export default mongoose.model('Remote', RemoteSchema);
