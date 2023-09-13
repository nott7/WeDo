import express from "express";
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.js";

import { authenticateUser } from "../middlewares/authenticateUser.js";
import {
  checkOwner,
  checkOwnerOrCollaborator,
} from "../middlewares/checkOwner.js";

const router = express.Router();

router.post(
  "/:id/todos",
  authenticateUser,
  checkOwnerOrCollaborator,
  createTodo
);
router.get("/:id/todos", authenticateUser, checkOwnerOrCollaborator, getTodos);
router.get(
  "/:id/todos/:todoId",
  authenticateUser,
  checkOwnerOrCollaborator,
  getTodo
);
router.put(
  "/:id/todos/:todoId",
  authenticateUser,
  checkOwnerOrCollaborator,
  updateTodo
);
router.delete(
  "/:id/todos/:todoId",
  authenticateUser,
  checkOwnerOrCollaborator,
  deleteTodo
);

export default router;
