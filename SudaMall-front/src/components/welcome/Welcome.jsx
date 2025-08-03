import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { welcomeScreens } from "../../constants";
import WelcomeScreen from "./WelcomeScreen";
import WelcomeDots from "./WelcomeDots";
import WelcomeNavigation from "./WelcomeNavigation";

const Welcome = () => {
  if( localStorage.getItem("welcoming") ) 
    return <Navigate to="/auth" replace={true} />;
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();


  const handleNext = () => {
    if (current < welcomeScreens.length - 1) {
      setCurrent(current + 1);
    } else {
      handleSkip();
    }
  };

  const handleSkip = () => {
    localStorage.setItem("welcoming", "true");
    navigate("/auth");
  };

  return (
    <div className="h-screen flex flex-col justify-center bg-white -mt-10">
      <link rel="preload" href={welcomeScreens[0].image} as="image" />
      <link rel="preload" href={welcomeScreens[1].image} as="image" />
      <link rel="preload" href={welcomeScreens[2].image} as="image" />
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
