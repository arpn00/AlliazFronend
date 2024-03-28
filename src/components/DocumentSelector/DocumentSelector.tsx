import React from "react";
import "./DocumentSelector.css";
import { Text, Checkbox, Button ,Input} from "@fluentui/react-components";
import { DocumentPdf24Filled ,MailLink24Filled,Filter24Filled} from '@fluentui/react-icons';
import DocumentsGrid from "../DocumentSelector/DocumentsGrid.tsx"
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components";
const DocumentSelector = () => {
  return (
    <><Dialog>
    <DialogTrigger disableButtonEnhancement>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogSurface>
      <DialogBody>
        <DialogContent>
        <div className="DocContainer">
      <div className="TopNavGrid">
        <div className="DocHeaderDiv">
          <Text size={500} weight="semibold">
            Recent
          </Text>
        </div>
        <div className="AllSelectionDiv">
          <Button  shape="circular">All</Button>
        </div>
        <div className="PdfSelectionDiv">
        <Button  shape="circular" icon={<DocumentPdf24Filled primaryFill="#FF0000"></DocumentPdf24Filled>} iconPosition="before">PDF</Button>
        </div>
        <div className="EmailSelectionDiv">
        <Button  shape="circular" icon={<MailLink24Filled primaryFill="blue"></MailLink24Filled>} iconPosition="before">Eml</Button>
        </div>
        <div className="FreeTextSearchDiv">
        <Input contentBefore={<Filter24Filled/>} placeholder="Filter by name or keyword" />
        </div>
      </div>
      <div className="DocTableGrid">
        <DocumentsGrid></DocumentsGrid>
      </div>
    </div>
        </DialogContent>
      </DialogBody>
    </DialogSurface>
  </Dialog></>
    






  );
};

export default DocumentSelector;
