// config.js

module.exports = {
    development: {
      useSSL: false,
      dbConnection: process.env.DB_CONNECTION_DEV,
    },
    production: {
      useSSL: true,
      sslOptions: {
        key: process.env.SSL_KEY,
        cert: process.env.SSL_CERT,
      },
      dbConnection: process.env.DB_CONNECTION,
    },
  };
  