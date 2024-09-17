'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('events')
      .service('myService')
      .getWelcomeMessage();
  },
});
