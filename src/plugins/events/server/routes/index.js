const event = require("./event");

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
};
