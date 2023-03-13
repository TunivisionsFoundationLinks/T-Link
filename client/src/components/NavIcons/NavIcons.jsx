import React from "react";

import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import {
  RiHome6Fill,
  RiMessage3Fill,
  RiNotification3Fill,
} from "react-icons/ri";

import "./NavIcons.css";
import LogoSearch from "../LogoSearch/LogoSearch";

const NavIcons = () => {
  return (
    <div className="navIcons">
      <LogoSearch />
      <div className="NavBar">
        <Link to="../home">
          <RiHome6Fill className="home" />
        </Link>
        <Link to="../chat">
          <RiMessage3Fill className="chatIcon" />
        </Link>
        <Link to="../notification">
          <RiNotification3Fill className="notification" />
        </Link>
        <Link to="../setting">
          <UilSetting className="setting" />
        </Link>
      </div>
    </div>
  );
};

export default NavIcons;
