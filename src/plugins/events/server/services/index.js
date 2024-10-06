'use strict';

const myService = require('./my-service');
const event = require('./event')
const attendee = require("./attendee");
const speaker = require("./speaker");


module.exports = {
  myService,
  event,
  attendee,
  speaker
};
