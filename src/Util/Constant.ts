import {
    ButtonsType
} from "../api";

export const Chat_Api_Default_Message: string = "I'm sorry, but there are no available responses for your question with this External Identifier. Could you please rephrase your question or provide additional details for better assistance?";
export const Initial_Prompt_Message: string = "As soon as you have reviewed the documents, shall we start the analysis with below question?";
export const Show_All_Questions_Prompt_Message: string = "<strong>Here is the list of questions we need to work on</strong>"
export const Final_Prompt_Message: string = "Thank you for your valuable feedback!.There are no additional questions to analyze. If you have no further questions regarding this investment, feel free to close the session at any time."
export const Negative_Feedback_Prompt_Message: string = "That's valuable feedback! Now feel free to ask any question regarding this investment."
export const Welcome_Prompt_Message: string = "Starting your copilot as per following input <br> <ul><li>"
export const Chat_Placeholder_Message: string = "Ask me anything about SPPI..."
export const Welcome_Buttons: ButtonsType[] = [
    {
        key: "startCopilot",
        text: "Yes,Start Analysis"
    },
    {
        key: "displayAllDocuments",
        text: "Display all documents"
    },
    {
        key: "showAllQuestions",
        text: "Show all questions"
    }]
export const StartAnalysis_Buttons: ButtonsType[] = [
    {
        key: "yes",
        text: "Yes, go to the next question "
    },
    {
        key: "no",
        text: "No"
    }]
export const Show_All_Buttons: ButtonsType[] = [
    {
        key: "startCopilot",
        text: "Okay , start engine"
    }]

