import React from "react";
import { FC } from "react";
import "./SourcesTemplate.css";
import { Text } from "@fluentui/react-components";
import StepperProgress from "../Stepper/StepperProgress.tsx";

interface SourcesTemplateProps {
  activeStep: number;
  heading: string;
  subHeading?: string | undefined;
}

const SourcesTemplate: FC<SourcesTemplateProps> = (props) => {
  const { activeStep, heading, subHeading } = props;

  return (
    <div className="ProgressGrid">
      <div className="HeaderDiv">
        <Text size={900}>{heading}</Text>
      </div>
      {subHeading !== undefined ? (
        <div className="SubHeadingDiv">
          <Text size={400}>{subHeading}</Text>
        </div>
      ) : null}
      <div className="StepperDiv">
        <div className="StepperProgressDiv">
          <StepperProgress activeStep={activeStep}></StepperProgress>
        </div>
      </div>
    </div>
  );
};

export default SourcesTemplate;
