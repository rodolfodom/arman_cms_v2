'use strict';


/**
 *  router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
  coreRouter: createCoreRouter("plugin::events.attendee"),
  custom: {
    type: "content-api",
    routes: [
      {
        method: "POST",
        path: "/reserve",
        handler: "attendee.reserveEvent",
        config: {
          policies: [],
        },
      },
      {
        method: "GET",
        path: "/reservation/:event",
        handler: "attendee.getReservationCode",
        config: {
          policies: [],
        },
      },
    ],
  },
};
