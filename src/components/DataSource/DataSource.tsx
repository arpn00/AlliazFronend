import React, { useEffect } from "react";
import "./DataSource.css";
import { Text, Checkbox, Button, Input } from "@fluentui/react-components";
import DateRange from "../DateRange.tsx";
import { CloudAdd24Filled, Next16Filled } from "@fluentui/react-icons";
import { CommonDialog } from "../Dialog/CommonDialog.tsx";
import DocumentSelector from "../DocumentSelector/DocumentSelector.tsx";
import { DateRangeType } from "@fluentui/react-calendar-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { getDocuments } from "../../api/api.ts";
import { FC, useState } from "react";
import { DocumentsResponseBody, DocumentsResponse } from "../../api/models.ts";

interface DataSourceProps {
  onContinue: () => void;
}

const DataSource: FC<DataSourceProps> = (props) => {
  const { onContinue } = props;

  const [showDocumentDialog, setshowDocumentDialog] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<
    Date | null | undefined
  >(null);
  const [selectedEndDate, setSelectedEndDate] = useState<
    Date | null | undefined
  >(null);
  const [documentsFromSource, setDocumentsFromSource] = useState<
    DocumentsResponse[]
  >([]);
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
          style={{ width: "150px", margin: "5px" }}
          calendar={{
            dateRangeType: DateRangeType.Day,
          }}
          placeholder="Select Start Date"
        />
        <DatePicker
          onSelectDate={setSelectedEndDate}
          minDate={selectedStartDate!}
          disabled={!!!selectedStartDate}
          style={{ width: "150px", margin: "5px" }}
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
        <Button
          icon={<CloudAdd24Filled primaryFill="green" />}
          iconPosition="after"
          onClick={onOpen}
        >
          Select from storage
        </Button>
      </div>
      <div className="ContinueButtonDiv">
        <Button
          appearance="primary"
          size="medium"
          icon={<Next16Filled />}
          iconPosition="after"
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
      <CommonDialog
        open={showDocumentDialog}
        secondaryActionText={"Cancel"}
        maxWidth={1200}
        onSecondaryAction={onClose}
      >
        <DocumentSelector documents={documentsFromSource}></DocumentSelector>
      </CommonDialog>
    </div>
  );
};

export default DataSource;
