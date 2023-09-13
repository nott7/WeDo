import "./Header.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const authUser = useAuthUser();
  console.log(authUser());

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -50, x: 50, opacity: 0, scale: 0 }}
      animate={{ y: 0, x: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "tween" }}
    >
      <div className="header-left">
        <div className="menu-button">
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </div>
        <Link to="/todo-lists">
          <h1>WeDo</h1>
        </Link>
      </div>
      <div className="header-right">
        <p>{authUser().username}</p>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mtsolar.us%2Fwp-content%2Fuploads%2F2020%2F04%2Favatar-placeholder-800x818.png&f=1&nofb=1&ipt=d654feec2a8608857da915f2ee5f369d1b6c28ec9552bdfe799f6594e794bd5d&ipo=images"
          alt="user avatar"
        />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </motion.header>
  );
};

export default Header;
