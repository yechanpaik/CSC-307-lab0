// backend.js
import express from "express";
import cors from "cors";
import {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
} from "./user-services";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const deleteUser = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  const deletedUser = users.users_list.splice(index, 1);
  return deletedUser[0];
};

const generateId = (userToAdd) => {
  const id = Math.floor(Math.random() * 999);
  userToAdd.id = userToAdd.name.substring(0, 3) + id;
  return userToAdd.id;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name) {
    findUserByName(name)
      .then((users) => res.send({ users_list: users }))
      .catch((err) => res.status(500).send({ message: err.message }));
  } else {
    getUsers()
      .then((users) => res.send({ users_list: users }))
      .catch((err) => res.status(500).send({ message: err.message }));
  }
});

app.get("/users", (req, res) => {
  const job = req.query.job;
  if (job) {
    findUserByJob(job)
      .then((jobs) => res.send(200).send({ jobs_list: jobs }))
      .catch((err) => res.status(500).send({ message: err.message }));
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.querty.job;
  if (name && job) {
    findUserByNameAndJob(name, job)
      .then((name, job) =>
        res.send(201).send({ name, job, message: "User found" })
      )
      .catch((err) => res.status(404).send({ message: err.message }));
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateId(userToAdd);

  addUser(userToAdd)
    .then((user) =>
      res.send(201).send({ user, message: "User successfully created" })
    )
    .catch((err) => res.status(400).send({ message: err.message }));
});

app.delete("/users", (req, res) => {
  const userToDelete = req.body.id;
  deleteUser(userToDelete)
    .then((user) =>
      res.send(200).send({ user, message: "User successfully deleted" })
    )
    .catch((err) => res.send(400).send({ message: err.message }));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  findUserById(id)
    .then((id) => res.send(200).send({ id, message: "User found" }))
    .catch((err) => res.send(404).send({ message: err.message }));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
