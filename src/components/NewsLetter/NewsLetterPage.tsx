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
import SelectedDocumentsGrid from "../DocumentSelector/SelectedDocumentsGrid.tsx"
import { CommonDialog } from "../Dialog/CommonDialog.tsx";

import Chat from "../../pages/chat/Chat.tsx";
const NewsLetterPage = () => {
  const [showDocumentDialog, setShowDocumentDialog] = useState<boolean>(false);
  const onClose = () => {
    setShowDocumentDialog(false);
  };
  const dummyData = `<h1>Bloomberg Market Research Report</h1>
  <p><b>Another week, another step closer to the first rate cut although the disinflation path remains bumpy.</b> With Jeremy Powell stating that interest rates cuts would be appropriate “at some point this year” and Christine Laggard referring to “dialling back monetary restrictions”, markets have priced a near certain first cut in June – as we expect, subject to further data releases until June. Whether the FED or the ECB will cut first remains less clear. Risky assets responded positively to the pending rate cuts, with equities mildly up, whilst credit and EM spreads tightened. On credit, the positive developments at Aareal, NYCB and Pfandbriefbank gave further support.</p><p></p>
  <p>As expected, <b>the ECB kept rates unchanged last Thursday</b>. Growth data in the Eurozone strengthened the case for a soft landing scenario, followed by a shy recovery. Powell’s testimony to the Congress also relieved markets, due to fears that the recent upside surprises in inflation could trigger a hawkish shift, though that didn’t happen. Central bankers reemphasised that rate cuts require compelling evidence of disinflation, as avoiding a dovish mistake remains top of mind. Unfortunately, the US job reports last week were “rather ambiguous” (as mentioned by our colleagues in the US): nonfarm payrolls rose 275k in February, above the 200k forecast, but there were 167k of downward revisions to the past two months, so the net improvement was little more than 100k. Still, this was better than the ISM employment indices, which were both in contraction territory. On balance, weaker job reports are consistent with a likely cut in June. Both EUR and USD rates bull flattened during the week, depicting expectations of disinflation amidst slower growth.</p><p></p>
  <p><b>In credit, spreads continued their tightening trend year-to-date, also benefiting from the positive developments at Aareal, NYCB and Pfandbriefbank.</b> These smaller lenders specialised in real estate made headlines as higher interest rates reduced real estate valuations, leading to substantially higher provisions. Pfandbriefbank’s management statement that “this was the hardest real estate crisis since the GFC”, didn’t exactly soothe the media. However, the earnings & positive outlooks recently announced by Aareal and PBB were well received by investors. The private capital raised by NYCB provided further relief to US regional banks, stemming fears of a March 23 rerun.</p><p></p>
  `;

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
                onClick={() =>{setShowDocumentDialog(true); }}
              >
                3
              </Badge>
              <Link onClick={() =>{setShowDocumentDialog(true)}}>Documents selected</Link>
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
                  onClick={() =>{setShowDocumentDialog(true)}}
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
      <CommonDialog
        open={showDocumentDialog}
        secondaryActionText={"Cancel"}
        maxWidth={600}
        onSecondaryAction={onClose}
      >
        <SelectedDocumentsGrid></SelectedDocumentsGrid>
      </CommonDialog>
    </div>
  );
};

export default NewsLetterPage;
