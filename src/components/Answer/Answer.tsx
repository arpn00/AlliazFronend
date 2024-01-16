import { useMemo } from "react";
import { Stack, IconButton } from "@fluentui/react";
import DOMPurify from "dompurify";
import { ButtonsType } from "../../api";
import styles from "./Answer.module.css";

import { ChatAppResponse } from "../../api/models.ts";
import { parseAnswerToHtml } from "./AnswerParser.tsx";
import { AnswerIcon } from "./AnswerIcon.tsx";
import { getCitationFilePath } from "../../api/api.ts";
import { CitationCard } from "../../components/Card/CitationCard.tsx";
import React from "react";
import AnswerFeedback from "./AnswerFeedback.tsx";

import ChatButtons from "../Buttons/ChatButtons.tsx";

interface Props {
    answer: ChatAppResponse;
    isSelected?: boolean;
    isStreaming: boolean;
    buttons: ButtonsType[] | undefined;
    onCitationClicked: (filePath: string) => void;
    onChatButtonClicked: (buttonKey: string,buttonText : string) => void;
}

export const Answer = ({
    answer,
    isSelected,
    isStreaming,
    buttons,
    onCitationClicked,
    onChatButtonClicked
}: Props) => {
    const messageContent = answer.choices[0].message.content;
    const parsedAnswer = useMemo(() => parseAnswerToHtml(messageContent, isStreaming, onCitationClicked), [answer]);
    parsedAnswer.citations = answer.choices[0].context.data_points;
    const sanitizedAnswerHtml = DOMPurify.sanitize(parsedAnswer.answerHtml);

    return (
        <>
            <Stack className={`${styles.answerContainer} ${isSelected && styles.selected}`} tokens={{ padding: 200 }} verticalAlign="space-between">

                <Stack.Item>
                    <Stack horizontal horizontalAlign="space-between">
                        <AnswerIcon />
                    </Stack>
                </Stack.Item>
                <Stack.Item grow>
                    <div className={styles.answerText} dangerouslySetInnerHTML={{ __html: sanitizedAnswerHtml }}></div>
                </Stack.Item>

                {!!parsedAnswer.citations.length && (
                    <Stack.Item>
                        <Stack tokens={{ childrenGap: 5 }}>
                            {parsedAnswer.citations.map((x, i) => {
                                const path = getCitationFilePath(x);
                                return (
                                    <a key={i} onClick={() => onCitationClicked(path)}>
                                        <CitationCard onCitationClicked={onCitationClicked} fileName={x} score={undefined} page={undefined} refNumber={undefined}></CitationCard>
                                    </a>
                                );
                            })}
                        </Stack>
                    </Stack.Item>

                )}
                {<ChatButtons buttons={buttons} onChatButtonClicked ={onChatButtonClicked}></ChatButtons>}
                <AnswerFeedback/>
            </Stack>
            <br></br>
        </>
    );
};
