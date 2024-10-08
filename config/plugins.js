

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
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("EMAIL_HOST", "smtp.gmail.com"),
        port: env("EMAIL_PORT", 587),
        secure: false,
        auth: {
          user: env("EMAIL_USER", ""),
          pass: env("EMAIL_PASS", ""),
        },
      },
      settings: {
        defaultFrom: env("EMAIL_FROM", ""),
        defaultReplyTo: env("EMAIL_FROM", ""),
      },
    },
  },
});
