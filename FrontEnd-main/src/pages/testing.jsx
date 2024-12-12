// Analytics.js
import React, { useState } from 'react';
import LineChart from "../components/Charts/Line";
import DataChart from "../components/Charts/Bar";
import FilterComponent from '../components/Charts/FilterComponent';

const data = [
    {"Day":"4/10/2024", "Age":"15-25", "Gender":"Female", "A":993, "B":762, "C":468, "D":671, "E":788, "F":150},
    {"Day":"5/10/2024", "Age":">25", "Gender":"Male", "A":953, "B":622, "C":638, "D":541, "E":78, "F":10},
    {"Day":"6/10/2024", "Age":"15-25", "Gender":"Female", "A":993, "B":262, "C":968, "D":691, "E":788, "F":50},
    {"Day":"7/10/2024", "Age":">25", "Gender":"Male", "A":95, "B":622, "C":138, "D":41, "E":948, "F":520},
    {"Day":"8/10/2024", "Age":">25", "Gender":"Female", "A":993, "B":762, "C":468, "D":671, "E":788, "F":150},
    {"Day":"9/10/2024", "Age":"15-25", "Gender":"Male", "A":753, "B":922, "C":238, "D":941, "E":248, "F":320},
    {"Day":"10/10/2024", "Age":">25", "Gender":"Female", "A":993, "B":762, "C":468, "D":671, "E":788, "F":150},
    {"Day":"11/10/2024", "Age":"15-25", "Gender":"Male", "A":253, "B":322, "C":538, "D":141, "E":148, "F":220},
];

function Analytics() {
    const [selectedAge, setSelectedAge] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Get unique ages and genders for the dropdowns
    const uniqueAges = [...new Set(data.map(item => item.Age))];
    const uniqueGenders = [...new Set(data.map(item => item.Gender))];

    return (
        <div className="flex flex-col w-full h-screen p-4 space-y-4">
            <FilterComponent
                selectedAge={selectedAge}
                setSelectedAge={setSelectedAge}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                uniqueAges={uniqueAges}
                uniqueGenders={uniqueGenders}
            />
            <div className="w-full h-auto">
                <DataChart data={data} filters={{ selectedAge, selectedGender, startDate, endDate }} /> {/* Bar Chart */}
            </div>
            <div className="w-full h-auto  m-10">
                <LineChart data={data} filters={{ selectedAge, selectedGender, startDate, endDate }} /> {/* Line Chart */}
            </div>
        </div>
    );
}

export default Analytics;
