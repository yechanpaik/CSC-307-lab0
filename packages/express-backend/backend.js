// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

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
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateId(userToAdd);

  if (addUser(userToAdd)) {
    console.log(userToAdd);
    return res
      .status(201)
      .send({ user: userToAdd, message: "User successfully created" });
  } else {
    return res.status(400).send({ message: "Creation uncessful" });
  }
});

app.delete("/users", (req, res) => {
  const userToDelete = req.body.id;
  const deleted = deleteUser(userToDelete);
  if (deleted === null) {
    return res.status(404).send({ message: "User not found" });
  }
  return res.status(200).send({ user: deleted, message: "User deleted" });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
