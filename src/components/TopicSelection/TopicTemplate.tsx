import React from "react";
import { FC } from "react";
import { Edit24Filled, Add24Filled } from "@fluentui/react-icons";
// import IconButton from "@mui/material/IconButton";
import {  Button } from "@fluentui/react-components";

interface TopicTemplateProps {
  heading: string;
  color?: string;
  newTemplate?: boolean;
  onClick : () => void;
}
export const TopicTemplate: FC<TopicTemplateProps> = ({
  heading,
  newTemplate = false,
  color = "#555555",
  onClick
}) => {
  return (
    <div className="card" >
      <div className="card-heading">{heading}</div>
      <div className="icon">
        {newTemplate ? (
          <Button appearance="subtle"  onClick={onClick} disabled> <Add24Filled primaryFill={color} ></Add24Filled></Button>
        ) : (
          <Button appearance="subtle" onClick={onClick} >
            <Edit24Filled primaryFill={color}></Edit24Filled>
          </Button>
        )}
      </div>
    </div>
  );
};
