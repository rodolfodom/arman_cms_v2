const event = require("./event");
const attendee = require("./attendee");
const speaker = require("./speaker");

module.exports = {
  "admin-routes": {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/names",
        handler: "event.count",
        config: {
          policies: [],
          auth: false,
        },
      },
    ],
  },
  event,
  speaker,
  attendee
};
