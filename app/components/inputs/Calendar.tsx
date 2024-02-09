'use client';

import { useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";


interface CalendarProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[];
    rangeHour: JSX.Element[];
    // disabledHours: Date[];
}


const Calendar: React.FC<CalendarProps> = ({
    value,
    onChange,
    disabledDates,
    rangeHour,
    // disabledHours,
}) => {

  const day = value.startDate?.getDay(); 
  const month = value.startDate?.getMonth();
  const year = value.startDate?.getFullYear();


 
  
  const fullStartDate = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
  })
  
  return (
    <>
    <div 
      className="
        flex
        flex-col
        md:flex-row
        max-h-[48rem]
        md:max-h-[32rem]
        md:overflow-x-hidden
        
      "
    >
      <div className="w-3/3 md:w-2/3 border p-4">
        <DateRange 
            rangeColors={["#282825"]}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
        />
      </div>
      <div className="w-3/3 md:w-1/3 md:px-4 max-h-[24rem] overflow-y-auto">
        <div 
          className="
            sticky 
            top-0 
            text-center
            text-white
            bg-green
            font-semibold
            py-4
          "
        >
          {fullStartDate.format(value.startDate)}
          {/* {value.startDate?.getDate()} */}
          
        </div>
        <div 
            className="overflow-y-auto"
          >
          {rangeHour}
          
        </div>
      </div>
  </div>
    </>
  )
}

export default Calendar