import * as React from "react";
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
import {
  Avatar,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  useTableFeatures,
  TableColumnDefinition,
  useTableSelection,
  createTableColumn,
} from "@fluentui/react-components";

import {
  DocumentPdf24Filled,
  MailLink24Filled,
} from "@fluentui/react-icons";

type FileCell = {
  label: string;
  icon: JSX.Element;
};



type Item = {
  file: FileCell;
};

const items: Item[] = [
  {
    file: { label: "AIM Capial Market Update", 
    icon: <MailLinkRegular primaryFill="blue"/> },
  },
  {
    file: {
      label: "European Central Bank Article",
      icon: <DocumentPdfRegular  primaryFill="red"/>,
    },
  },
  {
    file: { label: "Morning News Call - Europe", 
    icon: <MailLinkRegular primaryFill="blue"/> },
  },
  {
    file: { label: "Early Morning Reid", 
    icon: <DocumentPdfRegular primaryFill="red"/> },
  },
];

const columns = [
    { columnKey: "file", label: "File" },
  ];

const SelectedDocumentsGrid = () => {
  
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
