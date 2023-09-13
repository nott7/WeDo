import { useState } from "react";
import axios from "axios";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const signIn = useSignIn();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/auth/login", {
      username,
      password,
    });
    if (res.data.error) {
      setError(true);
    } else {
      signIn({
        token: res.data.token,
        expiresIn: 86400,
        tokenType: "Bearer",
        authState: { userID: res.data.userID, username: res.data.username },
      });
      navigate("/todo-lists");
    }
  };
  return (
    <div className="form-page_right_container">
      <motion.h1
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        Welcome back! &#128075;
      </motion.h1>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 1.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <label htmlFor="username">Username</label>
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <label htmlFor="password">Password</label>
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} />
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <p>Invalid username or password!</p>}
      </motion.form>
    </div>
  );
};

export default Login;
