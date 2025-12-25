import React from "react";
import "./WelcomeScreen.css";
import entranceImg from "../assets/dungeon/wizard.png";

const DungeonEntrance: React.FC = () => {
  return (
    <div className="welcome-screen-bg">
      <img
        src={entranceImg}
        alt="Dungeon Entrance"
        className="welcome-screen-img"
      />
      <div className="welcome-screen-title">
        <h1>Dungeon Entrance</h1>
      </div>
      {/* Add more content for the dungeon entrance here */}
    </div>
  );
};

export default DungeonEntrance;
