"use strict";

/**
 *  controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("plugin::events.event", ({ strapi }) => ({
  async count(ctx) {
    ctx.body = await strapi.entityService.findMany("plugin::events.event", {
      fields: ["id", "Name"],
    });
  },
}));
