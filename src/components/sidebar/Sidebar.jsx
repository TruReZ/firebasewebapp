import "./sidebar.scss";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
        <center><span className="logo">Project Face Recognition System for class-Check-in</span></center>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MENU</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <HomeIcon className="icon" />
              <span>Homepage</span>
            </li>
          </Link>
          <Link to="/new" style={{ textDecoration: "none" }}>
            <li>
              <PersonAddIcon className="icon" />
              <span>New User</span>
            </li>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
