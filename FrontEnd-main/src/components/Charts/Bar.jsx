import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Register necessary chart elements
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function DataChart({ data }) {
    const [daysToShow, setDaysToShow] = useState(6); // Default to showing 6 days
    const [selectedAge, setSelectedAge] = useState(''); // State for selected age
    const [selectedGender, setSelectedGender] = useState(''); // State for selected gender
    const [startDate, setStartDate] = useState(null); // State for start date
    const [endDate, setEndDate] = useState(null); // State for end date

    // Get unique ages and genders for the dropdowns
    const uniqueAges = [...new Set(data.map(item => item.Age))];
    const uniqueGenders = [...new Set(data.map(item => item.Gender))];

    // Use filters in your data filtering logic
    const filteredData = data.filter(item => {
        const itemDate = new Date(item.Day);
        const matchesAge = selectedAge ? item.Age === selectedAge : true;
        const matchesGender = selectedGender ? item.Gender === selectedGender : true;
        const matchesDateRange = 
            (!startDate || itemDate >= startDate) && 
            (!endDate || itemDate <= endDate);
        return matchesAge && matchesGender && matchesDateRange;
    });

    // Extract the labels for the X-axis (days)
    const labels = filteredData.slice(0, daysToShow).map(item => item.Day);

    // Create datasets for each category (A, B, C, D, E, F)
    const chartData = {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'], // Y-axis labels
        datasets: labels.map((day, index) => ({
            label: `Day: ${day}`,
            data: [
                filteredData[index]?.A || 0, // Use 0 if data is undefined
                filteredData[index]?.B || 0,
                filteredData[index]?.C || 0,
                filteredData[index]?.D || 0,
                filteredData[index]?.E || 0,
                filteredData[index]?.F || 0
            ],
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
            borderColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 1
        }))
    };

    // Options for the horizontal bar chart
    const options = {
        indexAxis: 'y', // This makes the chart horizontal
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day' // X-axis label: Days
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Categories (A, B, C, D, E, F)' // Y-axis label: Categories
                }
            }
        }
    };

    // Function to show more days when the button is clicked
    const showMoreDays = () => {
        setDaysToShow((prevDays) => Math.min(prevDays + 6, filteredData.length)); // Increase by 6 but not exceed total filtered data
    };

    return (
        <div>
            {/*
            <div className="mb-4">
                <label htmlFor="ageFilter" className="mr-2">Filter by Age:</label>
                <select id="ageFilter" value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)} className="border p-2">
                    <option value="">All Ages</option>
                    {uniqueAges.map((age) => (
                        <option key={age} value={age}>{age}</option>
                    ))}
                </select>

                <label htmlFor="genderFilter" className="ml-4 mr-2">Filter by Gender:</label>
                <select id="genderFilter" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} className="border p-2">
                    <option value="">All Genders</option>
                    {uniqueGenders.map((gender) => (
                        <option key={gender} value={gender}>{gender}</option>
                    ))}
                </select>
                <div className="ml-4 inline-block">
                    <label className="mr-2">From:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="border p-2"
                    />
                </div>
                <div className="ml-4 inline-block">
                    <label className="mr-2">To:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="border p-2"
                    />
                </div>
            </div>*/}

            <Bar data={chartData} options={options} />
            {daysToShow < filteredData.length && (
                <button onClick={showMoreDays} className="mt-4 p-2 bg-blue-500 text-white">
                    Show More Days
                </button>
            )}
        </div>
    );
}

export default DataChart;
