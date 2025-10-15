// src/Table.jsx
import React from "react";

// src/Table.jsx
function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Id</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  console.log("TableBody data:", props.characterData);

  const filteredData = (props.characterData || []).filter(
    (row) => row && typeof row === "object"
  );

  const rows = filteredData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>{row._id}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>Delete</button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}

export default Table;
