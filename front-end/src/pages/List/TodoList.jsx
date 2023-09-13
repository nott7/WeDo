import { useState, useEffect } from "react";
import ListContainer from "../../components/ListContainer/ListContainer";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";

const TodoList = () => {
  const { id } = useParams();
  const [todoList, setTodoList] = useState({});
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  axios.defaults.withCredentials = true;


  const getTodoDetails = async (todoId) => {
    const res = await axios.get(`http://localhost:3000/todolists/${id}/todos/${todoId}`);
    return res.data.todo;
  };

  const getTodos = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/todolists/${id}`);
      setTodoList(res.data.todoList);

      const todoIds = res.data.todoList.todos;

      // Eseguire le richieste GET per ciascun ID dell'attività
      const todosData = await Promise.all(todoIds.map(getTodoDetails));
      
      const uncompletedTodosData = todosData.filter(todo => !todo.completed);
      const completedTodosData = todosData.filter(todo => todo.completed);

      setTodos(uncompletedTodosData);
      setCompletedTodos(completedTodosData);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async () => {
    const res = await axios.post(`http://localhost:3000/todolists/${id}/todos`);
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
          todoList={todoList}
          todos={todos}
          completedTodos={completedTodos}
          createTodo={createTodo}
          getTodos={getTodos}
        />
      </main>
    </>
  );
};

export default TodoList;
