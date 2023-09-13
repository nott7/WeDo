import { faLink, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListItem from "./ListItem/ListItem";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EdiText from "react-editext";

import "./ListContainer.scss";

const ListContainer = ({
  todoList,
  todos,
  completedTodos,
  createTodo,
  getTodos,
}) => {
  const navigate = useNavigate();
  const deleteTodoList = async () => {
    const res = await axios.delete(
      `http://localhost:3000/todolists/${todoList._id}`
    );
    navigate("/todo-lists");
  };
  const shareTodoList = async () => {
    const res = await axios.post(
      `http://localhost:3000/todolists/${todoList._id}/share`
    );
    const token = res.data.tokenID;
    navigator.clipboard.writeText(`http://localhost:3000/todolists/share/${token}`);
    alert("Link copied to clipboard");
  };

  return (
    <div className="list-container">
      <motion.div
        initial={{ y: 100, x: 50, opacity: 0, scale: 0 }}
        animate={{ y: 0, x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8, type: "tween" }}
        className="list-container-active"
      >
        <header className="list-header">
          <div className="list-header_left">
            {todoList ? (
              <>
                <EdiText
                  type="text"
                  submitOnEnter
                  submitOnUnfocus
                  cancelOnEscape
                  editOnViewClick
                  value={todoList.name}
                  viewProps={{ className: "list-header_title" }}
                  onSave={async (val) => {
                    const res = await axios.put(
                      `http://localhost:3000/todolists/${todoList._id}`,
                      { name: val }
                    );
                  }}
                />
              </>
            ) : (
              <h1>My Todo Lists</h1>
            )}
          </div>
          <div className="list-header_right">
            {todoList && (
              <>
                <button>
                  <FontAwesomeIcon icon={faLink} onClick={shareTodoList} />
                </button>
                <button onClick={deleteTodoList}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            )}

            <button onClick={createTodo}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </header>
        <ul className="list-content">
          {todoList
            ? todos.map((todo) => (
                <li key={todo._id}>
                  <ListItem
                    todo={todo}
                    getTodos={getTodos}
                    todoList={todoList}
                  />
                </li>
              ))
            : todos.map((todo) => (
                <li key={todo._id}>
                  <ListItem todo={todo} getTodos={getTodos} />
                </li>
              ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ y: 0, x: 50, opacity: 0, scale: 0 }}
        animate={{ y: 0, x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2, type: "tween" }}
        className="list-container-completed"
      >
        {completedTodos.length > 0 && (
          <>
            <header className="list-header">
              <h1>Completed</h1>
            </header>

            <ul className="list-content">
              {todoList
                ? completedTodos.map((todo) => (
                    <li key={todo._id}>
                      <ListItem
                        todo={todo}
                        getTodos={getTodos}
                        todoList={todoList}
                        completed={true}
                      />
                    </li>
                  ))
                : completedTodos.map((todo) => (
                    <li key={todo._id}>
                      <ListItem
                        todo={todo}
                        getTodos={getTodos}
                        completed={true}
                      />
                    </li>
                  ))}
            </ul>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ListContainer;
