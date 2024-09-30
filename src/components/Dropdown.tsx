import React, { useState } from 'react';
import Select, { ActionMeta, SingleValue, StylesConfig, components, DropdownIndicatorProps } from 'react-select';
// import './Dropdown.css';

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: 'relevancy', label: 'Relevancy' },
  { value: 'lowest_price', label: 'Lowest Price' },
  { value: 'highest_price', label: 'Highest Price' },
  { value: 'top_reviews', label: 'Top Customer Reviews' },
  { value: 'most_recent', label: 'Most Recent' },
];

const customStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    borderRadius: '20px',
    borderColor: state.isFocused ? '#333' : '#ccc',
    boxShadow: state.isFocused ? '0 0 0 1px #333' : 'none',
    padding: '5px 10px',
    fontSize: '14px',
    fontWeight: 500,
    minWidth: '150px',
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
      borderColor: '#333',
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#f6f6f6' : state.isFocused ? '#f2f2f2' : '#fff',
    color: '#333',
    padding: '10px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: state.isSelected ? 600 : 400,
  }),
  singleValue: (base) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
  }),
  menu: (base) => ({
    ...base,
    marginTop: '5px',
    borderRadius: '10px',
    zIndex: 9999,
    padding: '5px 0',
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
//   dropdownIndicator: (base, state) => ({
//     ...base,
//     transition: 'transform 0.2s',
//     transform: state.isFocused ? 'rotate(180deg)' : null,
//   }),
};

// Custom Option component to include a checkmark
const CustomOption = (props: any) => {
  const { data, isSelected } = props;
  return (
    <components.Option {...props}>
      <span>{data.label}</span>
      {isSelected && <span style={{ marginLeft: 'auto' }}>✔️</span>}
    </components.Option>
  );
};

const Dropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(options[4]);

  const handleChange = (
    option: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <label htmlFor="sort">Sort by:</label>
      <Select
        id="sort"
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select a category"
        isSearchable={false}
        styles={customStyles}
        components={{ Option: CustomOption }} // Use custom option
      />
    </div>
  );
};

export default Dropdown;
