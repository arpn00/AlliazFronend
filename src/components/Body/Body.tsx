import React from "react";
import "./Body.css";
import ProgressBar from "../../components/Progress/ProgressBar.tsx"
import DataSource from "../../components/DataSource/DataSource.tsx"

const Body = () => {
  return (
    <div className="Body">
      <div className="LeftBodyGrid"></div>
      <div className="RightBodyGrid"></div>
        <ProgressBar></ProgressBar>
        <DataSource></DataSource>
      <div className="FooterGrid"></div>
    </div>
  );
};

export default Body;
