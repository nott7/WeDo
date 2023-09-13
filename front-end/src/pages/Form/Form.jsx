import "./Form.scss";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

import { motion } from "framer-motion";

const Form = ({ isLogin }) => {
  return (
    <div className="form-page_container">
      <div className="form-page_left">
        <motion.h1
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          WeDo Adventure Starts Here
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quibusdam, quos, voluptatibus quia voluptate
        </motion.p>
      </div>
      <div className="form-page_right">
        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Form;
