import React, { useState } from 'react';

interface CustomSelectProps {
  options: string[];
  onChange?: (value: string) => void;
  selectedValue?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange, selectedValue }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string | undefined>(selectedValue);

  const handleSelect = (value: string) => {
    setCurrentValue(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className="custom-select">
      <div className="select-box" onClick={() => setIsOpen(!isOpen)}>
        <span className="selected-value">{currentValue || 'Select an option'}</span>
        <span className="arrow">&#9660;</span>
      </div>
      {isOpen && (
        <div className="options-list">
          {options.map((option, index) => (
            <div
              key={index}
              className={`option-item ${option === currentValue ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
              {option === currentValue && <span className="checkmark">&#10003;</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
