import React from "react";
import { FC } from "react";
import { Edit24Filled, Add24Filled } from "@fluentui/react-icons";
import IconButton from "@mui/material/IconButton";

interface TopicTemplateProps {
  heading: string;
  color?: string;
  newTemplate?: boolean;
}
export const TopicTemplate: FC<TopicTemplateProps> = ({
  heading,
  newTemplate = false,
  color = "#555555",
}) => {
  return (
    <div className="card">
      <div className="card-heading">{heading}</div>
      <div className="icon">
        {newTemplate ? (
          <IconButton>
            <Add24Filled primaryFill={color}></Add24Filled>
          </IconButton>
        ) : (
          <IconButton>
            <Edit24Filled primaryFill={color}></Edit24Filled>
          </IconButton>
        )}
      </div>
    </div>
  );
};
