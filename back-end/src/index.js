import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import MongoStore from "connect-mongo"; // check how to use this
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import todoListsRoutes from "./routes/todolists.js";
import todosRoutes from "./routes/todos.js";

const app = express();
config();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/todolists", todoListsRoutes, todosRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
