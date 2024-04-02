import React, { FC, useState } from "react";
import { Text, Button, Input } from "@fluentui/react-components";
import { TopicTemplate } from "./TopicTemplate.tsx";
import "./TopicSelector.css";
import { TagMultiple24Filled, Next16Filled } from "@fluentui/react-icons";
import { CommonDialog } from "../Dialog/CommonDialog.tsx";
import { HeadlessFlatTreeItemProps } from "@fluentui/react-components";
import TopicModal from "../TopicSelection/TopicModal.tsx"
type CustomItem = HeadlessFlatTreeItemProps & { content: string };


interface TopicSelectorProps {
  onContinue: () => void;
  
}
const TopicSelector: FC<TopicSelectorProps> = (props) => {
  const { onContinue } = props;

  const [showPromptDialog, setShowPromptDialog] = useState<boolean>(false);
  const items: CustomItem[] = [
    {
      value: "1",
      content: "Short capital market summary - overall 2 to 5 sentences",
    },
    {
      value: "1-1",
      parentValue: "1",
      content: "Which three news topics were mentioned the most ?",
    },
    {
      value: "1-2",
      parentValue: "1",
      content:
        "Which asset classes have been mentioned in relation with these three new topics ?",
    },
    {
      value: "1-3",
      parentValue: "1",
      content: "How did these asset classes develop over these time HORIZON",
    },
    {
      value: "1-4",
      parentValue: "1",
      content: "which news have affected asset prices most",
    },

    {
      value: "2",
      content: "Intrest rates and central banks - overall 3 to 8 sentences",
    },
    { value: "3", content: "Credit markets - overal 2 to 5 sentences" },
  ];
  const onClose = () => {
    setShowPromptDialog(false);
  };

  const onOpen = () => {
    setShowPromptDialog(true);
  };

  return (
    <div className="TopicSelectionDiv">
      <div className="TopicHeaderDiv">
        <Text size={500} weight="semibold">
          Configure Template
        </Text>
      </div>
      <div className="TopicTemplateDiv">
        <div className="templateCon">
          <TopicTemplate
            heading="Test template 2"
            color="#4B0082"
            onClick = {onOpen}
          ></TopicTemplate>
          <TopicTemplate
            heading="Add Template"
            color="#228B22"
            newTemplate={true}
            onClick = {onOpen}
          ></TopicTemplate>
        </div>
      </div>
      <div className="HotTopicsDiv">
        <Text size={500} weight="semibold">
          Hot Topics
        </Text>
      </div>
      <div className="TagsDiv">
        <Input
          size="large"
          style={{ width: "400px" }}
          contentBefore={<TagMultiple24Filled primaryFill="#0077be" />}
        />
      </div>
      <div className="ButtonDiv">
        <Button
          appearance="primary"
          size="medium"
          icon={<Next16Filled />}
          iconPosition="after"
          onClick={onContinue}
        >
          Craete Draft
        </Button>
      </div>
      <CommonDialog
        open={showPromptDialog}
        secondaryActionText={"Cancel"}
        maxWidth={800}
        onSecondaryAction={onClose}
        primaryActionText="Save"
        onPrimaryAction={onClose}
      >
        <TopicModal items={items}></TopicModal>
      </CommonDialog>
    </div>
  );
};

export default TopicSelector;
