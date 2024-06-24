import React from "react";

export default function Nav() {
  return (
    <div className="nav__wrapper">
      <div className="nav__inner">
        <div className="logo">
          <span>DIKED</span>
          <span>studio</span>
        </div>
        <nav>
          <ul>
            <li>About us</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
