const event = require("./event");
const attendee = require("./attendee");
const speaker = require("./speaker");

module.exports = {
  "event-admin": event.admin,
  // @ts-ignore
  "event": event.coreRouter,
  "event-custom": event.custom,
  speaker,
  attendee,
};
