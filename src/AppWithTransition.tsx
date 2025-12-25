import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import DungeonEntrance from "./components/DungeonEntrance";
import "./components/PageTurn.css";

const AppWithTransition: React.FC = () => {
  const [screen, setScreen] = useState<'welcome' | 'dungeon'>('welcome');
  const [turning, setTurning] = useState(false);

  const handleStartGame = () => {
    setTurning(true);
    setTimeout(() => {
      setScreen('dungeon');
      setTurning(false);
    }, 1000); // match animation duration
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {screen === 'welcome' && (
        <WelcomeScreen onStartGame={handleStartGame} />
      )}
      {screen === 'dungeon' && <DungeonEntrance />}
      {turning && (
        <div className="page-turn-container">
          <div className="page-turn" />
        </div>
      )}
    </div>
  );
};

export default AppWithTransition;
