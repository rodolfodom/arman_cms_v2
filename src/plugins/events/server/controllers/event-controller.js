module.exports = ({ strapi }) => ({
  async count(ctx) {
    ctx.body = await strapi.plugin("events").service("event").count();
  },
});
