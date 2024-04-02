import React from "react";
import "./DataSource.css";
import { Text, Checkbox, Button, Input } from "@fluentui/react-components";
import DateRange from "../DateRange.tsx";
import {
  CloudAdd24Filled,
  Next16Filled,
} from "@fluentui/react-icons";
import { CommonDialog } from "../Dialog/CommonDialog.tsx";
import DocumentSelector from "../DocumentSelector/DocumentSelector.tsx";

import { FC, useState } from "react";

interface DataSourceProps {
  onContinue : () => void;
  }

const DataSource : FC<DataSourceProps> = (props) => {
  const { onContinue } = props;

  const [showDocumentDialog, setshowDocumentDialog] = useState<boolean>(false);
  const onClose = () => {
    setshowDocumentDialog(false);
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
        <DateRange placeholder="Select Start Date"></DateRange>
        <DateRange placeholder="Select End Date"></DateRange>
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
        <DocumentSelector></DocumentSelector>
      </CommonDialog>
    </div>
  );
};

export default DataSource;
