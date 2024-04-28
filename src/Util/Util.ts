import { QuestionnaireResponse, NewsLetterRequest } from "../api/models.ts";
import {
    HeadlessFlatTreeItemProps,
} from "@fluentui/react-components";

type ItemProps = HeadlessFlatTreeItemProps & { content: string };

export function createSubTreeFromQuestionnaire(
    questionnaire: QuestionnaireResponse[]): ItemProps[][] {

    const subtrees: ItemProps[][] = questionnaire.map((topic, index) => {
        const { title, search_texts } = topic;
        const subtree: ItemProps[] = [{ value: `${index + 1}`, content: title }];
        search_texts.forEach((searchText, idx) => {
            subtree.push({
                value: `${index + 1}-${idx + 1}`,
                parentValue: `${index + 1}`,
                content: RemoveLastCharacterOccurance(searchText, "?"),
            });
        });

        return subtree;
    });

    return subtrees;
}

export function RemoveLastCharacterOccurance(
    text: string,
    stringToRemoev: string
): string {

    const lastIndex = text.lastIndexOf(stringToRemoev);
    if (lastIndex !== -1) {
        return text.slice(0, lastIndex) + text.slice(lastIndex + 1);
    }
    return text;
}

export function createResponseBodyForNewsLetter(
    questionType: string,
    importantNote: string,
    answerLength: string,
    isRefinitv,
    hasAdditionalDocuments,
    additionalDocuments: string[],
    seesionId: string,
    userId: string,
    chatId: string,
    searchText?: string | undefined,
    selectedStartDate?: Date,
    selectedEndDate?: Date,
    paragraghId?: string

): NewsLetterRequest {

    let request: NewsLetterRequest = {
        important_note: importantNote,
        search_text: searchText === undefined ? "" : searchText,
        question_type: questionType,
        date_from: onFormatDate(selectedStartDate),
        date_to: onFormatDate(selectedEndDate),
        filter_str: "",
        answer_length: answerLength,
        data_source_refinitiv: isRefinitv,
        data_source_email: hasAdditionalDocuments,
        data_source_email_list: hasAdditionalDocuments ? additionalDocuments : [],
        session_id: seesionId,
        user_id: userId,
        chat_id: chatId,
        paragraph_id: paragraghId ?? ""

    };

    return request;
}


export function onFormatDate(date?: Date): string {
    return !date
        ? ""
        : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};