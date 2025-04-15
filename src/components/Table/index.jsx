import React, { useState, useRef } from "react";

export default function Table({ rowData }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation val</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>
        {rowData.map((data) => (
          <RenderRow {...data} />
        ))}
      </tbody>
    </table>
  );
}

const RenderRow = ({ id, label, value: localValue, children }) => {
  const [variance, setVariance] = useState(0);
  const [value, setValue] = useState(parseInt(localValue));
  const [isOpen, setIsOpen] = useState(false);
  const isClickable = !!(children && children.length);
  const inputRef = useRef(null);

  const handleClick = () => setIsOpen((prev) => !prev);
  const handleAllocationPercent = (e) => {
    e.stopPropagation();
    setVariance(inputRef.current.value || 0);
  };
  const handleAllocationVal = (e) => {
    e.stopPropagation();
    const newValue = inputRef.current.value;
    setValue(parseInt(newValue));
    setVariance(Math.round(((newValue - value) / value) * 100));
  };

  return (
    <>
      <tr
        key={id}
        onClick={isClickable ? handleClick : null}
        className={isOpen ? "open" : null}
      >
        <td className="label">{label}</td>
        <td className="value">{value}</td>
        <td>
          <input
            ref={inputRef}
            onClick={(e) => e.stopPropagation()}
            type="number"
          />
        </td>
        <td>
          <button onClick={handleAllocationPercent}>allocate</button>
        </td>
        <td>
          <button onClick={handleAllocationVal}>allocate</button>
        </td>
        <td>{variance}%</td>
      </tr>
      {isClickable && isOpen && children.map((data) => <RenderRow {...data} />)}
    </>
  );
};
