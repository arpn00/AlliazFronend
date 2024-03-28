import React from "react";
import "./DataSource.css";
import { Text, Checkbox ,Button} from "@fluentui/react-components";
import DateRange from "./DateRange.tsx";
import { CloudAdd24Filled,Next16Filled, Save24Regular } from '@fluentui/react-icons';
import { CommonDialog } from '../Dialog/CommonDialog.tsx';
import DocumentSelector from "../DocumentSelector/DocumentSelector.tsx"
const DataSource = () => {
  return (
<DocumentSelector></DocumentSelector>

    // <div className="DataSourceDiv">
    //   <div className="SourceDiv">
    //     <Text size={500} weight="semibold">
    //       Data Source
    //     </Text>
    //   </div>
    //   <div className="SourceCheckBoxDiv">
    //     <Checkbox label="Refinitiv" />
    //   </div>
    //   <div className="TimeFrameDiv">
    //     <Text size={500} weight="semibold">
    //       Time Frame
    //     </Text>
    //   </div>
    //   <div className="TimeFrameSelectorDiv">
    //     <DateRange></DateRange>
    //   </div>
    //   <div className="DocumentsHeaderDiv">
    //     <Text size={500} weight="semibold">
    //       Documents
    //     </Text>
    //   </div>
    //   <div className="DocumentsSelectorDiv">
    //   <Button icon={<CloudAdd24Filled primaryFill="green" /> } iconPosition="after">Select from storage</Button>
    //   </div>
    //   <div className="ContinueButtonDiv">
    //   <Button appearance="primary" size="medium" icon={<Next16Filled /> } iconPosition="after">Continue</Button>
    //   </div>
    // </div>



  );
};

export default DataSource;
