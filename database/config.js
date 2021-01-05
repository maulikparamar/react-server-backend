require("dotenv").config({ path: "../.env" });

const config = {
  server: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    //trustedconnection: true,
    enableArithAbort: true,
    //instancename: "DESKTOP-KOVN9TS",
  },
};

module.exports = config;
