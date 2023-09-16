import React, { useState, useEffect, useRef, useCallback } from "react";

import "./styles.scss";

export default function Dropdown({ dataPoints = [], onItemSelect, className }) {
  const optionsSheetRef = useRef(null);

  const [selectedValue, setSelectedValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOutsideClick = (event) => {
    if (
      optionsSheetRef.current &&
      !optionsSheetRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [optionsSheetRef]);

  const getValueFromData = useCallback(
    ({ index }) => {
      let value = dataPoints?.[index];
      return value;
    },
    [dataPoints]
  );

  const getIsValueSelected = ({ index }) => {
    let isSelected = false;
    const value = getValueFromData({ index });
    if (selectedValue === value) {
      isSelected = true;
    }
    return isSelected;
  };

  const handleSelectValue = ({ index }) => {
    let newValue = getValueFromData({ index });

    setSelectedValue(newValue);
    onItemSelect && onItemSelect({ selectedValue: newValue });
  };

  useEffect(() => {
    setSelectedValue(getValueFromData({ index: 0 }));
  }, [getValueFromData]);

  const RenderSingleOption = ({ index }) => {
    const isValueSelected = getIsValueSelected({ index });
    return (
      <div
        onClick={() => handleSelectValue({ index })}
        className={`dropdown__singleOption`}
        data-testid={"dropdown__singleOption"}
      >
        <div key={`item-${index}`} className={"dropdown__dropdownOption"}>
          {getValueFromData({ index })}
        </div>
        {isValueSelected ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={"currentColor"}
            viewBox="0 0 16 16"
          >
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
          </svg>
        ) : null}
      </div>
    );
  };

  return (
    <div
      className={`dropdown ${className && className}`}
      data-testid="dropdown-wrapper"
      onClick={() => {
        setIsDropdownOpen(!isDropdownOpen);
      }}
      ref={optionsSheetRef}
    >
      <div className={"dropdown__selectedLabelContainer"}>
        <div className={"dropdown__selectedLabel"}>{selectedValue}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill={"currentColor"}
          className={isDropdownOpen ? "bi bi-chevron-up" : "bi bi-chevron-down"}
          viewBox="0 0 16 16"
        >
          {isDropdownOpen ? (
            <path
              fillRule="evenodd"
              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          )}
        </svg>
      </div>
      {isDropdownOpen ? (
        <div className={"dropdown__dropdownSheet"}>
          {dataPoints.map((_, index) => {
            return (
              <RenderSingleOption key={`dd-option-${index}`} index={index} />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
