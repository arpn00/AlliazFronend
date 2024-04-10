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
  TableRowId,
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
import { FC } from "react";
import { DocumentsResponse } from "../../api/models.ts";
import {DocumentIcon} from "./DocumentIcon.tsx"

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

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "file",
  }),
  createTableColumn<Item>({
    columnId: "author",
  })
];

interface DocumentsGridProps {
  documents: DocumentsResponse[];
}

const DocumentsGrid: FC<DocumentsGridProps> = (props) => {
  const { documents } = props;
  const items: Item[] = documents.map((doc) => ({
    file: {
      label: !!doc.name ? doc.name?.split('.').slice(0, -1).join('.') : '',
      icon: !!doc.name? <DocumentIcon fileName= {doc.name.toLowerCase()}></DocumentIcon> :<DocumentRegular/>,
    },
    author: { label: "Max Mustermann" },
  }));

  const [selectedRows, setSelectedRows] = React.useState(
    () => new Set<TableRowId>([0, 1])
  );
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
        onSelectionChange: (e, data) => {
          console.log("I am here");
          setSelectedRows(data.selectedItems);
        },
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
