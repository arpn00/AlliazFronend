import React, { useState, useEffect } from "react";
import "./Body.css";
import SourcesTemplate from "../../components/PageTemplates/SourcesTemplate.tsx";
import DataSource from "../../components/DataSource/DataSource.tsx";
import { FC } from "react";
import TopicSelector from "../TopicSelection/TopicSelector.tsx";
import SpinnerLogo from "../Spinner/Spinner.tsx";
import NewsLetterPage from "../NewsLetter/NewsLetterPage.tsx";
import {
  DocumentsResponseBody,
  DocumentsResponse,
  QuestionnaireResponse,
  NewsLetterResponse,
} from "../../api/models.ts";
import {
  TreeItemValue,
  TreeSelectionValue,
  HeadlessFlatTreeItemProps,
} from "@fluentui/react-components";

import { createDraft, getQuestionnaire } from "../../api/api.ts";

import { createResponseBodyForNewsLetter } from "../../Util/Util.ts";

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
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireResponse[]>(
    []
  );
  const [draftData, setdraftData] = useState<string>("");
  const onContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  useEffect(() => {
    GetQuestionnaire();
  }, []);

  const GetQuestionnaire = () => {
    getQuestionnaire()
      .then(() => {
        const topicResponse: QuestionnaireResponse[] = [
          {
            search_texts: [
              "top news in the US and Eurozone?",
              "Political events that are relevant for the market?",
            ],
            important_note:
              "Summarize the content in 2-5 sentences, focussing on the questions: Which three news topics were mentioned the most? Which asset classes have been mentioned in relation with these three news topics? How did these asset classes develop over the time HORIZON?Which news have affected asset prices most? Your answer should start with Good Morning, and one introduction sentence.",
            title: "Short capital market summary",
            filter: "",
          },
          {
            search_texts: [
              "What did central bank officials (mainly from Fed and ECB) speak about (there is tag called FEDSPK in refinitiv for fed official speakers)?",
              "What was important monetary policy meetings that took places (mainly from ECB, FED, BoE, BoJ) over the last week?",
              "What were the main inflation releases (mainly from Euro Area countrie, UK, Japan and US) over the last week?",
              "What did last job reports in USA, Euro Area tell about strength of the economy (incl. wage negotiations mainly in Germany, France, Spain and Italy)?",
              "What were the drivers of EURUSD price action over the last week (inflation releases, Fiscal budgets, trade related tariffs etc.)?",
              "How did the pricing of inflation swaps in Eurozone and United States evolve over the last week.",
            ],
            important_note:
              "Your task is to write a market summary about Interest rates and central\n      banks (MAXIMUM 250 tokens) using the provided context and following these\n      rules \\n \\n Rule 1) If relevant, you can adress these points in the\n      summary \\n A) What did central bank officials (mainly from Fed and ECB)\n      speak about? \\n B) What was important monetary policy meetings that took\n      places (mainly from ECB, FED, BoE, BoJ) over the last week? \\n C) What\n      were the main inflation releases (mainly from Euro Area countrie, UK,\n      Japan and US) over the last week? \\n D) What did last job reports in USA,\n      Euro Area tell about strength of the economy (incl. wage negotiations\n      mainly in Germany, France, Spain and Italy)? \\n E) What were the drivers\n      of EURUSD price action over the last week (inflation releases, Fiscal\n      budgets, trade related tariffs etc.)? \\n F) How did the pricing of\n      inflation swaps in Eurozone and United States evolve over the last week?\n      \\n \\n Rule 2) Follow this example \\n As expected, the ECB kept rates\n      unchanged last Thursday. Growth data in the Eurozone strengthened the case\n      for a soft landing scenario, followed by a shy recovery. Powell\u2019s\n      testimony to the Congress also relieved markets, due to fears that the\n      recent upside surprises in inflation could trigger a hawkish shift, though\n      that didn\u2019t happen. Central bankers reemphasised that rate cuts require\n      compelling evidence of disinflation, as avoiding a dovish mistake remains\n      top of mind. Unfortunately, the US job reports last week were \u201crather\n      ambiguous\u201d (as mentioned by our colleagues in the US), nonfarm payrolls\n      rose 275k in February, above the 200k forecast, but there were 167k of\n      downward revisions to the past two months, so the net improvement was\n      little more than 100k. Still, this was better than the ISM employment\n      indices, which were both in contraction territory. On balance, weaker job\n      reports are consistent with a likely cut in June. Both EUR and USD rates\n      bull flattened during the week, depicting expectations of disinflation\n      amidst slower growth. \\n \\n Rule 3) If the text contains more than 250\n      tokens, summarize it to the most relevant parts so that it is less than\n      250 tokens.",
            title: "Interest rates and central banks",
            filter: "",
          },
          {
            search_texts: [
              "What are the current levels of corporate credit spreads for IG EUR, USD and GBP and how they have changed over the HORIZON?",
              "What are the current levels of CDS senior spreads for IG EUR, USD and GBP and how they have changed over the HORIZON?",
              "What were the most important news on credit?",
              "Which corporate bond issuer was mentioned the most?",
              "Which issuers were upgraded to Investment Grade?",
              "Which issuers were downgraded to sub investment grade?",
              "Was there any default on EUR or USD IG?",
            ],
            important_note: "Summarize the content in 2-5 sentences",
            title: "Credit markets",
            filter: "",
          },
          {
            search_texts: [
              "What were the most mentioned news related to equity markets?",
              "Which stocks have been mentioned the most?",
              "What has been mentioned on earnings reports?",
              "How did the EuroStoxx 50, S&P 500, Nasdaq 100, Topix, CSI300, Nifty 50 perform over the HORIZON?",
              "Which news have affected equity prices most?",
            ],
            important_note: "Summarize the content in 2-5 sentences",
            title: "Equity Markets",
            filter: "",
          },
          {
            search_texts: [
              "How did the US treasury yields move over last week and how it impacted Emerging market sovereign yields? Was there any significant credit events among emerging market sovereign issuers like defaults, restructuring , iMF support etc.?",
              "How did the inflation and GDP releases look over the last week in top emerging market countries ( eg. China, India, Mexico, Indonesia, Korea, Brazil, Malaysia,Thailand)?",
              " How did EM spread move over the last week, Hard currency sovereigns and corporates (vis-\u00e0-vis US treasuries)?",
            ],
            important_note: "Summarize the content in 2-5 sentences",
            title: "Emerging markets",
            filter: "",
          },
        ];
        setQuestionnaire(topicResponse);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (currentStep != 3) {
      import("../../pages/layout/Layout.css");
    } else {
      import("../NewsLetter/NewsLetterPage.css");
    }

    if (currentStep == 2) {
      let draft = "";
      const createDraftPromises = selectedtrees!.map((group) => {
        let seachText = "";
        const title = group[0].content;
        const importantNote =
          questionnaire.find((item) => item.title === title)?.important_note ??
          "";

        for (const item of group) {
          if (item?.parentValue !== undefined) {
            seachText += item.content + "? ";
          }
        }
        seachText = seachText.slice(0, -2);
        console.log(seachText);
        const request = createResponseBodyForNewsLetter(
          "STANDARD",
          importantNote,
          seachText
        );
        // Return the promise for each createDraft call
        return createDraft(request, undefined).then(
          (response: NewsLetterResponse) => {
            draft += `<p>${response.answer}</p> `;
          }
        );
      });

      // Wait for all createDraft promises to resolve
      Promise.all(createDraftPromises).then(() => {
        console.log(`Yes ${draft}`);
        setdraftData(draft);
        setCurrentStep(currentStep + 1);
      });

      // for (let i = 0; i < selectedtrees!.length; i++) {
      //   let seachText = "";
      //   let title = selectedtrees![i][0].content;
      //   const importantNote =
      //     questionnaire.find((item) => item.title === title)?.important_note ??
      //     "";

      //   const group = selectedtrees![i];
      //   for (const item of group) {
      //     if (item?.parentValue !== undefined) {
      //       seachText += item.content + "? ";
      //     }
      //   }
      //   seachText = seachText.slice(0, -2);
      //   console.log(seachText);
      //   let request = createResponseBodyForNewsLetter(
      //     "STANDARD",
      //     importantNote,
      //     seachText
      //   );
      //   createDraft(request, undefined).then((response: NewsLetterResponse) => {
      //     draft += `${response.answer} \n `
      //     console.log(`Yes ${draft}`);
      //     setCurrentStep(currentStep + 1);
      //   });
      // }
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
              questionnaire={questionnaire}
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
          draft= {draftData}
        ></NewsLetterPage>
      )}
    </>
  );
};

export default Body;
