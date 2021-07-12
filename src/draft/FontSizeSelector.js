import React from "react";

const fontSizes = {
  nm: {
    id: 1,
    text: "Normal",
    value: 30,
  },
  sm: {
    id: 2,
    text: "Small",
    value: 20,
  },
  md: {
    id: 3,
    text: "Medium",
    value: 50,
  },
  lg: {
    id: 4,
    text: "Large",
    value: 70,
  },
  xl: {
    id: 5,
    text: "X-Large",
    value: 100,
  },
};

const FontSizeSelector = (props) => {
  const { currentState, expanded, onChange, onExpandEvent } = props;

  const changeHandler = (value) => {
    onChange("fontSize", value);
  };

  const stopPropagation = (event) => {
    console.log("hi");
    event.stopPropagation();
  };

  const renderDropdown = () => {
    return (
      <ul className="rdw-dropdown-optionwrapper fontSizeOptionsContainer">
        {Object.values(fontSizes).map((fs) => (
          <li
            key={fs.id}
            className="rdw-dropdownoption-default rdw-fontsize-option"
            onClick={() => changeHandler(fs.value)}
          >
            {fs.text}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="rdw-fontsize-wrapper" aria-label="rdw-font-size-control">
      <div
        className="rdw-dropdown-wrapper rdw-fontsize-dropdown cdk-icon cdkicon-format_size"
        aria-expanded={expanded}
        aria-label="rdw-dropdown"
        onClick={(e) => {
          e.preventDefault();
          onExpandEvent();
        }}
      >
        <a className="rdw-dropdown-selectedtext" title="Font Size">
          <img src="" alt="" />
        </a>
      </div>
      {expanded ? renderDropdown() : null}
    </div>
  );
};

export default FontSizeSelector;
