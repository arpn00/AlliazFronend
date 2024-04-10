import { useState, useRef, useEffect } from "react";
import { QuestionInput } from "../../components/QuestionInput/QuestionInput.tsx";
import styles from "./Chat.module.css";
import React from "react";
import { makeStyles } from "@fluentui/react-components";
import { ChatAppResponse, ButtonsType } from "../../api";
import { AnswerError } from "../../components/Answer/AnswerError.tsx";
import { AnswerLoading } from "../../components/Answer/AnswerLoading.tsx";
import { UserChatMessage } from "../../components/UserChatMessage/UserChatMessage.tsx";
import { Answer } from "../../components/Answer/Answer.tsx";
import { getAnalysisQuestion, getAllAnalysisQuestion } from "../../api/api.ts";
import { AnalysisPanel } from "../../components/AnalysisPanel/AnalysisPanel.tsx";
import { AnalysisPanelTabs } from "../../components/AnalysisPanel/AnalysisPanelTabs.tsx";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { initializeIcons } from "@fluentui/react/lib/Icons";

const useStyles = makeStyles({
  innerWrapper: {
    alignItems: "start",
    columnGap: "40px",
    display: "flex",
  },
  outerWrapper: {
    display: "flex",
    flexDirection: "column",
    rowGap: "25px",
  },
});

interface Props {}

const Chat = ({}: Props) => {
  const lastQuestionRef = useRef<string>("");
  const chatMessageStreamEnd = useRef<HTMLDivElement | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
  const [error, setError] = useState<unknown>();
  const [answers, setAnswers] = useState<
    [user: string, response: ChatAppResponse][]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeAnalysisPanelTab, setActiveAnalysisPanelTab] = useState<
    AnalysisPanelTabs | undefined
  >(undefined);
  const [activeCitation, setActiveCitation] = useState<string>();
  const [welcomePromptAnswer, setwelcomePromptAnswer] = useState<
    ChatAppResponse[]
  >([]);

  useEffect(
    () => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "smooth" }),
    [isLoading]
  );
  useEffect(
    () => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "auto" }),
    [answers]
  );

  initializeIcons();

  const makeApiRequest = async (question: string) => {
    lastQuestionRef.current = question;
    error && setError(undefined);
    setIsLoading(true);
    setActiveCitation(undefined);
    setActiveAnalysisPanelTab(undefined);
    try {
      setTimeout(() => {
        const parsedResponse: ChatAppResponse = {
          choices: [
            {
              index: 0,
              context: {
                data_points: [],
                followup_questions: null,
                thoughts: [],
              },
              session_state: null,
              message: {
                content: `<b>EM debt also performed well.</b> Hard currency sovereigns returned 0.8%, EM Corporates 0.4% and local currency sovereigns were flat. The positive returns were rates driven, whilst spreads widened for both sovereign and corporates debt. Meanwhile, the momentum in EM bond flows remains weak, with outflows concentrated in EM credit funds. The picture remains more upbeat in the EM equity space, where inflows resumed, driven by flows into Asia-focused funds. But the main focus last week was on Egypt, which holds a ~2% weight in hard currency mandates. On Wednesday, the central bank surprised the market with decision to hike rates by 600bps and let the currency float. The shift towards a free-floating exchange rate was critical to get the current IMF program back on track. Overall, the combination of the $8bn IMF deal, a USD 35bn UAE-Egypt foreign direct investment deal and upcoming inflows from other multilateral institutions will help address the FX shortages. The latter, along with an aggressive cumulative tightening of 800bps, is expected to fast-track Egypt's disinflation process. After some debt sustainability concerns last summer, the sovereign debt rallied ca. 45% over the last six months.`,
                role: "assistant",
              },
            },
          ],
        };
        setAnswers([...answers, [question, parsedResponse]]);
        setIsLoading(false);
      }, 5000);
    } catch (e) {
      setError(e);
    } finally {
    }
  };

  useEffect(() => {
    getWelcomeAnswer();
  }, []);

  const getWelcomeAnswer = () => {
    var response: ChatAppResponse[] = [];
    let askResponse: ChatAppResponse = {
      choices: [
        {
          index: 0,
          buttons: [],
          context: {
            data_points: [],
            followup_questions: null,
            thoughts: [],
          },
          session_state: null,
          message: {
            content: `Use the copilot to create new content`,
            role: "assistant",
          },
        },
      ],
    } as ChatAppResponse;

    response.push(askResponse);
    setwelcomePromptAnswer(response);
    setAnswers(response.map((x) => ["", x]));
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatRoot}>
        <div className={styles.chatContainer}>
          <div className={styles.chatMessageStream}>
            {!lastQuestionRef.current &&
              welcomePromptAnswer &&
              welcomePromptAnswer.map((streamedAnswer, index) => (
                <div key={index} className={styles.chatMessageGpt}>
                  {
                    <Answer
                      answer={streamedAnswer}
                      isStreaming={false}
                      isSelected={false}
                      buttons={streamedAnswer.choices[0].buttons}
                      onCitationClicked={() => {}}
                      onChatButtonClicked={() => {}}
                    ></Answer>
                  }
                </div>
              ))}
            {lastQuestionRef.current &&
              answers.map((answer, index) => (
                <div key={index}>
                  <UserChatMessage message={answer[0]} />
                  <div className={styles.chatMessageGpt}>
                    <Answer
                      isStreaming={false}
                      key={index}
                      answer={answer[1]}
                      isSelected={
                        selectedAnswer === index &&
                        activeAnalysisPanelTab !== undefined
                      }
                      onCitationClicked={() => {}}
                      buttons={answer[1].choices[0].buttons}
                      onChatButtonClicked={() => {}}
                    />
                  </div>
                </div>
              ))}
            {isLoading && (
              <>
                <UserChatMessage message={lastQuestionRef.current} />
                <div className={styles.chatMessageGptMinWidth}>
                  <AnswerLoading />
                </div>
              </>
            )}
            {error ? (
              <>
                <UserChatMessage message={lastQuestionRef.current} />
                <div className={styles.chatMessageGptMinWidth}>
                  <AnswerError
                    error={error.toString()}
                    onRetry={() => makeApiRequest(lastQuestionRef.current)}
                  />
                </div>
              </>
            ) : null}
            <div ref={chatMessageStreamEnd} />
          </div>
          <div className={styles.chatInput}>
            <QuestionInput
              clearOnSend
              placeholder="Ask me anything about Market Research ..."
              disabled={isLoading}
              onSend={(question) => makeApiRequest(question)}
            />
          </div>
        </div>

        {activeAnalysisPanelTab && (
          <Panel
            isOpen={activeAnalysisPanelTab !== undefined}
            isBlocking={false}
            closeButtonAriaLabel="Close"
            onDismiss={() => setActiveAnalysisPanelTab(undefined)}
            type={PanelType.medium}
          >
            <AnalysisPanel
              className={styles.chatAnalysisPanel}
              activeCitation={activeCitation}
              onActiveTabChanged={() => {}}
              citationHeight="750px"
              answer={welcomePromptAnswer[0]}
              activeTab={activeAnalysisPanelTab}
            />
          </Panel>
        )}
      </div>
    </div>
  );
};

export default Chat;
