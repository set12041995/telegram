import React from "react";
import Button from "../../../common/Button/Button";
import "./style.css";

export default function Row({ row, updateStatus, deleteTodo, changeTodo }) {
  return (
    <>
      <tr className="row">
        <td>
          <input
            type="checkbox"
            onChange={() => updateStatus(row)}
            checked={row.completed}
          ></input>
        </td>
        <td>{row.title}</td>
        <td>{row.description}</td>
        <td>
          <Button
            onClick={() => updateStatus(row)}
            color={row.completed ? "green" : "red"}
            children={row.completed ? "Completed" : "Pending"}
          />
        </td>
        <td className="action">
          <Button
            color="blue"
            onClick={() => changeTodo(row)}
            children="Edit"
          />
          <Button
            color="red"
            onClick={() => deleteTodo(row)}
            children={"Delete"}
          />
        </td>
      </tr>
    </>
  );
}
