import React from "react";
import { FC } from 'react';
import { DateRangeType } from "@fluentui/react-calendar-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Field, Label, makeStyles, Select } from "@fluentui/react-components";

interface DateRangeProps {
placeholder : string ;
}

const DateRange: FC<DateRangeProps> = (props) => {
  const { placeholder } = props;

    return (      
      <DatePicker
      style={{width:'150px'}}
        calendar={{
          dateRangeType:
          DateRangeType.Day ,
        }}
        placeholder={placeholder}
      />
      )
  }
export default DateRange;
