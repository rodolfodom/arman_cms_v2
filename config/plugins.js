module.exports = () => ({
  events: {
    enabled: true,
    resolve: "./src/plugins/events",
  },
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "2h",
      },
      register: {
        allowedFields: ["name", "lastname"],
      },
    },
  },
});
