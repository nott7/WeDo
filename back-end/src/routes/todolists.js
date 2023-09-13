import express from "express";
import {
  createTodoList,
  getTodoList,
  getTodoLists,
  shareTodoList,
  addCollaborator,
  updateTodoList,
  deleteTodoList,
} from "../controllers/todolists.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import { checkOwnerOrCollaborator, checkOwner } from "../middlewares/checkOwner.js";

const router = express.Router();

router.post("/", authenticateUser, createTodoList);
router.get("/", authenticateUser, getTodoLists);
router.get("/:id", authenticateUser, checkOwnerOrCollaborator, getTodoList);
router.post("/:id/share", authenticateUser, checkOwner, shareTodoList);
router.get("/share/:tokenID", authenticateUser, addCollaborator);
router.put("/:id", authenticateUser, checkOwnerOrCollaborator, updateTodoList);
router.delete("/:id", authenticateUser, checkOwner, deleteTodoList);

export default router;
