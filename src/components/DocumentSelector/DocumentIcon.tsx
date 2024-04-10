import * as React from "react";
import { FC, useState } from "react";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  MailLinkRegular,
  VideoRegular,
} from "@fluentui/react-icons";
interface DocumentIconProps {
  fileName: string;
}
export const DocumentIcon: FC<DocumentIconProps> = (props) => {
  const { fileName } = props;
  const fileExtension = fileName?.split(".").pop();

  return (
    <>
      {fileName?.indexOf("pdf")! > 0 ? (
        <DocumentPdfRegular primaryFill="red"></DocumentPdfRegular>
      ) : fileName?.indexOf("eml")! > 0 ? (
        <MailLinkRegular primaryFill="blue"></MailLinkRegular>
      ) : (
        <DocumentRegular></DocumentRegular>
      )}
    </>
  );
};
