"use strict";

/**
 * blog-post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::blog-post.blog-post",
  ({ strapi }) => ({
    async getShortInfo(ctx) {
      const posts = await strapi.entityService.findMany(
        "api::blog-post.blog-post",
        {
          fields: ["Title", "Slug", "Description", "publishedAt", "Author"],
          sort: "publishedAt:desc",
          populate: {
            Cover: {
              fields: ["url"],
            },
          },
        }
      );
      ctx.response.status = 200;
      ctx.response.body = {
        data: posts,
        status: "success",
        userMessage: "Los posts se han recuperado correctamente.",
        meta: {
          timestamp: new Date(),
        },
      };
    },
    async findOne(ctx) {
      const post = await strapi.entityService.findMany(
        "api::blog-post.blog-post",
        {
          filters: {
            Slug: ctx.params.id,
          },
          fields: [
            "Title",
            "Slug",
            "Description",
            "Content",
            "publishedAt",
            "Author",
          ],
          populate: {
            Cover: {
              fields: ["url"],
            },
          },
        }
      );

      if (post.length === 0) {
        ctx.response.status = 404;
        ctx.response.body = {
          status: "error",
          userMessage: "No se encontró el post.",
          meta: {
            timestamp: new Date(),
          },
        };
      } else {
        ctx.response.status = 200;
        ctx.response.body = {
          data: post[0],
          status: "success",
          userMessage: "El post se ha recuperado correctamente.",
          meta: {
            timestamp: new Date(),
          },
        };
      }
    },
  })
);
