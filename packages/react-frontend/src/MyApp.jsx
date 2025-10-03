// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  function updateList(person) {
    postUser(person)
      .then((newUser) => setCharacters([...characters, newUser])) //newUser includes id
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).then((res) =>
      res.json().then((data) => {
        if (res.status == 201) {
          console.log("Success: " + data.message);
          console.log(data.user);
          return data.user; //returns the new user along with the id so that we can delete using id
        } else {
          console.log("Failed: " + data.message);
        }
      })
    );
  }

  const [characters, setCharacters] = useState([]);

  function deleteUser(index) {
    const userToDelete = characters[index];
    const promise = fetch("http://localhost:8000/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userToDelete.id }),
    }).then((res) =>
      res.json().then((data) => {
        if (res.status == 200) {
          console.log("Success: " + data.message);
          console.log(data.user);
          const updated = characters.filter((character, i) => {
            return i !== index;
          });
          setCharacters(updated);
        } else if (res.status == 404) {
          console.log("Failed: " + data.message);
        }
      })
    );

    return promise;
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={deleteUser} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
