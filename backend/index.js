const express = require("express")
const { validationResult, body, param } = require("express-validator");
const app = express();
const cors = require("cors")
const port = 3300;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello backend!")
})

const validTask = [
    body("name")
      .notEmpty()
      .withMessage("Please type your task")
      .isLength({ min: 2, max: 25 })
      .matches(/^[A-Za-z\s]+$/)
      .trim()
      .escape(),
  
    body("done").isBoolean().notEmpty(),
  
    body("id").notEmpty().isUUID().trim().escape(),
];



app.listen(port, () => {
    console.log(`I'm listening ${port}`)
})