import React from "react";
import { FC } from "react";
import { Edit24Filled, Add24Filled } from "@fluentui/react-icons";
import IconButton from "@mui/material/IconButton";

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
    <div className="card">
      <div className="card-heading">{heading}</div>
      <div className="icon">
        {newTemplate ? (
          <IconButton onClick={onClick}>
            <Add24Filled primaryFill={color} ></Add24Filled>
          </IconButton>
        ) : (
          <IconButton onClick={onClick}>
            <Edit24Filled primaryFill={color}></Edit24Filled>
          </IconButton>
        )}
      </div>
    </div>
  );
};
