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

type AuthorCell = {
  label: string;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
};

const items: Item[] = [
  {
    file: { label: "AIM Capial Market Update", 
    icon: <MailLinkRegular primaryFill="blue"/> },
    author: { label: "Max Mustermann" },
  },
  {
    file: {
      label: "European Central Bank Article",
      icon: <DocumentPdfRegular  primaryFill="red"/>,
    },
    author: { label: "Erika Mustermann" },
  },
  {
    file: { label: "Morning News Call - Europe", 
    icon: <MailLinkRegular primaryFill="blue"/> },
    author: { label: "Daisy Phillips" },
  },
  {
    file: { label: "Early Morning Reid", 
    icon: <DocumentPdfRegular primaryFill="red"/> },
    author: { label: "Kat Larrson" },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "file",
  }),
  createTableColumn<Item>({
    columnId: "author",
  }),
  createTableColumn<Item>({
    columnId: "lastUpdated",
  }),
  createTableColumn<Item>({
    columnId: "lastUpdate",
  }),
];

const DocumentsGrid = () => {
  const {
    getRows,
    selection: {
      allRowsSelected,
      someRowsSelected,
      toggleAllRows,
      toggleRow,
      isRowSelected,
    },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: "multiselect",
        defaultSelectedItems: new Set([0, 1]),
      }),
    ]
  );

  const rows = getRows((row) => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === " ") {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ("brand" as const) : ("none" as const),
    };
  });

  const toggleAllKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === " ") {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [toggleAllRows]
  );

  return (
    <Table aria-label="Table with multiselect">
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={
              allRowsSelected ? true : someRowsSelected ? "mixed" : false
            }
            onClick={toggleAllRows}
            onKeyDown={toggleAllKeydown}
            checkboxIndicator={{ "aria-label": "Select all rows " }}
          />

          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
          <TableRow
            key={item.file.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={appearance}
          >
            <TableSelectionCell
              checked={selected}
              checkboxIndicator={{ "aria-label": "Select row" }}
            />
            <TableCell>
              <TableCellLayout media={item.file.icon}>
                {item.file.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={<Avatar aria-label={item.author.label} />}
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DocumentsGrid;
