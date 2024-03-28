import React from "react";
import { DateRangeType } from "@fluentui/react-calendar-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Field, Label, makeStyles, Select } from "@fluentui/react-components";

const DateRange = () => {

    return (      
      <DatePicker
        calendar={{
          dateRangeType:
          DateRangeType.Day ,
        }}
        placeholder="Select a date..."
      />
      )
  }
export default DateRange;
