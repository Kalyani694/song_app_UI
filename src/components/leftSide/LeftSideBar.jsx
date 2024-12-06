import React from "react";
import "./leftSidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const LeftSideBar = () => {
  return (
    <div className="leftsidebar">
      <div className="center">
        <h6>MENU</h6>
        <ul>
          <li>
            <a href="">
              <HomeIcon style={{ color: "#ff5353", marginRight: "0.5rem" }} />
              Home
            </a>
          </li>
          <li>
            <a href="">
              <TrendingUpIcon
                style={{ color: "#ff5353", marginRight: "0.5rem" }}
              />
              Trending
            </a>
          </li>
          <li>
            <a href="">
              <img src="/logo.png" alt="Library" />
              Library
            </a>
          </li>
          <li>
            <a href="">
              <SwapVerticalCircleIcon
                style={{ color: "#ff5353", marginRight: "0.5rem" }}
              />
              Discover
            </a>
          </li>
        </ul>
      </div>

      <div className="footer">
        <ul>
          <li>
            <a href="">
              <SettingsIcon style={{ color: "#ff5353", marginRight: "0.5rem" }} />
              Settings
            </a>
          </li>
          <li>
            <a href="">
              <LogoutIcon style={{ color: "#ff5353", marginRight: "0.5rem" }} />
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSideBar;
