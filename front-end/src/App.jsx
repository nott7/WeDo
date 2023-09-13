import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";

import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import TodoList from "./pages/List/TodoList";
import TodoLists from "./pages/List/TodoLists";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/todo-lists"
          element={
            <RequireAuth loginPath={"/login"}>
              <TodoLists />
            </RequireAuth>
          }
        />
        <Route
          path="/todo-lists/:id"
          element={
            <RequireAuth loginPath={"/login"}>
              <TodoList />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Form isLogin={true} />} />
        <Route path="/signup" element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
