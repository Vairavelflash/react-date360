import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./datePicker.css";
import ChangeYear from "./ChangeYear";
import { LeftIcon, RightIcon } from "./Icon";

// const oneDay = 60 * 60 * 24 * 1000;
// const todayTimestamp =
//   Date.now() -
//   (Date.now() % oneDay) +
//   new Date().getTimezoneOffset() * 1000 * 60;

interface dateObject {
  date: number;
  day: number;
  month: number;
  timestamp: number;
  dayString: string;
}
type MyDatePickerProps = {
  className?: string;
  value?: string;
  onChange: any;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  weekLabel?: string[];
  dateSplit?: string;
  titleAlign?: "left" | "right" | "center";
};
const daysMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthMap = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DatePicker = ({
  className = "",
  value = "",
  onChange,
  leftIcon = <LeftIcon />,
  rightIcon = <RightIcon />,
  weekLabel = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  dateSplit = "/",
  titleAlign = "left",
}: MyDatePickerProps) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [monthDetails, setMonthDetails] = useState<dateObject[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectDate, setSelectDate] = useState<any>(null);
  const [showYear, setShowYear] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const getNumberOfDays = useCallback((year: number, month: number) => {
    return 40 - new Date(year, month, 40).getDate();
  }, []);

  const getDayDetails = useCallback(
    (args: any) => {
      let date = args.index - args.firstDay;
      let day = args.index % 7;
      let prevMonth = args.month - 1;
      let prevYear = args.year;
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
      }
      let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
      let _date =
        (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) +
        1;
      let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
      let timestamp = new Date(args.year, args.month, _date).getTime();
      return {
        date: _date,
        day,
        month,
        timestamp,
        dayString: daysMap[day],
      };
    },
    [getNumberOfDays]
  );

  const getMonthDetails = useCallback(
    (year: number, month: number) => {
      let firstDay = new Date(year, month).getDay();
      let numberOfDays = getNumberOfDays(year, month);
      let monthArray = [];
      let rows = 6;
      let index = 0;
      let cols = 7;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let currentDay = getDayDetails({
            index,
            numberOfDays,
            firstDay,
            year,
            month,
          });
          monthArray.push(currentDay);
          index++;
        }
      }
      return monthArray;
    },
    [getNumberOfDays, getDayDetails]
  );

  const getDateStringFromTimestamp = (timestamp: number) => {
    let dateObject = new Date(timestamp);
    let month = dateObject.getMonth() + 1;
    let date = dateObject.getDate();
    let split = dateSplit;
    return (
      (date < 10 ? "0" + date : date) +
      split +
      (month < 10 ? "0" + month : month) +
      split +
      dateObject.getFullYear()
    );
  };

  const setDateToInput = (selectDate: any) => {
    let dateString = selectDate ? getDateStringFromTimestamp(selectDate) : "";
    console.log("004", dateString, selectDate);

    if (inputRef.current) {
      inputRef.current.value = `${dateString}`;
    }
    // setShowDatePicker(false)
  };

  const addBackDrop = useCallback(
    (e: MouseEvent) => {
      if (
        showDatePicker &&
        datePickerRef.current &&
        !datePickerRef.current.contains(e.target as Node)
      ) {
        setShowDatePicker(false);
      }
    },
    [showDatePicker]
  );

  useEffect(() => {
    setMonthDetails(getMonthDetails(year, month));
  }, [year, month, getMonthDetails]);

  useEffect(() => {
    window.addEventListener("click", addBackDrop);
    if (selectDate) setDateToInput(selectDate?.timestamp);

    return () => {
      window.removeEventListener("click", addBackDrop);
    };
  }, [selectDate, addBackDrop]);

  useEffect(() => {
    const date = new Date(value);
    setDateToInput(date.getTime());
  }, [value]);

  const updateDateFromInput = () => {
    let dateValue = inputRef.current?.value;
    if (!dateValue) return;

    let dateData = getDateFromDateString(dateValue);
    if (dateData !== null) {
      // setDate(dateData);
      setYear(dateData.year);
      setMonth(dateData.month - 1);
      setMonthDetails(getMonthDetails(dateData.year, dateData.month - 1));
    }
  };

  const getDateFromDateString = (dateValue: string) => {
    let dateData = dateValue.split("-").map((d) => parseInt(d, 10));
    if (dateData.length < 3) return null;

    let year = dateData[0];
    let month = dateData[1];
    let date = dateData[2];
    return { year, month, date };
  };

  // Clicked Date
  const onDateClick = (day: dateObject) => {
    setSelectDate(day);
    setDateToInput(day.timestamp);
    if (onChange) {
      onChange(day.timestamp);
    }
  };

  const renderCalendar = () => {
    return (
      <div className="c-container px-1.5">
        <div className="cc-head">
          {weekLabel.map((d, i) => (
            <div key={i} className="cch-name f-weekLabel">
              {d}
            </div>
          ))}
        </div>

        <div className="cc-body border-t">
          {monthDetails.map((day, index) => {
            return (
              <div
                className={`c-day-container  ${
                  day.month === 0 && isSelectedDay(day)
                    ? "f-selectColor"
                    : "f-hoverColor"
                } `}
                key={index}
              >
                <div className="cdc-day flex items-center">
                  {day.month !== 0 ? (
                    <p className="hideDate">{day.date}</p>
                  ) : (
                    <p className="showDate" onClick={() => onDateClick(day)}>
                      {day.date}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  // const isCurrentDay = (day) => {
  //   return day.timestamp === todayTimestamp;
  // };

  const isSelectedDay = (day: dateObject) => {
    return day.timestamp === selectDate?.timestamp;
  };

  const getMonthStr = (month: number) => {
    return monthMap[Math.max(Math.min(11, month), 0)] || "Month";
  };

  const adjustMonth = (offset: number) => {
    let newMonth = month + offset;
    let newYear = year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setYear(newYear);
    setMonth(newMonth);
  };

  // Onhover addition/subtraction year
  const changeYear = (currentYear: any, type: string) => {
    if (type === "add") {
      setYear(currentYear + 1);
    } else {
      setYear(currentYear - 1);
    }
  };
  return (
    <div className={`DateRangePicker  ${className}`} ref={datePickerRef}>
      <div
        className="mdp-input f-input"
        onClick={() => setShowDatePicker(true)}
      >
        <input
          type="text"
          onChange={updateDateFromInput}
          ref={inputRef}
          placeholder="dd-mm-yyy"
          readOnly
        />
      </div>
      {showDatePicker ? (
        <div className="mdp-single-container z-10 f-calenderBody">
          <div className="mdpc-head px-2 border-b ">
            {titleAlign == "left" && (
              <div className="mdpch-container Text-12 text-Gray-1100 gap-1">
                <p>{getMonthStr(month)}</p>

                <div
                  className="flex items-center gap-0.5"
                  onMouseEnter={() => setShowYear(true)}
                  onMouseLeave={() => setShowYear(false)}
                >
                  <p>{year}</p>
                  {showYear && (
                    <ChangeYear changeYear={changeYear} year={year} />
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center h-7 gap-1">
              <IconDiv
                className=" h-7 w-7 hover:bg-Gray-400"
                onClick={() => adjustMonth(-1)}
              >
                {leftIcon}
              </IconDiv>
              {titleAlign == "center" && (
                <div className="mdpch-container justify-center Text-12 text-Gray-1100 gap-1">
                  <p>{getMonthStr(month)}</p>
                  <div
                    className="flex items-center gap-0.5"
                    onMouseEnter={() => setShowYear(true)}
                    onMouseLeave={() => setShowYear(false)}
                  >
                    <p>{year}</p>
                    {showYear && (
                      <ChangeYear changeYear={changeYear} year={year} />
                    )}
                  </div>
                </div>
              )}
              <IconDiv
                className=" h-7 w-7 hover:bg-Gray-400"
                onClick={() => adjustMonth(1)}
              >
                {rightIcon}
              </IconDiv>
            </div>
            {titleAlign == "right" && (
              <div className="mdpch-container Text-12 text-Gray-1100 gap-1">
                <p>{getMonthStr(month)}</p>

                <div
                  className="flex items-center gap-0.5"
                  onMouseEnter={() => setShowYear(true)}
                  onMouseLeave={() => setShowYear(false)}
                >
                  <p>{year}</p>
                  {showYear && (
                    <ChangeYear changeYear={changeYear} year={year} />
                  )}
                </div>
              </div>
            )}
          </div>
          <Fragment>{renderCalendar()}</Fragment>
        </div>
      ) : null}
    </div>
  );
};


const IconDiv = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "" }, ref) => (
  <div
    ref={ref}
    className={`min-w-4 min-h-4 flex items-center justify-center ${className}`}
  />
));
