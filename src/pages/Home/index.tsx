import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Todo = {
  id: string;
  task: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");

    useEffect(() => {
    fetch("http://localhost3000/todos").then((response) => response.json()).then((data) => setTodos(data))
    }, [])

  function handleAdd() {
    if (task) {
      const todo = {
        id: uuidv4(),
        task,
        done: false,
      };

      fetch("http://localhost:3000/todos", {
        method: "Post",
        headers: {
            "Content-Type": "aplication/json"
        },
        body: JSON.stringify(todo),
      }).then((response) => response.json()).then((data) => {
        setTodos([...todos, data])
        setTask("")
      })
      setTodos([...todos, todo]);
      setTask("");
    } else {
      alert("Preencha a Tarefa");
      console.log(todos);
    }
  }
  function handleDelete(id: string) {
    const todoFound = todos.find((todo) => todo.id === id);
    if (todoFound) {
      const index = todos.indexOf(todoFound);
      const todoUpdate = [...todos];
      todoUpdate.splice(index, 1);
      setTodos(todoUpdate);
    }
  }

  return (
    <div className="bg-rose-50 w-full h-screen flex items-center justify-center">
      <div className="w-[500px] text-center bg-white p-5 px-8 rounded-lg">
        <h1 className="text-5xl font-medium mb-8">Todo List</h1>
        <form className="flex items-center justify-center mb-8">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border-2 placeholder:text-gray-500 rounded-lg p-2 text-black mr-2"
            placeholder="Digite uma tarefa"
            type="text"
          />
          <button
            onClick={handleAdd}
            type="button"
            className="bg-violet-400 hover:bg-violet-500 text-white p-3 px-8 rounded-lg"
          >
            Adicionar
          </button>
        </form>
        <main>
          {todos.map((todo) => (
            <div className="flex items-center justify-between gap-4 mb-4" key={todo.id}>
              <strong>{todo.task}</strong>
              <button
                onClick={() => handleDelete(todo.id)}
                className=" bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Excluir
              </button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
