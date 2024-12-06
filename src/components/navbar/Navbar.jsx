import React, { useState } from "react";
import "./navbar.css";
import Search from "../search/Search";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LeftSideBar from "../leftSide/LeftSideBar"; // Assuming this is your sidebar component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState); // Toggle the state of the menu
  };

  return (
    <div className="navbar">
      <div className="logo">
        <div className="logoImg">
          <img src="/logo.png" alt="logo" />
          <span style={{ color: "#FF5353" }}>
            Dream<span style={{ color: "white" }}>Music</span>
          </span>
        </div>
      </div>
      
      {/* Hamburger Menu Icon */}
      <div className="hamburger" onClick={handleMenuToggle}>
        {isMenuOpen ? (
          <CloseIcon style={{ color: 'white' }} />
        ) : (
          <MenuIcon style={{ color: 'white' }} />
        )}
      </div>

      {/* Conditionally Render LeftSideBar when Menu is Open */}
      {isMenuOpen && <LeftSideBar />}
      
      <div className="center-header">
        <ul className={isMenuOpen ? "active" : ""}>
          <li><a href="#">Music</a></li>
          <li><a href="#">Podcast</a></li>
          <li><a href="#">Live</a></li>
          <li><a href="#">Radio</a></li>
        </ul>
        <div className={isMenuOpen ? "active" : "inputSearch"}>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
