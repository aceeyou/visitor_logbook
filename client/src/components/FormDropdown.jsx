import React from "react";

export default function FormDropdown({ optionList, label, setFormdata }) {
  return (
    <div className="input-grp">
      <label htmlFor={label}>{label}</label>
      <select
        name={label}
        id={label}
        onChange={(e) => {
          if (label === "Submit Document/s") {
            setFormdata((old) => ({
              ...old,
              submitDocs: `Submit ${e.target.value}`,
            }));
          } else {
            setFormdata((old) => ({
              ...old,
              requestIncentives: `Request on Incentives for ${e.target.value}`,
            }));
          }
        }}
      >
        {optionList.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
