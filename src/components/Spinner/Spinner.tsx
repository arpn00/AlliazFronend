import { Spinner } from "@fluentui/react-components";
import React from "react";
import "./SpinnerLogo.css"
const SpinnerLogo = () => {
  return (
    <div className="SpinnerDiv">
      <Spinner
        className=""
        size="huge"
        labelPosition="below"
        label="Creating your draft ..."
      />
    </div>
  );
};

export default SpinnerLogo;
