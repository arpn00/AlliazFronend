import React from "react";
import { FC } from "react";
import { Text, Checkbox, Button, Input } from "@fluentui/react-components";
import { TopicTemplate } from "./TopicTemplate.tsx";
import "./TopicSelector.css";
import { TagMultiple24Filled,Next16Filled } from '@fluentui/react-icons';

interface TopicSelectorProps {}
const TopicSelector: FC<TopicSelectorProps> = (props) => {
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
          ></TopicTemplate>
          <TopicTemplate
            heading="Add Template"
            color="#228B22"
            newTemplate={true}
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
          style={{width:'400px'}}
          contentBefore={<TagMultiple24Filled primaryFill="#0077be" 
          />}
        />
      </div>
      <div className="ButtonDiv">
        <Button
          appearance="primary"
          size="medium"
          icon={<Next16Filled />}
          iconPosition="after"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TopicSelector;
