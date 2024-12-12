// FilterComponent.js
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FilterComponent = ({
    selectedAge,
    setSelectedAge,
    selectedGender,
    setSelectedGender,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    uniqueAges,
    uniqueGenders
}) => {
    return (
        <div className="mb-4">
            {/* Dropdown for Age Filter */}
            <label htmlFor="ageFilter" className="mr-2">Filter by Age:</label>
            <select id="ageFilter" value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)} className="border p-2">
                <option value="">All Ages</option>
                {uniqueAges.map((age) => (
                    <option key={age} value={age}>{age}</option>
                ))}
            </select>

            {/* Dropdown for Gender Filter */}
            <label htmlFor="genderFilter" className="ml-4 mr-2">Filter by Gender:</label>
            <select id="genderFilter" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} className="border p-2">
                <option value="">All Genders</option>
                {uniqueGenders.map((gender) => (
                    <option key={gender} value={gender}>{gender}</option>
                ))}
            </select>

            {/* Date Range Picker */}
            <div className="ml-4 inline-block">
                <label className="mr-2">From:</label>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="border p-2"
                    maxDate={endDate} // Prevent selecting a start date after the end date
                />
            </div>
            <div className="ml-4 inline-block">
                <label className="mr-2">To:</label>
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="border p-2"
                    minDate={startDate} // Prevent selecting an end date before the start date
                />
            </div>
        </div>
    );
};

export default FilterComponent;
