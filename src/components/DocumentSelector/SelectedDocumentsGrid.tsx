import * as React from "react";
import { DocumentRegular } from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
} from "@fluentui/react-components";

import { DocumentsResponse } from "../../api/models.ts";
import { DocumentIcon } from "./DocumentIcon.tsx";
import { FC } from "react";

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type Item = {
  file: FileCell;
};

// const items: Item[] = [
//   {
//     file: { label: "AIM Capial Market Update",
//     icon: <MailLinkRegular primaryFill="blue"/> },
//   },
//   {
//     file: {
//       label: "European Central Bank Article",
//       icon: <DocumentPdfRegular  primaryFill="red"/>,
//     },
//   },
//   {
//     file: { label: "Morning News Call - Europe",
//     icon: <MailLinkRegular primaryFill="blue"/> },
//   },
//   {
//     file: { label: "Early Morning Reid",
//     icon: <DocumentPdfRegular primaryFill="red"/> },
//   },
// ];

const columns = [{ columnKey: "file", label: "File" }];

interface SelectedDocumentsGridProps {
  documents: DocumentsResponse[];
}
const SelectedDocumentsGrid: FC<SelectedDocumentsGridProps> = (props) => {
  const { documents } = props;
  const items: Item[] = documents.map((doc) => ({
    file: {
      label: !!doc.name ? doc.name?.split(".").slice(0, -1).join(".") : "",
      icon: !!doc.name ? (
        <DocumentIcon fileName={doc.name.toLowerCase()}></DocumentIcon>
      ) : (
        <DocumentRegular />
      ),
    },
    author: { label: "Max Mustermann" },
  }));
  return (
    <Table arial-label="Selected Documents">
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell key={column.columnKey}>
              {column.label}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout media={item.file.icon}>
                {item.file.label}
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SelectedDocumentsGrid;
