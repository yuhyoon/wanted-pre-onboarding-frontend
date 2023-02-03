import React, { useEffect, useState } from "react";
import instance from "../api/instance";
import CreateTodoBox from "../components/CreateTodoBox";

const Todos = () => {
  const [todoInput, setTodoInput] = useState<onChangehandlerType>({
    todo: "",
  });
  const [todos, setTodos] = useState<TodoInfo[]>([]);
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: onChangehandlerType
  ) => {
    const { name, value } = e.target;
    setTodoInput({ ...input, [name]: value });
  };

  const getTodos = () => {
    instance
      .get("/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => setTodos(res.data));
  };

  const createTodo = () => {
    instance
      .post("/todos", todoInput, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => setTodos((prev) => [...prev, res.data]));
  };

  const deleteTodo = (id: number) => {
    instance
      .delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(() => {
        setTodos((arr) => arr.filter((i) => i.id !== id));
      });
  };

  const updateTodo = (id: number, newTodo: string) => {
    instance
      .put(
        `/todos/${id}`,
        { todo: newTodo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(() => {
        setTodos((arr) =>
          arr.map((i) => (i.id === id ? { ...i, todo: newTodo } : i))
        );
      });
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      <h2>투두 리스트</h2>
      <CreateTodoBox
        onChangeHandler={onChangeHandler}
        createTodo={createTodo}
        todoInput={todoInput}
      />
      {todos &&
        todos.map((item) => {
          return (
            <li key={item.id}>
              <label>
                <input type="checkbox" />
                <span>{item.todo}</span>
              </label>
            </li>
          );
        })}
    </>
  );
};

export default Todos;
