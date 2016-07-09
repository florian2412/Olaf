'use strict';

import mongoose from 'mongoose';

var ButtonSchema = new mongoose.Schema({
  type: String,
  code: String,
  label: String,
  icon: String,
  color: String,
  sizeX: Number,
  sizeY: Number,
  row: Number,
  col: Number
});

var RemoteSchema = new mongoose.Schema({
  name: String,
  position: Number,
  buttons: [ButtonSchema]
});

export default mongoose.model('Remote', RemoteSchema);
