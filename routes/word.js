var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const { Word } = require("../models");

const v = new Validator();

router.get("/", async (req, res) => {
  try{
    const word = await Word.findAll();
    console.log(word.every(word => word instanceof Word))
    console.log("word : ", JSON.stringify(word, null, 2))
    return res.json(word); 
  } catch(err) {
    console.log(err)
  }
  // res.send('Hello World');
});

router.post("/new", async (req, res) => {
  const schema = {
    text: "string",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const word = await Word.create(req.body);
  res.json(req.body);
});

module.exports = router;
