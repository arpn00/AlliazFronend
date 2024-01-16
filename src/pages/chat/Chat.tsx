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

  externalIdent: string | undefined;
  externalIdentType: string | undefined;
  evalCode: string | undefined;
  mdValue: string | undefined;

}

const Chat = ({
  externalIdent,
  externalIdentType,
  evalCode,
  mdValue,
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
              content: `I apologize, but the available sources do not contain information related to your query. Please consider rephrasing your question`, role: "assistant"
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
            buttons: [{key:"startCopilot",text:"Okay , start engine"}],
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
          content: `Starting your copilot as per following input <br> <ul><li>External Ident : <strong>${externalIdent}</strong></li><li>External Ident Type : <strong>${externalIdentType}</strong></li><li>Eval Code : <strong>${evalCode}</strong></li><li>MD Value : <strong>${mdValue}</strong></li></ul>This Investemnt is <span style="
    color: red;">Risk Sensitive</span>. Please review the documents available as per our records`, role: "assistant"
        }
      }]

    } as ChatAppResponse;

    response.push(askResponse);
    response.push(getInitiateAnalysisPrompt());
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
        <Stack enableScopedSelectors horizontal>
          <Stack.Item style={SideBarStyles}>
            <Stack enableScopedSelectors style={{ margin: "10px", backgroundColor: "white", marginTop: "25px" }}>
              <Stack.Item align="center">
                <div className={styless.innerWrapper}>
                  <CompoundButton
                    icon={<AddCircle32Regular />}
                  >
                    New Query
                  </CompoundButton>

                </div>
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>

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
                      buttons= {streamedAnswer.choices[0].buttons}
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
                      buttons= {answer[1].choices[0].buttons}
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
              placeholder="Ask me anything about SPPI..."
              disabled={isLoading}
              onSend={question => makeApiRequest(question)
              }
            />
          </div>
        </div>

        {activeAnalysisPanelTab && (
          <AnalysisPanel
            className={styles.chatAnalysisPanel}
            activeCitation={activeCitation}
            onActiveTabChanged={x => onToggleTab(x, selectedAnswer)}
            citationHeight="750px"
            answer={welcomePromptAnswer[0]}
            activeTab={activeAnalysisPanelTab}
          />
        )}
      </div>
    </div>

  )
};

export default Chat;