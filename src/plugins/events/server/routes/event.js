'use strict';

/**
 *  router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const coreRouter = createCoreRouter('plugin::events.event');
module.exports = {
  admin: {
    prefix: "/admin/events/events",
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/names",
        handler: "event.names",
        config: {
          policies: [],
          auth: false,
        },
      },
    ],
  },
  coreRouter,
  custom: {
    prefix: "/custom-api/events",
    routes: [
      {
        method: "GET",
        path: "/bystatus",
        handler: "event.getByStatus",
        config: {
          policies: [],
          auth: false,
        },
      },
    ],
  },
};
