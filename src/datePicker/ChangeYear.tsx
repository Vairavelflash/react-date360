import React from "react";

type ChangeYear = {
  changeYear: (currentYear: number, type: string) => void;
  year: number;
};
const ChangeYear = ({ changeYear, year }: ChangeYear) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 ">
      <div
        className=" h-[5px] rotate-180"
        onClick={() => changeYear(year, "add")}
      >
        <svg
          width="6"
          height="4"
          viewBox="0 0 6 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.00012 3.40526L0.0283203 0.466797H5.97192L3.00012 3.40526Z"
            fill="#1C1B1F"
          />
        </svg>
      </div>
      <div className=" h-[5px]" onClick={() => changeYear(year, "sub")}>
        <svg
          width="6"
          height="4"
          viewBox="0 0 6 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.00012 3.40526L0.0283203 0.466797H5.97192L3.00012 3.40526Z"
            fill="#1C1B1F"
          />
        </svg>
      </div>
    </div>
  );
};

export default ChangeYear;
