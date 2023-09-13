import User from "../models/User.js";
import TodoList from "../models/TodoList.js";
import Token from "../models/Token.js";

export const createTodoList = async (req, res) => {
  try {
    const todoList = new TodoList({
      owner: req.user._id,
    });
    await todoList.save();
    const user = await User.findById(req.user._id);
    user.todoLists.push(todoList._id);
    await user.save();
    res.status(201).send({ message: "Todo list created successfully" });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const getTodoLists = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("todoLists");
    console.log(user);
    console.log(user.todoLists);
    res.status(200).send({ data: user.todoLists });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const getTodoList = async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id);
    res.status(200).send({ todoList });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const shareTodoList = async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id);
    const token = new Token({
      todoList: todoList._id,
    });
    await token.save();
    res.status(200).send({ tokenID: token._id });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const addCollaborator = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const token = await Token.findById(req.params.tokenID);
    const todoList = await TodoList.findById(token.todoList);
    todoList.collaborators.push(req.user._id);
    console.log(todoList);
    user.todoLists.push(todoList._id);
    await user.save();
    await todoList.save();
    token.deleteOne();
    res.status(200).send({ message: "Collaborator added successfully" });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const updateTodoList = async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id);
    todoList.set(req.body);
    console.log(todoList);
    await todoList.save();
    res.status(200).send({ message: "Todo list updated successfully" });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const deleteTodoList = async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id);
    const user = await User.findById(req.user._id);
    user.todoLists = user.todoLists.filter(
      (todoListId) => todoListId.toString() !== todoList._id.toString()
    );
    await user.save();
    await todoList.deleteOne();

    res.status(200).send({ message: "Todo list deleted successfully" });
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};
