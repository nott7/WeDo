import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Untitled",
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("TodoList", todoListSchema);
