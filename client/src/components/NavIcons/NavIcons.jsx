import React from "react";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import {
  RiHome6Fill,
  RiMessage3Fill,
  RiNotification3Fill,
} from "react-icons/ri";

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link to="../home">
        <RiHome6Fill className="home" />
      </Link>
      <Link to="../setting">
        <UilSetting className="setting" />
      </Link>
      <Link to="../notification">
        <RiNotification3Fill className="notification" />
      </Link>
      <Link to="../chat">
        <RiMessage3Fill className="chatIcon" />
      </Link>
    </div>
  );
};

export default NavIcons;
