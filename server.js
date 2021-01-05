require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routers/router");
const PORT = process.env.POST || 8000;
const axios = require("axios").default;
const cors = require("cors");
app.use(express.json());

app.use(
  cors({
    origin: `${process.env.URL}`,
    optionsSuccessStatus: 200,
  })
);
app.use("/database", router);
app.listen(PORT, () => console.log(`PORT ${PORT}`));
