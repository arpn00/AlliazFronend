import { useState, useRef, useEffect } from "react";
import { QuestionInput } from "../../components/QuestionInput/QuestionInput.tsx";
import styles from "./Chat.module.css";
import React from "react";
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { AddCircle32Regular } from "@fluentui/react-icons";
import { makeStyles } from "@fluentui/react-components";
import { ChatAppResponse, ButtonsType } from "../../api";
import { AnswerError } from "../../components/Answer/AnswerError.tsx";
import { AnswerLoading } from "../../components/Answer/AnswerLoading.tsx";
import { UserChatMessage } from "../../components/UserChatMessage/UserChatMessage.tsx";
import { Answer } from "../../components/Answer/Answer.tsx";
import { getCitationForSelectedTask, getAnalysisQuestion, getAllAnalysisQuestion } from "../../api/api.ts";
import { AnalysisPanel } from "../../components/AnalysisPanel/AnalysisPanel.tsx";
import { AnalysisPanelTabs } from "../../components/AnalysisPanel/AnalysisPanelTabs.tsx";
import { CompoundButton } from "@fluentui/react-components";
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
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

interface Props {
}

const Chat = ({
}: Props) => {

  const lastQuestionRef = useRef<string>("");
  const chatMessageStreamEnd = useRef<HTMLDivElement | null>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
  const [error, setError] = useState<unknown>();
  const [answers, setAnswers] = useState<[user: string, response: ChatAppResponse][]>([]);
  const styless = useStyles();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeAnalysisPanelTab, setActiveAnalysisPanelTab] = useState<AnalysisPanelTabs | undefined>(undefined);
  const [activeCitation, setActiveCitation] = useState<string>();
  const [streamedAnswers, setStreamedAnswers] = useState<[user: string, response: ChatAppResponse][]>([]);
  const [welcomePromptAnswer, setwelcomePromptAnswer] = useState<ChatAppResponse[]>([]);

  const SideBarStyles: React.CSSProperties = {

    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 1,
    top: 0,
    left: 0,
    borderRight: "1px solid var(--neutrals-web-gray-40-e-1-dfdd, #E1DFDD)",
    backgroundColor: "var(--neutrals-web-gray-20-f-3-f-2-f-1, #F3F2F1)",
    width: 180,
    minHeight: "975px"
  };
  useEffect(() => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "smooth" }), [isLoading]);
  useEffect(() => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "auto" }), [answers]);

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
          choices: [{
            index: 0,
            context: {
              data_points: [],
              followup_questions: null,
              thoughts: [],
            }, session_state: null, message: {
content: `<b>EM debt also performed well.</b> Hard currency sovereigns returned 0.8%, EM Corporates 0.4% and local currency sovereigns were flat. The positive returns were rates driven, whilst spreads widened for both sovereign and corporates debt. Meanwhile, the momentum in EM bond flows remains weak, with outflows concentrated in EM credit funds. The picture remains more upbeat in the EM equity space, where inflows resumed, driven by flows into Asia-focused funds. But the main focus last week was on Egypt, which holds a ~2% weight in hard currency mandates. On Wednesday, the central bank surprised the market with decision to hike rates by 600bps and let the currency float. The shift towards a free-floating exchange rate was critical to get the current IMF program back on track. Overall, the combination of the $8bn IMF deal, a USD 35bn UAE-Egypt foreign direct investment deal and upcoming inflows from other multilateral institutions will help address the FX shortages. The latter, along with an aggressive cumulative tightening of 800bps, is expected to fast-track Egypt's disinflation process. After some debt sustainability concerns last summer, the sovereign debt rallied ca. 45% over the last six months.`, role: "assistant"

              // content: `I apologize, but the available sources do not contain information related to your query. Please consider rephrasing your question`, role: "assistant"
            }
          }]
        };
        setAnswers([...answers, [question, parsedResponse]]);
        setIsLoading(false);
      }, 5000);


    } catch (e) {
      setError(e);
    } finally {

    }
  }

  useEffect(() => {
    getWelcomeAnswer();
  }, []);

  const getInitiateAnalysisPrompt = () => {

    var initialQuestion = getAnalysisQuestion();
    var initialprompt = "As soon as you have reviewed the documents, shall we start the analysis with below question?";
    let appResponse: ChatAppResponse = {
      choices: [{
        index: 0,
        buttons: [{
          key: "startCopilot",
          text: "Yes,Start Analysis"
        },
        {
          key: "displayAllDocuments",
          text: "Display all documents"
        }, {
          key: "showAllQuestions",
          text: "Show all questions"
        }
        ],
        context: {
          data_points: [],
          followup_questions: null,
          thoughts: [],
        }, session_state: null, message: {
          content: `${initialprompt}<br><br><strong>${initialQuestion}<strong>`, role: "assistant"
        }
      }]

    } as ChatAppResponse;

    return appResponse;
  }

  const onChatButtonClicked = (command: string, text: string) => {
    switch (command) {
      case "displayAllDocuments":
        var citations = getCitationForSelectedTask();
        let askResponse: ChatAppResponse = {
          choices: [{
            index: 0,
            context: {
              data_points: citations,
              followup_questions: null,
              thoughts: [],
            }, session_state: null, message: {
              content: ``, role: "assistant"
            }
          }]

        } as ChatAppResponse;
        lastQuestionRef.current = command;
        setAnswers([...answers, [text, askResponse]]);
        break;
      case "startCopilot":
        break;
      case "showAllQuestions":
        const WelcomeText = "<strong>Here is the list of questions we need to work on</strong>";
        const question = getAllAnalysisQuestion();
        let questionsReponse: ChatAppResponse = {
          choices: [{
            index: 0,
            buttons: [{ key: "startCopilot", text: "Okay , start engine" }],
            context: {
              data_points: [],
              followup_questions: null,
              thoughts: [],
            }, session_state: null, message: {
              content: `${WelcomeText}
                <ul><li>${question[0]}</li><li>${question[1]}</li></ul>`,
              role: "assistant"
            }
          }]

        } as ChatAppResponse;
        lastQuestionRef.current = command;
        setAnswers([...answers, [text, questionsReponse]]);
        break;
      default:
        break;
    }
  }

  const getWelcomeAnswer = () => {
    var response: ChatAppResponse[] = [];
    let askResponse: ChatAppResponse = {
      choices: [{
        index: 0,
        buttons: [],
        context: {
          data_points: [],
          followup_questions: null,
          thoughts: [],
        }, session_state: null, message: {
          content: `Use the copilot to create new content`, role: "assistant"
        }
      }]

    } as ChatAppResponse;

    response.push(askResponse);
    // response.push(getInitiateAnalysisPrompt());
    setwelcomePromptAnswer(response);
    setAnswers(response.map(x => ["", x]));
  }

  const onShowCitation = (citation: string, index: number) => {
    console.log("onShowCitation", citation);
    if (activeCitation === citation && activeAnalysisPanelTab === AnalysisPanelTabs.CitationTab) {
      setActiveAnalysisPanelTab(undefined);
    } else {
      setActiveCitation(citation);
      setActiveAnalysisPanelTab(AnalysisPanelTabs.CitationTab);
    }
    setSelectedAnswer(index);

  };

  const onToggleTab = (tab: AnalysisPanelTabs, index: number) => {
    if (activeAnalysisPanelTab === tab) {
      setActiveAnalysisPanelTab(undefined);
    } else {
      setActiveAnalysisPanelTab(tab);
    }
    setSelectedAnswer(index);
  };



  return (
    <div className={styles.container}>
      <div className={styles.chatRoot}>

        <div className={styles.chatContainer}>
          <div className={styles.chatMessageStream}>
            {(!lastQuestionRef.current && welcomePromptAnswer) &&

              welcomePromptAnswer.map((streamedAnswer, index) => (
                <div key={index} className={styles.chatMessageGpt}>
                  {
                    <Answer
                      answer={streamedAnswer}
                      isStreaming={false}
                      isSelected={false}
                      buttons={streamedAnswer.choices[0].buttons}
                      onCitationClicked={c => onShowCitation(c, index)}
                      onChatButtonClicked={(c, t) => onChatButtonClicked(c, t)}
                    ></Answer>
                  }
                </div>
              ))
            }
            {(lastQuestionRef.current) &&
              answers.map((answer, index) => (
                <div key={index}>
                  <UserChatMessage message={answer[0]} />
                  <div className={styles.chatMessageGpt}>
                    <Answer
                      isStreaming={false}
                      key={index}
                      answer={answer[1]}
                      isSelected={selectedAnswer === index && activeAnalysisPanelTab !== undefined}
                      onCitationClicked={c => onShowCitation(c, index)}
                      buttons={answer[1].choices[0].buttons}
                      onChatButtonClicked={(c, t) => onChatButtonClicked(c, t)}
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
                  <AnswerError error={error.toString()} onRetry={() => makeApiRequest(lastQuestionRef.current)} />
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
              onSend={question => makeApiRequest(question)
              }
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
              onActiveTabChanged={x => onToggleTab(x, selectedAnswer)}
              citationHeight="750px"
              answer={welcomePromptAnswer[0]}
              activeTab={activeAnalysisPanelTab} />
          </Panel>

        )}
      </div>
    </div>

  )
};

export default Chat;