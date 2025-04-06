const express = require("express");
const router = express.Router();
const insults = require("../services/insults");
const logger = require("../util/logger");

/* GET insults listing */
router.get("/", async function (req, res, next) {
  try {
    const result = await insults.getQuery(req);
    res.json(result);
  } catch (err) {
    logger.error(`Error while getting insult`, err.message);
    next(err);
  }
});

/* GET insults by author */
router.get("/author/:author", async function (req, res, next) {
  try {
    const result = await insults.getByAuthor(req.params.author);
    res.json(result);
  } catch (err) {
    logger.error(`Error while getting insults by author`, err.message);
    next(err);
  }
});

/* DELETE insult by ID */
router.delete("/:id", async function (req, res, next) {
  try {
    logger.info(`Attempting to delete insult with ID: ${req.params.id}`);
    const result = await insults.deleteById(req.params.id);
    logger.info(`Delete result: ${JSON.stringify(result)}`);
    res.json(result);
  } catch (err) {
    logger.error(`Error while deleting insult`, err.message);
    next(err);
  }
});

/* POST insult */
router.post("/", async function (req, res, next) {
  try {
    const result = await insults.create(req.body);
    res.json(result);
  } catch (err) {
    logger.error(`Error while adding insults `, err.message);
    next(err);
  }
});

module.exports = router;
