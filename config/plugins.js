

module.exports = ({ env }) => ({
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
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      }
    },
  },
});
