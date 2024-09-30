"use strict";

module.exports = ({ strapi }) => {
  // register phase
  strapi.contentTypes[
    "plugin::events.event"
  ] = require("./content-types/event/schema.json");
};
