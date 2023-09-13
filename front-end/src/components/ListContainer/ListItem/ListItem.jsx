import "./ListItem.scss";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import EdiText from "react-editext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItem = ({ completed, todo, getTodos, todoList }) => {
  const handleComplete = async () => {
    axios.defaults.withCredentials = true;
    if (!todoList) {
      const res = await axios.put(
        `http://localhost:3000/todolists/${todo._id}`,
        {
          completed: !completed,
        }
      );
      getTodos();
    }
    const res = await axios.put(
      `http://localhost:3000/todolists/${todoList._id}/todos/${todo._id}`,
      {
        completed: !completed,
      }
    );
    getTodos();
  };

  const handleDelete = async () => {
    const res = await axios.delete(
      `http://localhost:3000/todolists/${todoList._id}/todos/${todo._id}`
    );
    getTodos();
  };

  return (
    <div className={completed ? "list-item completed" : "list-item"}>
      <motion.div
        whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{
          scale: 0.8,
          rotate: -90,
          borderRadius: "100%",
        }}
        className="pretty p-default p-curve p-fill"
      >
        {completed ? (
          <input type="checkbox" checked onChange={handleComplete} />
        ) : (
          <input type="checkbox" onChange={handleComplete} />
        )}
        <div className="state p-success">
          <label></label>
        </div>
      </motion.div>
      {completed ? (
        !todoList ? (
          <Link to={`/todo-lists/${todo._id}`}>
            <del>{todo.name}</del>
          </Link>
        ) : (
          <>
            <EdiText
              type="text"
              submitOnEnter
              submitOnUnfocus
              cancelOnEscape
              editOnViewClick
              value={todo.name}
              viewProps={{ className: "list-header_title" }}
              onSave={async (val) => {
                const res = await axios.put(
                  `http://localhost:3000/todolists/${todoList._id}/todos/${todo._id}`,
                  { name: val }
                );
              }}
            />
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )
      ) : !todoList ? (
        <Link to={`/todo-lists/${todo._id}`}>{todo.name}</Link>
      ) : (
        <>
          <EdiText
            type="text"
            submitOnEnter
            submitOnUnfocus
            cancelOnEscape
            editOnViewClick
            value={todo.name}
            onSave={async (val) => {
              const res = await axios.put(
                `http://localhost:3000/todolists/${todoList._id}/todos/${todo._id}`,
                { name: val }
              );
            }}
          />
          <button onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      )}
    </div>
  );
};

export default ListItem;

{
  /* <Link to={`/todo-lists/${todo._id}`}>
<del>{todo.name}</del>
</Link> */
}
