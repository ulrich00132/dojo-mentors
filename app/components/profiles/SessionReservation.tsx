'use client';

import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";

import { RiTimerLine } from "react-icons/ri";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import SelectInput from "../inputs/SelectInput";
import { useState } from "react";

interface SessionReservationProps {
    price?: number;
    dateRange: Range;
    totalPrice?: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
    sessionDuration: any[];
    onChangeDuration: (durationId: number) => void;
    rangeHour: JSX.Element[];
    // disabledHours: Date[];
    
}

const SessionReservation: React.FC<SessionReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates,
    sessionDuration,
    onChangeDuration,
    rangeHour,
    // disabledHours,
}) => {
    
    
  
    return (
    <div className="
           bg-white
           border-[1px]
           border-neutral-200
           overflow-hidden
        "
    >
        <div className="flex flex-row items-center gap-1 p-4">
            <div className="text-2xl font-semibold">
                {price} €
            </div>
            <div className="font-light text-neutral-600">
                /30 min
            </div>
        </div>
        <hr />
        <div className="flex flex-wrap p-4 justify-between items-center ">
            <div className="flex flex-row gap-2 text-neutral-500 text-lg items-center">
                <RiTimerLine size={20} />
                Durée
            </div>
            <div>
                <SelectInput 
                    id="durationSelect"
                    options={sessionDuration}
                    onChange={onChangeDuration}
                />
            </div>

        </div>
        <hr />
        <Calendar 
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value.selection)}
            // disabledHours={disabledHours}
            rangeHour={rangeHour}
        />
        <hr />
        
        <div className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
            "
        >
            <div>
                Total
            </div>
            <div>
                {totalPrice} €
            </div>
        </div>
    </div>
  )
}

export default SessionReservation