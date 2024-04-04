import React, { useState } from "react";
import { FC } from "react";
import { Text, Button, Input, Link, Badge } from "@fluentui/react-components";
import MyRichTextEditor from "../RichTextEditor/TextEditor.tsx";
import {
  CalendarDate24Regular,
  ArrowClockwise24Filled,
  Share28Filled,
  CalendarDataBar24Filled,
} from "@fluentui/react-icons";

import Chat from "../../pages/chat/Chat.tsx";
const NewsLetterPage = () => {
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
              EIKON
            </Text>
          </div>
          <div className="NewsletterHeader3">
            <Input
              contentBefore={<CalendarDate24Regular primaryFill="blue" />}
              disabled
              placeholder="02-Jan to 15-Jan"
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
              <Link>Global Market</Link>
            </div>
            <div className="NewsletterHeader4-3">
              <Text size={300} weight="semibold">
                Topic
              </Text>
            </div>
            <div className="NewsletterHeader4-4">
              <Link>Market Shift</Link>
            </div>
          </div>
          <div className="NewsletterHeader5">
            <div className="NewsletterHeader5-1">
              <Badge
                appearance="filled"
                color="brand"
                style={{ marginRight: "10px" }}
              >
                3
              </Badge>
              <Link>Documents selected</Link>
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
              icon={<Share28Filled />}
            ></Button>
          </div>
        </div>
        <div className="NewsLetterMainGrid">
          <div className="NewsLetterMainDiv">
            <div className="NewsLetterMainDivHeaderDiv">
              <div className="NewsLetterMainDivHeaderDiv-1">
                <Text size={400} weight="semibold" color="#707070">
                  Newsletter draft
                </Text>
              </div>
              <div className="NewsLetterMainDivHeaderDiv-2">
                <Text
                  size={400}
                  weight="semibold"
                  color="#707070"
                  style={{ marginRight: "20px" }}
                >
                  AI Generated content might be wrong |{" "}
                  <Link>How it works</Link> | <Link>Provide Feeback</Link>
                </Text>
                <Button
                  iconPosition="before"
                  appearance="transparent"
                  icon={<CalendarDataBar24Filled />}
                >
                  Show all sources
                </Button>
              </div>
            </div>
            <div className="NewsletterDraftDiv">
              <MyRichTextEditor></MyRichTextEditor>
            </div>
          </div>
          <div className="NewsLetterChatDiv">
            <div className="CopilotChatDiv">
              <Chat></Chat>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterPage;
