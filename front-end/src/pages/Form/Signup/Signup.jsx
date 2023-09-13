import { useState } from "react";
import "./Signup.scss";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/auth/signup", formData);

    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        Register here! &#128075;
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
        <div className="form-page_input">
          <label htmlFor="name">Name</label>
          <div className="input-container">
            <FontAwesomeIcon icon={faPerson} />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-page_input">
          <label htmlFor="surname">Surname</label>

          <div className="input-container">
            <FontAwesomeIcon icon={faPerson} />
            <input
              type="text"
              name="surname"
              id="surname"
              placeholder="Surname"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-page_input">
          <label htmlFor="email">Email</label>
          <div className="input-container">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-page_input">
          <label htmlFor="username">Username</label>
          <div className="input-container">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-page_input">
          <label htmlFor="password">Password</label>
          <div className="input-container">
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </motion.form>
    </div>
  );
};

export default Signup;
