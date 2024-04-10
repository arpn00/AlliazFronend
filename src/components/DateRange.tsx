import React, { useState } from "react";
import { FC } from "react";
import { DateRangeType } from "@fluentui/react-calendar-compat";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import {
  Field,
  InputOnChangeData,
  Label,
  makeStyles,
  Select,
} from "@fluentui/react-components";

interface DateRangeProps {}

const DateRange: FC<DateRangeProps> = (props) => {
  const [selectedStartDate, setSelectedStartDate] = useState<
    Date | null | undefined
  >(null);
  const [selectedEndDate, setSelectedEndDate] = useState<
    Date | null | undefined
  >(null);

  // }
  return (
    <>
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
    </>
  );
};
export default DateRange;
