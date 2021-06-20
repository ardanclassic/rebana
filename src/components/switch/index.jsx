import React from 'react'
import './style.scss';

const Switch = ({ isOn, handleToggle, dataItem }) => {
  return (
    <>
      <input type="checkbox" className="react-switch-checkbox"
        checked={isOn}
        onChange={handleToggle}
        name={dataItem.id}
        id={dataItem.id}
      />
      
      <label htmlFor={dataItem.id} className="react-switch-label" style={{ background: isOn && dataItem.color }} >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;