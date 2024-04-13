import React, { FC, useState, useEffect } from "react";
import { Text, Button, Input } from "@fluentui/react-components";
import { TopicTemplate } from "./TopicTemplate.tsx";
import "./TopicSelector.css";
import { TagMultiple24Filled, Next16Filled } from "@fluentui/react-icons";
import { CommonDialog } from "../Dialog/CommonDialog.tsx";
import { TopicModal } from "../TopicSelection/TopicModal.tsx";
import { getQuestionnaire } from "../../api/api.ts";
import { QuestionnaireResponse } from "../../api/models.ts";
import {
  TreeItemValue,
  TreeSelectionValue,
  HeadlessFlatTreeItemProps,
} from "@fluentui/react-components";
import { createSubTreeFromQuestionnaire } from "../../Util/Util.ts";

type ItemProps = HeadlessFlatTreeItemProps & { content: string };

interface TopicSelectorProps {
  onContinue: () => void;
}
const TopicSelector: FC<TopicSelectorProps> = (props) => {
  const { onContinue } = props;
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireResponse[]>(
    []
  );
  const [showPromptDialog, setShowPromptDialog] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] =
    React.useState<Map<TreeItemValue, TreeSelectionValue>>();
  const [trees, setTrees] = React.useState<ItemProps[][]>();

  useEffect(() => {
    GetQuestionnaire();
  }, []);

  useEffect(() => {
    const subtrees = createSubTreeFromQuestionnaire(questionnaire);
    setTrees(subtrees);
  }, [questionnaire]);

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

  const onClose = () => {
    setShowPromptDialog(false);
  };

  const onOpen = () => {
    setShowPromptDialog(true);
  };

  return (
    <div className="TopicSelectionDiv">
      <div className="TopicHeaderDiv">
        <Text size={500} weight="semibold">
          Configure Template
        </Text>
      </div>
      <div className="TopicTemplateDiv">
        <div className="templateCon">
          <TopicTemplate
            heading="Global Market"
            color="#4B0082"
            onClick={onOpen}
          ></TopicTemplate>
          <TopicTemplate
            heading="Add Template"
            color="#228B22"
            newTemplate={true}
            onClick={onOpen}
          ></TopicTemplate>
        </div>
      </div>
      <div className="HotTopicsDiv">
        <Text size={500} weight="semibold">
          Hot Topics
        </Text>
      </div>
      <div className="TagsDiv">
        <Input
          size="large"
          style={{ width: "400px" }}
          contentBefore={<TagMultiple24Filled primaryFill="#0077be" />}
        />
      </div>
      <div className="ButtonDiv">
        <Button
          appearance="primary"
          size="medium"
          icon={<Next16Filled />}
          iconPosition="after"
          onClick={onContinue}
        >
          Create Draft
        </Button>
      </div>
      <CommonDialog
        open={showPromptDialog}
        maxWidth={1200}
        primaryActionText="Close"
        onPrimaryAction={onClose}
      >
        <TopicModal
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          setTrees={setTrees}
          trees={trees!}
        ></TopicModal>
      </CommonDialog>
    </div>
  );
};

export default TopicSelector;
