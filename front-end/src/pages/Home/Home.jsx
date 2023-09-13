import "./Home.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="home-container"
    >
      <h1>WeDo</h1>
      <p>
        Colaborate Effortlessly on Tasks. Real-time sync for seamless teamwork.
        Achive more together with WeDo &#128640;&#128221;
      </p>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="buttons"
      >
        <Link to="/signup">
        <button>Sign Up</button>
        </Link>
        <Link to="/login">
        <button>Log In</button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Home;
