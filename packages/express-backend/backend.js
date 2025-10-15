// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";
const {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  deleteUser,
} = userServices;

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name && job) {
    findUserByNameAndJob(name, job)
      .then((name) =>
        res.status(201).send({ name, job, message: "User found" })
      )
      .catch((err) => res.status(404).send({ message: err.message }));
  } else if (name) {
    findUserByName(name)
      .then((name) => res.status(200).send({ users_list: users }))
      .catch((err) => res.status(500).send({ message: err.message }));
  } else if (job) {
    findUserByJob(job)
      .then((jobs) => res.status(200).send({ jobs_list: jobs }))
      .catch((err) => res.status(500).send({ message: err.message }));
  } else {
    getUsers()
      .then((users) => res.send({ users_list: users }))
      .catch((err) => res.status(500).send({ message: err.message }));
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  addUser(userToAdd)
    .then((user) =>
      res.status(201).send({ user, message: "User successfully created" })
    )
    .catch((err) => res.status(400).send({ message: err.message }));
});

app.delete("/users/:id", (req, res) => {
  const userToDelete = req.params.id;
  deleteUser(userToDelete)
    .then((user) =>
      res.status(200).send({ user, message: "User successfully deleted" })
    )
    .catch((err) => res.status(400).send({ message: err.message }));
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  findUserById(id)
    .then((user) => res.status(200).send({ id, message: "User found" }))
    .catch((err) => res.status(404).send({ message: err.message }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
