'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin("events").service("myService").getWelcomeMessage();
  },
  async count(ctx) {

    ctx.body = strapi.entityService.findMany('plugin::events.event', {
      fields: ['id'],
    });
  },
});
