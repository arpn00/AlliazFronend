import React from "react";
import "./DocumentSelector.css";
import { Text, Button, Input } from "@fluentui/react-components";
import {
  DocumentPdf24Filled,
  MailLink24Filled,
  Filter24Filled,
} from "@fluentui/react-icons";
import DocumentsGrid from "../DocumentSelector/DocumentsGrid.tsx";
import { DocumentsResponseBody, DocumentsResponse } from "../../api/models.ts";
import { FC, useState, useMemo } from "react";
import {
  TableRowId,
} from "@fluentui/react-components";

interface DocumentSelectorProps {
  documents: DocumentsResponse[];
  selectedRows: Set<TableRowId>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<TableRowId>>>;
}

const DocumentSelector: FC<DocumentSelectorProps> = (props) => {
  const { documents, selectedRows, setSelectedRows } = props;
  const [filterSelected, setFilterSelected] = useState<string>("All");
  const [filterText, setFilterText] = useState("");

  const filteredDocuments = useMemo(() => {
    let filteredDoc = documents;

    if (filterSelected != "All") {
      filteredDoc = filteredDoc.filter(
        (doc) => doc.name?.split(".").pop() === filterSelected
      );
    }

    if (filterText.trim() !== "") {
      filteredDoc = filteredDoc.filter((doc) =>
        doc.name.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    return filteredDoc;
  }, [documents, filterSelected, filterText]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };
  return (
    <>
      <div className="DocContainer">
        <div className="TopNavGrid">
          <div className="DocHeaderDiv">
            <Text size={500} weight="semibold">
              Recent ({selectedRows})
            </Text>
          </div>
          <div className="AllSelectionDiv">
            <Button shape="circular" onClick={() => setFilterSelected("All")}>
              All
            </Button>
          </div>
          <div className="PdfSelectionDiv">
            <Button
              shape="circular"
              icon={
                <DocumentPdf24Filled primaryFill="#FF0000"></DocumentPdf24Filled>
              }
              iconPosition="before"
              onClick={() => setFilterSelected("pdf")}
            >
              PDF
            </Button>
          </div>
          <div className="EmailSelectionDiv">
            <Button
              shape="circular"
              icon={<MailLink24Filled primaryFill="blue"></MailLink24Filled>}
              iconPosition="before"
              onClick={() => setFilterSelected("eml")}
            >
              Eml
            </Button>
          </div>
          <div className="FreeTextSearchDiv">
            <Input
              contentBefore={<Filter24Filled />}
              placeholder="Filter by name or keyword"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="DocTableGrid">
          <DocumentsGrid documents={filteredDocuments} selectedRows={selectedRows} setSelectedRows={setSelectedRows}></DocumentsGrid>
        </div>
      </div>
    </>
  );
};

export default DocumentSelector;
