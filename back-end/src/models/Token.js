import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  todoList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TodoList",
  },
});

export default mongoose.model("Token", tokenSchema);
