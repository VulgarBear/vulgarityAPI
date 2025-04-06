require('dotenv').config();
const express = require("express");
const app = express();
const PORT = 8080;
const insultsRouter = require("./routes/insults");
const logger = require("./util/logger");

app.use(express.json());

app.use("/insult", insultsRouter);

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.listen(PORT, () =>
  logger.info(`VulgarAPI listening on http://localhost:${PORT}`)
);
