var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const { Word } = require("../models");

const v = new Validator();

// All
router.get("/", async (req, res) => {
  try {
    const word = await Word.findAll();
    // console.log(word.every(word => word instanceof Word))
    // console.log("word : ", JSON.stringify(word, null, 2))
    return res.json(word);
  } catch (err) {
    console.log(err);
  }
  // res.send('Hello World');
});

// Create
router.post("/new", async (req, res) => {
  const schema = {
    text: "string",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const word = await Word.create(req.body);
  res.json(word);
});

// Find
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const word = await Word.findByPk(id);

  if (!word) {
    return res.json({ message: "Word not found" });
  }

  res.send(word);
});

// Update
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let word = await Word.findByPk(id);

  if (!word) {
    return res.json({ message: "Word not found" });
  }

  const schema = {
    text: "string",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  word = await word.update(req.body);
  res.json(word);
});

// Delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const word = await Word.findByPk(id);

  if (!word) {
    return res.json({ message: "Word not found" });
  }
  await word.destroy();

  res.json({
    message: "Word is deleted",
  });
});

module.exports = router;
