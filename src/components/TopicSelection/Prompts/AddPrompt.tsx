import { FC, useState, useMemo } from "react";
import {
  makeStyles,
  shorthands,
  useId,
  Input,
  Label,
} from "@fluentui/react-components";
import React from "react";
import type { InputProps } from "@fluentui/react-components";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),

  },
});

interface AddPromptProps {
  setNewPrompt: React.Dispatch<React.SetStateAction<string | undefined>>;
  newPrompt: string | undefined;
}

export const AddPrompt: FC<AddPromptProps> = (props) => {
  const { newPrompt, setNewPrompt } = props;
  const styles = useStyles();
  const inputId = useId("input");
  const onChange: InputProps["onChange"] = (ev, data) => {
    setNewPrompt(data.value);
  };
  return (
    <div className={styles.root}>
      <Input id={inputId} {...props} defaultValue= {newPrompt} onChange={onChange}/>
    </div>
  );
};
