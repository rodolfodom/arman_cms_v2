'use strict';

/**
 *  router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const coreRouter = createCoreRouter('plugin::events.event');
module.exports = {
  admin: {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/names",
        handler: "event.names",
        config: {
          policies: [],
          auth: false
        },
      },
      {
        method: "PUT",
        path: "/call-roll/:uid",
        handler: "attendee.callRoll",
        config: {
          policies: [],
        },

      }
    ],
  },
  coreRouter,
  custom: {
    type: "content-api",
    routes: [
      {
        method: "GET",
        path: "/bystatus",
        handler: "event.getByStatus",
        config: {
          policies: [],
        },
      },
      {
        method: "GET",
        path: "/reserved",
        handler: "event.getReservedEvents",
        config: {
          policies: [],
        },
      },
    ],
  },
};
