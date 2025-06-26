import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { welcomeScreens } from "../../constants";
import WelcomeScreen from "./WelcomeScreen";
import WelcomeDots from "./WelcomeDots";
import WelcomeNavigation from "./WelcomeNavigation";

const Welcome = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Preload images asynchronously
  useEffect(() => {
    welcomeScreens.forEach(screen => {
      const img = new Image();
      img.src = screen.image;
    });
  }, []);

  const handleNext = () => {
    if (current < welcomeScreens.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate("/auth");
    }
  };

  const handleSkip = () => {
    navigate("/auth");
  };

  return (
    <div className="h-screen fixed inset-0 flex flex-col justify-center bg-white ">
      <WelcomeScreen
        image={welcomeScreens[current].image}
        text={welcomeScreens[current].text}
      />
      <WelcomeDots total={welcomeScreens.length} current={current} />
      <WelcomeNavigation onNext={handleNext} onSkip={handleSkip} />
    </div>
  );
};

export default Welcome;
