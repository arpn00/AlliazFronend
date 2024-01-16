import * as React from "react";
import { CardHeader } from "@fluentui/react-components";
import {
  makeStyles,
  shorthands,
  Button,
  Body1,
  Caption1,
} from "@fluentui/react-components";
import { MoreHorizontal20Regular } from "@fluentui/react-icons";
import { getCitationFilePath } from "../../api/api.ts";

import fileIcon from "../../assets/pdf.jpg"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.padding("16px"),
    ...shorthands.gap("16px"),
  },
  header: {
    width: "400px",
  },
});

interface Props {

  onCitationClicked: (filePath: string) => void;
  fileName: string;
  score: number | undefined;
  page: number | undefined;
  refNumber: number | undefined;

}

export const CitationCard = ({
  onCitationClicked,
  fileName,
  score,
  page,
  refNumber }: Props) => {

  const styles = useStyles();
  return (
    <div className={styles.container}>
      <CardHeader
        className={styles.header}
        image={{
          as: "img",
          src: fileIcon,
          alt: "Microsoft PowerPoint logo",
        }}
        header={
          <Body1>
            <b>{fileName}</b>
          </Body1>
        }
        description={<Caption1>{refNumber} {page} {score}</Caption1>}
        action={
          <Button
            appearance="transparent"
            icon={<MoreHorizontal20Regular />}
            aria-label="More options"
            onClick={() => onCitationClicked(getCitationFilePath(fileName))}
          />
        }
      />
    </div>
  );
};