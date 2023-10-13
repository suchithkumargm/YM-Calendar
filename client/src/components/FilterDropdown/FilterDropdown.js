import React, { useState } from 'react';
import dropdownIcon from '../../icons/dropdown.svg';
import './FilterDropdown.css';

const FilterDropdown = ({ handleOptionChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown bg-black text-yellow" onClick={toggleDropdown}>
      <span>
        Filter <img src={dropdownIcon} alt='dropdown icon'/>
      </span>
      {isDropdownOpen && (
        <div className='dropdown-content'>
            <span key='thisMonth' value='thisMonth' onClick={handleOptionChange}>This Month</span>
            <span key='thisYear' value='thisYear' onClick={handleOptionChange}>This Year</span>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
