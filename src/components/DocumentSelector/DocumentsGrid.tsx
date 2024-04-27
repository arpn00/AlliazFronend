import * as React from "react";
import {
  Eye20Regular,
  Eye20Filled,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  EditFilled,
  MoreHorizontalFilled,
  MoreHorizontalRegular,
  bundleIcon,
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  Avatar,
  Button,
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
  TableCellActions,
  Tooltip,
} from "@fluentui/react-components";
import { FC } from "react";
import { DocumentsResponse } from "../../api/models.ts";
import { DocumentIcon } from "./DocumentIcon.tsx";
import DocumentViewer from "../DocumentViewer/DocumentViewer.tsx";

import { TableRowId } from "@fluentui/react-components";

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type Item = {
  file: FileCell;
};

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "file",
  }),
];

interface DocumentsGridProps {
  documents: DocumentsResponse[];
  selectedRows: Set<TableRowId>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<TableRowId>>>;
}

const DocumentsGrid: FC<DocumentsGridProps> = (props) => {
  const { documents, selectedRows, setSelectedRows } = props;
  const ViewIcon = bundleIcon(Eye20Filled, Eye20Regular);
  const [viewDocument, setViewDocument] = React.useState(false);
  const [currentDocument, setCurrentDocument] = React.useState<
    string | undefined
  >(undefined);
  const items: Item[] = documents.map((doc) => ({
    file: {
      label: !!doc.name ? doc.name?.split(".").slice(0, -1).join(".") : "",
      icon: !!doc.name ? (
        <DocumentIcon fileName={doc.name.toLowerCase()}></DocumentIcon>
      ) : (
        <DocumentRegular />
      ),
    },
  }));

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
        selectedItems: selectedRows,
        onSelectionChange: (e, data) => {
          setSelectedRows(data.selectedItems);
        },
      }),
    ]
  );

  const rows = getRows((row) => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) =>
        !e.defaultPrevented && toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === " " && !e.defaultPrevented) {
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

  const onClickCellActions = (e: React.MouseEvent<HTMLDivElement>) =>
    e.preventDefault();
  const onKeyDownCellActions = (e: React.KeyboardEvent<HTMLDivElement>) =>
    e.key === " " && e.preventDefault();

  return (
    <>
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

            <TableHeaderCell>File</TableHeaderCell>
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
                <TableCellActions
                  onClick={onClickCellActions}
                  onKeyDown={onKeyDownCellActions}
                >
                  <Tooltip
                    withArrow
                    content="View Document"
                    relationship="description"
                  >
                    <Button
                      icon={<ViewIcon />}
                      appearance="subtle"
                      aria-label="Edit"
                      onClick={() => {
                        setViewDocument(true);
                        setCurrentDocument(item.file.label);
                      }}
                    />
                  </Tooltip>
                </TableCellActions>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {viewDocument ? (
        <DocumentViewer
          open={viewDocument}
          setOpen={setViewDocument}
          FileName={currentDocument!}
        ></DocumentViewer>
      ) : null}
      ;
    </>
  );
};

// import * as React from "react";
// import {
//   FolderRegular,
//   EditRegular,
//   OpenRegular,
//   DocumentRegular,
//   PeopleRegular,
//   DocumentPdfRegular,
//   MailLinkRegular,
//   VideoRegular,
// } from "@fluentui/react-icons";
// import {
//   Avatar,
//   TableBody,
//   TableCell,
//   TableRow,
//   TableRowId,
//   Table,
//   TableHeader,
//   TableHeaderCell,
//   TableSelectionCell,
//   TableCellLayout,
//   useTableFeatures,
//   TableColumnDefinition,
//   useTableSelection,
//   createTableColumn,
//   TableCellActions
// } from "@fluentui/react-components";
// import { FC } from "react";
// import { DocumentsResponse } from "../../api/models.ts";
// import { DocumentIcon } from "./DocumentIcon.tsx";
// import { Eye20Regular } from "@fluentui/react-icons";
// import { Button } from "@fluentui/react-components";
// type FileCell = {
//   label: string;
//   icon: JSX.Element;
// };

// // type AuthorCell = {
// //   label: string;
// // };

// type ActionCell = {
//   url: string;
// };

// type Item = {
//   file: FileCell;
//   action: ActionCell;
// };

// const columns: TableColumnDefinition<Item>[] = [
//   createTableColumn<Item>({
//     columnId: "file",
//   }),
//   createTableColumn<Item>({
//     columnId: "action",
//   }),
// ];

// interface DocumentsGridProps {
//   documents: DocumentsResponse[];
//   selectedRows: Set<TableRowId>;
//   setSelectedRows: React.Dispatch<React.SetStateAction<Set<TableRowId>>>;
// }

// const DocumentsGrid: FC<DocumentsGridProps> = (props) => {
//   const { documents, selectedRows, setSelectedRows } = props;

//   const items: Item[] = documents.map((doc) => ({
//     file: {
//       label: !!doc.name ? doc.name?.split(".").slice(0, -1).join(".") : "",
//       icon: !!doc.name ? (
//         <DocumentIcon fileName={doc.name.toLowerCase()}></DocumentIcon>
//       ) : (
//         <DocumentRegular />
//       ),
//     },
//     action: { url: !!doc.name ? doc.name?.split(".").slice(0, -1).join(".") : "" },
//   }));

//   // const [selectedRows, setSelectedRows] = React.useState(
//   //   () => new Set<TableRowId>([0, 1])
//   // );
//   const {
//     getRows,
//     selection: {
//       allRowsSelected,
//       someRowsSelected,
//       toggleAllRows,
//       toggleRow,
//       isRowSelected,
//     },
//   } = useTableFeatures(
//     {
//       columns,
//       items,
//     },
//     [
//       useTableSelection({
//         selectionMode: "multiselect",
//         selectedItems: selectedRows,
//         onSelectionChange: (e, data) => {
//           setSelectedRows(data.selectedItems);
//         },
//       }),
//     ]
//   );

//   const rows = getRows((row) => {
//     const selected = isRowSelected(row.rowId);
//     return {
//       ...row,
//       onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
//       onKeyDown: (e: React.KeyboardEvent) => {
//         if (e.key === " ") {
//           e.preventDefault();
//           toggleRow(e, row.rowId);
//         }
//       },
//       selected,
//       appearance: selected ? ("brand" as const) : ("none" as const),
//     };
//   });

//   const toggleAllKeydown = React.useCallback(
//     (e: React.KeyboardEvent<HTMLDivElement>) => {
//       if (e.key === " ") {
//         toggleAllRows(e);
//         e.preventDefault();
//       }
//     },
//     [toggleAllRows]
//   );
//   const onClickCellActions = (e: React.MouseEvent<HTMLDivElement>) =>
//     e.preventDefault();
//   const onKeyDownCellActions = (e: React.KeyboardEvent<HTMLDivElement>) =>
//     e.key === " " && e.preventDefault();

//   function onView(url: string): React.MouseEventHandler<HTMLButtonElement> | undefined {
//     alert(url);
//     return undefined;
//   }

//   return (
//     <Table aria-label="Table with multiselect">
//       <TableHeader>
//         <TableRow>
//           <TableSelectionCell
//             checked={
//               allRowsSelected ? true : someRowsSelected ? "mixed" : false
//             }
//             onClick={toggleAllRows}
//             onKeyDown={toggleAllKeydown}
//             checkboxIndicator={{ "aria-label": "Select all rows " }}
//           />

//           <TableHeaderCell>Name</TableHeaderCell>
//           {/* <TableHeaderCell>Action</TableHeaderCell> */}
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
//           <TableRow
//             key={item.file.label}
//             onClick={onClick}
//             onKeyDown={onKeyDown}
//             aria-selected={selected}
//             appearance={appearance}
//           >
//             <TableSelectionCell
//               checked={selected}
//               checkboxIndicator={{ "aria-label": "Select row" }}
//             />
//             <TableCell>
//               <TableCellLayout media={item.file.icon}>
//                 {item.file.label}
//               </TableCellLayout>
//               <TableCellActions
//                 onClick={onClickCellActions}
//                 onKeyDown={onKeyDownCellActions}
//               >
//                 <Button
//                   icon={<Eye20Regular />}
//                   appearance="subtle"
//                   aria-label="Edit"
//                   onClick={onView(item.action.url)}
//                 />
//               </TableCellActions>
//             </TableCell>
//             {/* <TableCell>
//                <TableCellActions>
//                 <Button
//                   icon={<Eye20Regular />}
//                   appearance="subtle"
//                   aria-label="Edit"
//                   onClick={onView(item.action.url)}
//                 />
//               </TableCellActions>
//             </TableCell> */}
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

export default DocumentsGrid;
