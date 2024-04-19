import React, { FC, useState, useEffect } from "react";
import { Text, Button, Input } from "@fluentui/react-components";
import { TopicTemplate } from "./TopicTemplate.tsx";
import "./TopicSelector.css";
import { TagMultiple24Filled, Next16Filled } from "@fluentui/react-icons";
import { CommonDialog } from "../Dialog/CommonDialog.tsx";
import { TopicModal } from "../TopicSelection/TopicModal.tsx";
import { getQuestionnaire } from "../../api/api.ts";
import { QuestionnaireResponse } from "../../api/models.ts";
import {
  TreeItemValue,
  TreeSelectionValue,
  HeadlessFlatTreeItemProps,
} from "@fluentui/react-components";
import { createSubTreeFromQuestionnaire } from "../../Util/Util.ts";

type ItemProps = HeadlessFlatTreeItemProps & { content: string };

interface TopicSelectorProps {
  onContinue: () => void;
  selectedtrees: ItemProps[][] | undefined;
  setSelectedtrees: React.Dispatch<ItemProps[][]>;
  questionnaire: QuestionnaireResponse[];
}
const TopicSelector: FC<TopicSelectorProps> = (props) => {
  const { onContinue, selectedtrees, setSelectedtrees, questionnaire } = props;
  const [showPromptDialog, setShowPromptDialog] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] =
    React.useState<Map<TreeItemValue, TreeSelectionValue>>();
  const [trees, setTrees] = React.useState<ItemProps[][]>();

  useEffect(() => {
    const subtrees = createSubTreeFromQuestionnaire(questionnaire);
    setTrees(subtrees);
  }, [questionnaire]);

  useEffect(() => {
    if (checkedItems) {
      const newSelectedTrees = calculateSelectedTrees(checkedItems);
      setSelectedtrees(newSelectedTrees!);
    }
  }, [checkedItems, setSelectedtrees]);

  const calculateSelectedTrees = (
    checkedItems: Map<TreeItemValue, TreeSelectionValue>
  ): ItemProps[][] | undefined => {
    const checkedItemsArray = Array.from(checkedItems!)
      .filter(
        ([key, value]) => value === true && !key.toString().endsWith("-btn")
      )
      .map(([key, value]) => `${key}`);
    return trees!.filter((subArray) => {
      return subArray.some((item) =>
        checkedItemsArray.includes(item.value.toString())
      );
    });
  };



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
            heading="Global Market"
            color="#4B0082"
            onClick={onOpen}
          ></TopicTemplate>
          <TopicTemplate
            heading="Add Template"
            color="#228B22"
            newTemplate={true}
            onClick={onOpen}
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
          size="large"
          icon={<Next16Filled />}
          iconPosition="after"
          onClick={onContinue}
          disabled = {selectedtrees === undefined || selectedtrees?.length ==0}
        >
          Create Draft
        </Button>
      </div>
      <CommonDialog
        open={showPromptDialog}
        maxWidth={1200}
        primaryActionText="Close"
        onPrimaryAction={onClose}
      >
        <TopicModal
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          setTrees={setTrees}
          trees={trees!}
        ></TopicModal>
      </CommonDialog>
    </div>
  );
};

export default TopicSelector;
