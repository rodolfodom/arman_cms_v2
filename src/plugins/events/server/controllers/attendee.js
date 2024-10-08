// @ts-nocheck
"use strict";

/**
 *  controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { v4: uuidv4 } = require("uuid");

module.exports = createCoreController(
  "plugin::events.attendee",
  ({ strapi }) => ({
    async reserveEvent(ctx) {
      const reservation = await strapi.entityService.findMany(
        "plugin::events.attendee",
        {
          filters: {
            Event: ctx.request.body.event,
            User: ctx.state.user.id,
          },
        }
      );

      if (reservation?.length > 0) {
        ctx.response.status = 400;
        ctx.response.body = {
          status: "error",
          userMessage: "Ya tienes una reservación para este evento.",
          meta: {
            timestamp: new Date(),
          },
        };
      } else {
        await strapi.entityService.create("plugin::events.attendee", {
          data: {
            Event: ctx.request.body.event,
            User: ctx.state.user.id,
            Atteded: false, // or appropriate value
            UID: uuidv4(), // or appropriate value
          },
        });

        ctx.response.status = 200;
        ctx.response.body = {
          status: "success",
          userMessage: "La reservación se ha realizado correctamente.",
          meta: {
            timestamp: new Date(),
          },
        };
      }
    },
    async getReservationCode(ctx){
      const reservation = await strapi.entityService.findMany(
        "plugin::events.attendee",
        {
          filters: {
            Event: ctx.request.params.event,
            User: ctx.state.user.id,
          },
        }
      );

      if (reservation?.length > 0) {
        ctx.response.status = 200;
        ctx.response.body = {
          status: "success",
          userMessage: "Código de reservación obtenido correctamente.",
          data: {reservation: reservation[0].UID},
          meta: {
            timestamp: new Date(),
          },
        };
      } else {
        ctx.response.status = 400;
        ctx.response.body = {
          status: "error",
          userMessage: "No tienes una reservación para este evento.",
          meta: {
            timestamp: new Date(),
          },
        };
      }
    },
    async callRoll(ctx) {
      console.log("############ CALL-ROLL ############");
    }
  })
);
