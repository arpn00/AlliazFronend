import React, { useState, useEffect } from "react";
import "./Body.css";
import SourcesTemplate from "../../components/PageTemplates/SourcesTemplate.tsx";
import DataSource from "../../components/DataSource/DataSource.tsx";
import { FC } from "react";
import TopicSelector from "../TopicSelection/TopicSelector.tsx";
import SpinnerLogo from "../Spinner/Spinner.tsx";
import NewsLetterPage from "../NewsLetter/NewsLetterPage.tsx";
import { DocumentsResponseBody, DocumentsResponse } from "../../api/models.ts";
import {
  TreeItemValue,
  TreeSelectionValue,
  HeadlessFlatTreeItemProps,
} from "@fluentui/react-components";

type ItemProps = HeadlessFlatTreeItemProps & { content: string };

interface BodyProps {}

const Body: FC<BodyProps> = (props) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedStartDate, setSelectedStartDate] = useState<
    Date | null | undefined
  >(null);
  const [selectedEndDate, setSelectedEndDate] = useState<
    Date | null | undefined
  >(null);
  const [selectedDocuments, setSelectedDocuments] = useState<
    DocumentsResponse[]
  >([]);
  const [selectedtrees, setSelectedtrees] = React.useState<ItemProps[][]>();

  const onContinue = () => {
    if (currentStep == 1) {
      setCurrentStep(currentStep + 2);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    if (currentStep != 3) {
      import("../../pages/layout/Layout.css");
    } else {
      import("../NewsLetter/NewsLetterPage.css");
    }
  }, [currentStep]);
  return (
    <>
      {currentStep != 3 ? (
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
            <DataSource
              selectedStartDate={selectedStartDate}
              setSelectedStartDate={setSelectedStartDate}
              selectedEndDate={selectedEndDate}
              setSelectedEndDate={setSelectedEndDate}
              selectedDocuments={selectedDocuments}
              setSelectedDocuments={setSelectedDocuments}
              onContinue={onContinue}
            ></DataSource>
          ) : null}
          {currentStep === 1 ? (
            <SourcesTemplate
              heading="Template and topic selection"
              activeStep={currentStep}
            ></SourcesTemplate>
          ) : null}
          {currentStep === 1 ? (
            <TopicSelector
              onContinue={onContinue}
              selectedtrees={selectedtrees}
              setSelectedtrees={setSelectedtrees}
            ></TopicSelector>
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
      ) : (
        <NewsLetterPage
          documents={selectedDocuments}
          startDate={selectedStartDate!}
          endDate={selectedEndDate!}
          selectedtrees={selectedtrees!}
        ></NewsLetterPage>
      )}
    </>
  );
};

export default Body;
