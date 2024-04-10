import React, { useEffect, useMemo } from "react";
import "./DataSource.css";
import { Text, Checkbox, Button, Input } from "@fluentui/react-components";
import DateRange from "../DateRange.tsx";
import { CounterBadge, Badge } from "@fluentui/react-components";
import { CloudAdd24Filled, Next16Filled } from "@fluentui/react-icons";
import { CommonDialog } from "../Dialog/CommonDialog.tsx";
import DocumentSelector from "../DocumentSelector/DocumentSelector.tsx";
import { DateRangeType } from "@fluentui/react-calendar-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { getDocuments } from "../../api/api.ts";
import { FC, useState } from "react";
import { DocumentsResponseBody, DocumentsResponse } from "../../api/models.ts";
import { TableRowId } from "@fluentui/react-components";
interface DataSourceProps {
  onContinue: () => void;
  selectedStartDate : Date | null | undefined;
  setSelectedStartDate :  React.Dispatch<React.SetStateAction<Date | null | undefined>>;
  selectedEndDate: Date | null | undefined;
  setSelectedEndDate:  React.Dispatch<React.SetStateAction<Date | null | undefined>>;
  selectedDocuments : DocumentsResponse[];
  setSelectedDocuments :  React.Dispatch<React.SetStateAction<DocumentsResponse[]>>;
}

const DataSource: FC<DataSourceProps> = (props) => {
  const { onContinue,selectedStartDate,setSelectedStartDate,selectedEndDate,setSelectedEndDate,selectedDocuments,setSelectedDocuments } = props;

  const [showDocumentDialog, setshowDocumentDialog] = useState<boolean>(false);
  const [documentsFromSource, setDocumentsFromSource] = useState<
    DocumentsResponse[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<Set<TableRowId>>(new Set());

  useMemo(() => {
    let documentsSelected = documentsFromSource.filter((document, index) =>
      selectedRows.has(index)
    );
    setSelectedDocuments(documentsSelected);
  }, [selectedRows]);

  const onClose = () => {
    setshowDocumentDialog(false);
  };
  useEffect(() => {
    Getdocuments();
  }, []);
  const Getdocuments = () => {
    getDocuments()
      .then(() => {
        const documentsResponses: DocumentsResponse[] = [
          { link: "example-link-1", name: "AIM Capial Market Update.eml" },
          { link: "example-link-2", name: "European Central Bank Article.pdf" },
          { link: "example-link-2", name: "Morning News Call - Europe.eml" },
          { link: "example-link-2", name: "Early Morning Reid.pdf" },
        ];
        setDocumentsFromSource(documentsResponses);
      })
      .catch((error) => {});
  };

  const onOpen = () => {
    setshowDocumentDialog(true);
  };
  return (
    <div className="DataSourceDiv">
      <div className="SourceDiv">
        <Text size={500} weight="semibold">
          Data Source
        </Text>
      </div>
      <div className="SourceCheckBoxDiv">
        <Checkbox label="Refinitiv" />
      </div>
      <div className="TimeFrameDiv">
        <Text size={500} weight="semibold">
          Time Frame
        </Text>
      </div>
      <div className="TimeFrameSelectorDiv">
        <DatePicker
          onSelectDate={setSelectedStartDate}
          style={{
            width: "150px",
            margin: "5px",
            borderColor: selectedStartDate === null ? "red" : "initial",
          }}
          calendar={{
            dateRangeType: DateRangeType.Day,
          }}
          placeholder="Select Start Date"
        />
        <DatePicker
          onSelectDate={setSelectedEndDate}
          minDate={selectedStartDate!}
          disabled={!!!selectedStartDate}
          style={{
            width: "150px",
            margin: "5px",
            borderColor:
              selectedEndDate === null && !!selectedStartDate
                ? "red"
                : "revert-layer",
          }}
          calendar={{
            dateRangeType: DateRangeType.Day,
          }}
          placeholder="Select End Date"
        />
      </div>
      <div className="DocumentsHeaderDiv">
        <Text size={500} weight="semibold">
          Documents
        </Text>
      </div>
      <div className="DocumentsSelectorDiv">
        <div className="DocumentsSelectorSubDiv">
          <Button
            icon={<CloudAdd24Filled primaryFill="green" />}
            iconPosition="after"
            onClick={onOpen}
          >
            Select from storage
          </Button>
        </div>
        <div className="documentsSelectorSubDiv">
          {selectedRows.size === 0 ? (
            <Badge color="danger" size="small">
              0
            </Badge>
          ) : (
            <CounterBadge
              color="brand"
              count={selectedRows.size}
              size="small"
            ></CounterBadge>
          )}
        </div>
      </div>
      <div className="ContinueButtonDiv">
        <Button
          appearance="primary"
          size="medium"
          icon={<Next16Filled />}
          iconPosition="after"
          onClick={onContinue}
          disabled={
            selectedRows.size === 0 ||
            selectedStartDate === null ||
            selectedEndDate === null
          }
        >
          Continue
        </Button>
      </div>
      <CommonDialog
        open={showDocumentDialog}
        secondaryActionText={"Close"}
        maxWidth={1200}
        onSecondaryAction={onClose}
      >
        <DocumentSelector
          documents={documentsFromSource}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        ></DocumentSelector>
      </CommonDialog>
    </div>
  );
};

export default DataSource;
