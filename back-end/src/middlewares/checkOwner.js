import TodoList from "../models/TodoList.js";

export const checkOwnerOrCollaborator = async (req, res, next) => {
  try {
    const todoList = await TodoList.findById(req.params.id);
    if (
      !todoList ||
      (todoList.owner.toString() !== req.user._id.toString() &&
        !todoList.collaborators.includes(req.user._id.toString()))
    ) {
      return res
        .status(200)
        .send({ data: {}, error: true, message: "Todo list not found" });
    }
    next();
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};

export const checkOwner = async (req, res, next) => {
  try {
    const todoList = await TodoList.findById(req.params.id);
    if (!todoList || todoList.owner.toString() !== req.user._id.toString()) {
      return res
        .status(200)
        .send({ data: {}, error: true, message: "Todo list not found" });
    }
    next();
  } catch (error) {
    res.status(200).send({ data: {}, error: true, message: error.message });
  }
};
