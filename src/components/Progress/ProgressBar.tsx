import React from "react";
import "./ProgressBar.css";
import { Text } from "@fluentui/react-components";
import StepperProgress from "../Stepper/StepperProgress.tsx";

const ProgressBar = () => {
  return (
    <div className="ProgressGrid">
      <div className="HeaderDiv">
        <Text size={900}>Leverage AI to compose your newsletter</Text>
      </div>
      <div className="SubHeadingDiv">
        <Text size={400}>
          Select the news sources you want to include in your newsletter
        </Text>
      </div>
      <div className="StepperDiv">
        <div className="StepperProgressDiv">
          <StepperProgress activeStep={0}></StepperProgress>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
