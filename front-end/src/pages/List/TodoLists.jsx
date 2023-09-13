import { useState, useEffect } from "react";
import ListContainer from "../../components/ListContainer/ListContainer";
import axios from "axios";
import Header from "../../components/Header/Header";

const TodoLists = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  axios.defaults.withCredentials = true;

  const getTodos = async () => {
    const res = await axios.get(`http://localhost:3000/todolists`);
    const uncompletedTodos = res.data.data.filter((todo) => !todo.completed);
    const completedTodos = res.data.data.filter((todo) => todo.completed);
    setTodos(uncompletedTodos);
    setCompletedTodos(completedTodos);
  };

  const createTodo = async () => {
    const res = await axios.post(`http://localhost:3000/todolists`);
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <Header />
      <main>
        <ListContainer
          todos={todos}
          completedTodos={completedTodos}
          createTodo={createTodo}
          getTodos={getTodos}
        />
      </main>
    </>
  );
};

export default TodoLists;
