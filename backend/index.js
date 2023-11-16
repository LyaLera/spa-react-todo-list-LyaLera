const express = require("express")
const { validationResult, body, param } = require("express-validator");
const app = express();
const cors = require("cors")
require("dotenv").config();
const { MongoClient } = require("mongodb")
const connectionStringOfDB = process.env.DATABASE_CONNECTION
const client = new MongoClient(connectionStringOfDB)
const port = 3300;

app.use(express.json());
app.use(cors());

client.connect()
.then(() => {
    console.log("Connection to database successfull");
})
.catch((error) => {
    console.log("Connection failed");
})

app.get("/", (req, res) => {
    res.send("Hello backend!")
})

app.get("/todos", async (req, res, next) => {
    try {
      let databaseTasks = await client.db("todos").collection("tasks").find()
      console.log(databaseTasks);
      res.status(200).json({
        success: true,
        data: databaseTasks,
      });
    } catch (err) {
      console.log(err);
      let errReport = new Error("Could not get data from DB");
      next(errReport);
    }
});

const validTask = [
    body("name")
      .notEmpty()
      .withMessage("Please type your task")
      .isLength({ min: 2, max: 35 })
      .matches(/^[A-Za-z\s]+$/)
      .trim()
      .escape(),
  
    body("done").isBoolean().notEmpty(),
  
    body("id").notEmpty().isUUID().trim().escape(),
];

app.post("/todos", validTask, async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        let newTaskToDB = await client.db("todos").collection("tasks").insertOne({
            name: req.body.name,
            done: req.body.done,
            id: req.body.id,
        })
        res.status(201).json({
          success: true,
          message: "New task saved",
        });
      } catch (err) {
        let errReport = new Error("Could not post data to DB");
        next(errReport);
      }
    } else {
      res.status(500).send({ errors: result.array() });
    }
});

app.put(
    "/todos/:id",
    param("id").isUUID(),
    validTask,
    async (req, res, next) => {
      const result = validationResult(req);
      if (result.isEmpty()) {
        try {
          let editedTaskInDB = await client.db("todos").collection("tasks").updateOne(
            { id: req.params.id },
            { $set: {name: req.body.name, done: req.body.done}}
          );
          console.log(editedTaskInDB);
          console.log(editedTaskInDB.modifiedCount);
          if (editedTaskInDB.modifiedCount) {
            res.status(201).json({
              success: true,
              message: "New task was updated",
            });
          } else {
            throw new Error("Could not edit data in a DB");
          }
        } catch (err) {
          let errReport = new Error("Could not edit data in a DB");
          next(errReport);
        }
      } else {
        res.status(500).send({ errors: result.array() });
      }
    }
);

app.delete("/todos/:id", param("id").isUUID(), async (req, res, next) => {
    try {
      let deletedTaskInDB = await client.db("todos").collection("tasks").deleteOne({ id: req.params.id });
      console.log(deletedTaskInDB);
      if (deletedTaskInDB.deletedCount) {
        res.status(200).json({
          success: true,
          message: "Task was deleted.",
        });
      } else {
        throw new Error("Could not delete task in a Database");
      }
    } catch (err) {
      let errReport = new Error("Could not delete task in a DB");
      next(errReport);
    }
  });

app.listen(port, () => {
    console.log(`I'm listening ${port}`)
})