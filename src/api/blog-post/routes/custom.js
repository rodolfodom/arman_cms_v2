module.exports = {
  routes: [
    {
      method: "GET",
      path: "/posts/short",
      handler: "blog-post.getShortInfo",
      config: {
        policies: [],
      },
    },
  ],
};
