import React, { useState } from "react";
import { FC } from "react";
import { Text, Button, Input, Link, Badge } from "@fluentui/react-components";
import TextEditor from "../RichTextEditor/TextEditor.tsx";
import {
  CalendarDate24Regular,
  ArrowClockwise24Filled,
  Share28Filled,
  CalendarDataBar24Filled,
} from "@fluentui/react-icons";
import SelectedDocumentsGrid from "../DocumentSelector/SelectedDocumentsGrid.tsx";
import { CommonDialog } from "../Dialog/CommonDialog.tsx";
import Chat from "../../pages/chat/Chat.tsx";
import { DocumentsResponse } from "../../api/models.ts";
import { HeadlessFlatTreeItemProps } from "@fluentui/react-components";
import { TopicModal } from "../TopicSelection/TopicModal.tsx";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

type ItemProps = HeadlessFlatTreeItemProps & { content: string };

interface NewsLetterPageProps {
  documents: DocumentsResponse[];
  startDate: Date;
  endDate: Date;
  selectedtrees: ItemProps[][];
  draft: string;
  topicParagraph: Map<string, string>;
  setTopicParagraph: React.Dispatch<Map<string, string>>;

}

const NewsLetterPage: FC<NewsLetterPageProps> = (props) => {
  const { documents, startDate, endDate, selectedtrees, draft,topicParagraph,setTopicParagraph } = props;
  const [showDocumentDialog, setShowDocumentDialog] = useState<boolean>(false);
  const [showTopicDocumentDialog, setTopicShowDocumentDialog] =
    useState<boolean>(false);
  const dateRange = `${startDate.toDateString()} - ${endDate.toDateString()}`;
  const contentBlock = htmlToDraft(draft);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(contentState)
  );

  const onClose = () => {
    setShowDocumentDialog(false);
    setTopicShowDocumentDialog(false);
  };

  const download = () => {
    const htmlContent = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
  };

  return (
    <div className="NewsLetterBody">
      <div className="NewsLetterLeftBodyGrid"></div>
      <div className="NewsLetterRightBodyGrid"></div>
      <div className="NewsLetterGrid">
        <div className="NewsLetterTimeFrameDiv">
          <div className="NewsletterHeader1">
            <Text size={400} weight="semibold">
              Time Frame
            </Text>
          </div>
          <div className="NewsletterHeader2">
            <Text size={400} weight="semibold" color="#003781">
              REFINITIV
            </Text>
          </div>
          <div className="NewsletterHeader3">
            <Input
              contentBefore={<CalendarDate24Regular primaryFill="blue" />}
              disabled
              placeholder={dateRange}
              style={{ minWidth: "300px", maxWidth: "400px" }}
            />
          </div>
          <div className="NewsletterHeader4">
            <div className="NewsletterHeader4-1">
              <Text size={300} weight="semibold">
                Template
              </Text>
            </div>
            <div className="NewsletterHeader4-2">
              <Link
                onClick={() => {
                  setTopicShowDocumentDialog(true);
                }}
              >
                Global Market
              </Link>
            </div>
            <div className="NewsletterHeader4-3">
              <Text size={300} weight="semibold">
                Topic
              </Text>
            </div>
            <div className="NewsletterHeader4-4">
              <Link
                onClick={() => {
                  setTopicShowDocumentDialog(true);
                }}
              >
                <Badge
                  size="small"
                  appearance="filled"
                  color="brand"
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    setTopicShowDocumentDialog(true);
                  }}
                >
                  {selectedtrees.length ?? 0}
                </Badge>
                Selected
                {/* {selectedtrees
                  .flatMap((value, index) => {
                    return value[0].content;
                  })
                  .join(" , ")} */}
              </Link>
            </div>
          </div>
          <div className="NewsletterHeader5">
            <div className="NewsletterHeader5-1">
              <Badge
                appearance="filled"
                color="brand"
                style={{ marginRight: "10px" }}
                onClick={() => {
                  setShowDocumentDialog(true);
                }}
              >
                {documents.length ?? 0}
              </Badge>
              <Link
                onClick={() => {
                  setShowDocumentDialog(true);
                }}
              >
                Documents selected
              </Link>
            </div>
          </div>
          <div className="NewsletterHeader6">
            <Button
              disabled
              shape="circular"
              iconPosition="before"
              style={{ backgroundColor: "#D1D1D1", color: "white" }}
              icon={<ArrowClockwise24Filled primaryFill="white" />}
            >
              Re-Draft
            </Button>
          </div>
          <div className="NewsletterHeader7">
            <Button
              appearance="subtle"
              iconPosition="after"
              onClick={download}
              icon={<Share28Filled />}
            ></Button>
          </div>
        </div>
        <div className="NewsLetterMainGrid">
          <div className="NewsLetterMainDiv">
            <div className="NewsLetterMainDivHeaderDiv">
              <div className="NewsLetterMainDivHeaderDiv-1">
                <Text size={300} weight="semibold" color="#707070">
                  Newsletter draft
                </Text>
              </div>
              <div className="NewsLetterMainDivHeaderDiv-2">
                <Text
                  size={300}
                  weight="semibold"
                  color="#707070"
                  style={{ marginRight: "20px" }}
                >
                  AI Generated content might be wrong | <Link>How it works</Link>{" "}
                  | <Link>Provide Feeback</Link>
                </Text>
                <Button
                  iconPosition="before"
                  appearance="transparent"
                  icon={<CalendarDataBar24Filled />}
                  onClick={() => {
                    setShowDocumentDialog(true);
                  }}
                >
                  Show all sources
                </Button>
              </div>
            </div>
            <div className="NewsletterDraftDiv">
              <TextEditor
                draft={draft}
                editorState={editorState}
                setEditorState={setEditorState}
              ></TextEditor>
            </div>
          </div>
          <div className="NewsLetterChatDiv">
            <div className="CopilotChatDiv">
              <Chat></Chat>
            </div>
          </div>
        </div>
      </div>
      <CommonDialog
        open={showDocumentDialog || showTopicDocumentDialog}
        secondaryActionText={"Cancel"}
        maxWidth={showDocumentDialog ? 600 : 1200}
        onSecondaryAction={onClose}
      >
        {showDocumentDialog && (
          <SelectedDocumentsGrid documents={documents}></SelectedDocumentsGrid>
        )}
        {showTopicDocumentDialog && (
          <TopicModal 
          trees={selectedtrees!} 
          editMode={true} 
          topicParagraph={topicParagraph}
          setTopicParagraph={setTopicParagraph}
          >

          </TopicModal>
        )}
      </CommonDialog>
    </div>
  );
};

export default NewsLetterPage;
