import TodoList from "../models/TodoList.js";
import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      creator: req.user._id,
    });

    await todo.save();

    const todoList = await TodoList.findById(req.params.id);
    todoList.todos.push(todo._id);
    await todoList.save();

    res.status(201).send({ message: "Todo created successfully" });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id).populate("todos");
    res.status(200).send({ data: todoList.todos });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoId);
        res.status(200).send({ todo });
    } catch (error) {
        res.status(200).send({ data: {}, error: true, message: error.message });
    }
};


export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    todo.set(req.body);
    await todo.save();
    res.status(200).send({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    const todoList = await TodoList.findById(req.params.id);
    todoList.todos = todoList.todos.filter(
      (todoId) => todoId.toString() !== todo._id.toString()
    );
    await todoList.save();
    await todo.deleteOne();
    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};
