import { QuestionnaireResponse,NewsLetterRequest } from "../api/models.ts";
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
                content: RemoveLastCharacterOccurance(searchText,"?"),
            });
        });

        return subtree;
    });

    return subtrees;
}

export function RemoveLastCharacterOccurance(
    text: string,
    stringToRemoev:string
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
    searchText?: string | undefined): NewsLetterRequest {

    let request: NewsLetterRequest = {
        important_note: importantNote,
        search_text: searchText === undefined ? "" : searchText,
        question_type: questionType
    };

    return request;
}