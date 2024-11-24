import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import BASE_URL from "../../../conf/conf";
import Button from "../../../Reusable_components/Button";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Students");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/attendance/getAttendanceList`);
        setAttendanceData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  // Filter attendance data based on the selected tab
  const filterDataByCategory = () => {
    // if (selectedTab === "Students") {
    //   return attendanceData.filter((entry) => entry.category === "Student");
    // } else if (selectedTab === "Teachers") {
    //   return attendanceData.filter((entry) => entry.category === "Teacher");
    // } else if (selectedTab === "Staff") {
    //   return attendanceData.filter((entry) => entry.category === "Staff");
    // }
    // return [];

    return attendanceData ;
  };

  // Process attendance data to calculate status counts
  const processAttendanceData = (filteredData) => {
    const statusCounts = {
      present: 0,
      absent: 0,
      medical: 0,
      other: 0, 
    };

    filteredData.forEach((entry) => {
      const statusString = entry.attendenceStatus; 
      const status = statusString.match(/=(\w+)/)?.[1]; 

      if (statusCounts[status] !== undefined) {
        statusCounts[status]++;
      } else {
        statusCounts.other++;
      }
    });

    return statusCounts;
  };

  // Generate data for the pie chart
  const generateChartData = () => {
    const filteredData = filterDataByCategory();
    const statusCounts = processAttendanceData(filteredData);

    return {
      labels: ["Present", "Absent", "Medical", "Other"],
      datasets: [
        {
          label: "Attendance Status",
          data: [
            statusCounts.present,
            statusCounts.absent,
            statusCounts.medical,
            statusCounts.other,
          ],
          backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#A9A9A9"],
          hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#A9A9A9"],
        },
      ],
    };
  };

  return (
    <div className="mt-4 rounded-md p-5 bg-white">
      <h1 className="text-xl text-black font-semibold mb-4">Attendance</h1>

      {/* Tabs for Students, Teachers, Staff */}
      <div className="flex space-x-4 border-b mb-10">
        {["Students", "Teachers", "Staff"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-4 border-b-2 ${
              selectedTab === tab ? "border-blue-500 text-blue-500" : "border-transparent"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div className="mt-6 mb-6 flex justify-center border-2 ">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-6 mb-6">
            <Pie
              data={generateChartData()}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: `Overall Attendance Status - ${selectedTab}`,
                  },
                },
              }}
            />
          </div>
        )}
      </div>

      <Button label="View More" onClick={() => navigate('/admin/attendance')} className="justify-right"/>
    </div>
  );
}

export default Attendance;