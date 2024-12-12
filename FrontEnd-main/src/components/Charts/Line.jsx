import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Register necessary chart elements for Line chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineChart({ data }) {
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

    // Extract the labels for the X-axis (days) from filtered data
    const labels = filteredData.slice(0, daysToShow).map(item => item.Day);

    // Create datasets for each category (A, B, C, D, E, F) for the line chart
    const chartData = {
        labels: labels, // X-axis labels: Days
        datasets: [
            {
                label: 'A',
                data: filteredData.slice(0, daysToShow).map(item => item.A),
                borderColor: 'rgba(255, 99, 132, 0.5)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4 // Adds smooth curves to the line
            },
            {
                label: 'B',
                data: filteredData.slice(0, daysToShow).map(item => item.B),
                borderColor: 'rgba(54, 162, 235, 0.5)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'C',
                data: filteredData.slice(0, daysToShow).map(item => item.C),
                borderColor: 'rgba(75, 192, 192, 0.5)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'D',
                data: filteredData.slice(0, daysToShow).map(item => item.D),
                borderColor: 'rgba(153, 102, 255, 0.5)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'E',
                data: filteredData.slice(0, daysToShow).map(item => item.E),
                borderColor: 'rgba(255, 206, 86, 0.5)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'F',
                data: filteredData.slice(0, daysToShow).map(item => item.F),
                borderColor: 'rgba(255, 159, 64, 0.5)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                fill: true,
                tension: 0.4
            }
        ]
    };

    // Options for the line chart
    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days' // X-axis label: Days
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Values (A, B, C, D, E, F)' // Y-axis label: Values
                }
            }
        }
    };

    // Function to show more days when the button is clicked
    const showMoreDays = () => {
        setDaysToShow((prevDays) => Math.min(prevDays + 6, filteredData.length)); // Increase by 6 but not exceed total data
    };

    return (
        <div>
            {/* Filters =
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

            {/* Render line chart only if filtered data exists */}
            {filteredData.length > 0 ? (
                <>
                    <Line data={chartData} options={options} />
                    {daysToShow < filteredData.length && (
                        <button onClick={showMoreDays} className="mt-4 p-2 bg-blue-500 text-white">
                            Show More Days
                        </button>
                    )}
                </>
            ) : (
                <div>No data available for the selected filters.</div>
            )}
        </div>
    );
}

export default LineChart;
