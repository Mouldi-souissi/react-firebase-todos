import React, { useState } from "react";
import DB from "../firebase";

const Todo = ({ todo }) => {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const markDone = () => {
    DB.collection("todos").doc(todo.id).update({ done: !todo.done });
  };

  const updateTodo = (e) => {
    e.preventDefault();
    let copy = value;
    DB.collection("todos").doc(todo.id).update({ todo: copy });
    setValue("");
    setEditing(false);
  };

  const deleteTodo = () => {
    DB.collection("todos").doc(todo.id).delete();
  };
  return (
    <form
      className="d-flex align-items-center justify-content-between mb-3"
      onSubmit={updateTodo}
    >
      <div className={`${todo.done && "text-decoration-line-through"}`}>
        -
        {isEditing ? (
          <input
            type="text"
            style={{ border: "none", borderBottom: "2px solid black" }}
            defaultValue={todo.todo}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          todo.todo
        )}
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="btn btn-secondary btn-sm" onClick={markDone}>
          {todo.done ? "Undone" : "Done"}
        </div>
        {isEditing && (
          <i
            className="fa fa-floppy-o btn btn-transparent playerIcon"
            aria-hidden="true"
            type="submit"
          />
        )}
        <i
          className={`fa ${
            isEditing ? "fa-times" : "fa-pencil"
          }  btn btn-transparent playerIcon`}
          aria-hidden="true"
          onClick={() => setEditing(!isEditing)}
        />
        <i
          className="fa fa-trash-o btn btn-transparent playerIcon"
          aria-hidden="true"
          onClick={deleteTodo}
        />
      </div>
    </form>
  );
};

export default Todo;
