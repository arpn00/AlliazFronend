import React, { useState } from "react";
import "./Body.css";
import SourcesTemplate from "../../components/PageTemplates/SourcesTemplate.tsx";
import DataSource from "../../components/DataSource/DataSource.tsx";
import { FC } from "react";
import TopicSelector from "../TopicSelection/TopicSelector.tsx";
import SpinnerLogo from "../Spinner/Spinner.tsx";
interface BodyProps {}

const Body: FC<BodyProps> = (props) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const onContinue = () => {
    setCurrentStep(currentStep + 1);
  };
  return (
    <div className="Body">
      <div className="LeftBodyGrid"></div>
      <div className="RightBodyGrid"></div>
      {currentStep === 0 ? (
        <SourcesTemplate
          activeStep={currentStep}
          heading="Leverage AI to compose your newsletter"
          subHeading="Select the news sources you want to include in your newsletter"
        ></SourcesTemplate>
      ) : null}
      {currentStep === 0 ? (
        <DataSource onContinue={onContinue}></DataSource>
      ) : null}
      {currentStep === 1 ? (
        <SourcesTemplate
          heading="Template and topic selection"
          activeStep={currentStep}
        ></SourcesTemplate>
      ) : null}
      {currentStep === 1 ? (
        <TopicSelector onContinue={onContinue}></TopicSelector>
      ) : null}
      {currentStep === 2 ? (
        <SourcesTemplate
          heading="Wizard"
          activeStep={currentStep}
        ></SourcesTemplate>
      ) : null}
      {currentStep === 2 ? <SpinnerLogo></SpinnerLogo> : null}
      <div className="FooterGrid"></div>
    </div>
  );
};

export default Body;