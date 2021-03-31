import "./App.css";
import { useEffect, useState } from "react";
import DB from "./firebase";
import Todo from "./components/Todo";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    let copy = todo;
    DB.collection("todos").add({
      todo: copy,
      done: false,
      created: Date.now(),
    });
    setTodo("");
  };

  const getTodos = () => {
    DB.collection("todos").onSnapshot((query) => {
      setTodos(
        query.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          done: doc.data().done,
          created: doc.data().created,
        }))
      );
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <h1 className="text-center py-3  bg-primary text-white">To Do App</h1>
      <form className="container mt-5" onSubmit={addTodo}>
        <div
          className="card shadow-sm p-5 col-md-6 mx-auto"
          style={{ borderRadius: "30px" }}
        >
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Add to do"
              aria-label="Add to do"
              aria-describedby="button-addon2"
              required
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="submit"
              id="button-addon2"
            >
              ADD
            </button>
          </div>
        </div>
      </form>
      <div className="container mt-5 col-md-6">
        <h4 className="text-center mb-5">List of ToDos</h4>
        {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
      </div>
    </div>
  );
}

export default App;
