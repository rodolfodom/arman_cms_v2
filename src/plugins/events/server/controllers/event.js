// @ts-nocheck
"use strict";

/**
 *  controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("plugin::events.event", ({ strapi }) => ({
  async names(ctx) {
    ctx.body = await strapi.entityService.findMany("plugin::events.event", {
      fields: ["id", "Name"],
    });
  },
  async getByStatus(ctx) {
    try {
      const events = await strapi.entityService.findMany(
        "plugin::events.event",
        {
          populate: {
            Cover: {
              fields: ['formats']
            },
            Speakers: true,
          },
        }
      );

      const eventsByStatus = { commingSoon: [], open: [], closed: [] };
      const now = new Date();
      events.forEach((event) => {
        const openDate = new Date(event.RegistrationStartingDate);
        const closeDate = new Date(event.RegistrationEndingDate);

        if (openDate > now) {
          eventsByStatus.commingSoon = [...eventsByStatus?.commingSoon, event];
        } else if (openDate <= now && closeDate > now) {
          eventsByStatus.open = [...eventsByStatus?.open, event];
        } else {
          eventsByStatus.closed = [...eventsByStatus?.closed, event];
        }
      });
      ctx.response.status = 200;
      ctx.response.body = {
        data: eventsByStatus,
        status: "success",
        userMessage: "Los eventos se han recuperado correctamente.",
        meta: {
          timestamp: now,
        },
      };
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = {
        data: { commingSoon: [], open: [], closed: [] },
        status: "error",
        message: "An error occurred while retrieving events",
        userMessage:
          "Ocurrió un error al intentar recuperar los eventos. Por favor, intenta de nuevo más tarde.",
        error: error.message,
      };
    }
  },
}));
