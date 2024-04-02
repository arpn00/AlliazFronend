import React from "react";
import { FC } from "react";
import { Card, CardHeader, CardFooter } from "@fluentui/react-components";
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Text,
  Caption1,
  Subtitle1,
  Body1,
  mergeClasses,
} from "@fluentui/react-components";
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
    // <Card >
    //   <CardHeader
    //     header={
    //       <Text size={300} weight="semibold" align="center">
    //         {heading}
    //       </Text>
    //     }
    //   />
    //   <CardFooter>
    //     {newTemplate == true ? (
    //       <IconButton>
    //         <Add24Filled primaryFill={color}></Add24Filled>
    //       </IconButton>
    //     ) : (
    //       <IconButton>
    //         <Edit24Filled primaryFill={color}></Edit24Filled>
    //       </IconButton>
    //     )}
    //   </CardFooter>
    // </Card>
  );
};
