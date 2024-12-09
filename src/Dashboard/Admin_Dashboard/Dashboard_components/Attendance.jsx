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
  const [staffAttendance , setStaffAttendance] = useState([]) ;
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Students");
  const navigate = useNavigate()
  const [statusMap , setStatusMap] = useState([]) 

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const [stdResponse, staffResponse, statusResponse] = await Promise.all([
          axios.get(`${BASE_URL}/attendance/getAttendanceList`),
          axios.get(`${BASE_URL}/attendance/getStaffAttendance`),
          axios.get(`${BASE_URL}/attendance/getStaffAttendanceStatus`),
        ]);

        setAttendanceData(stdResponse.data.data);
        setStaffAttendance(staffResponse.data.data);

        // Generate statusMap
        const statusMapGenerated = {};
        statusResponse.data.data.forEach((status) => {
          statusMapGenerated[status.id] = status.attendanceStatus;
        });

        setStatusMap(statusMapGenerated);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  // Filter attendance data based on the selected tab
  const filterDataByCategory = () => {
    if (selectedTab === "Students") {
      return attendanceData ;
    } else if (selectedTab === "Staff") {
      return staffAttendance ;
    }
    return [];
  };

  // Process attendance data to calculate status counts
  const processAttendanceData = (filteredData) => {
    const statusCounts = {
      present: 0,
      absent: 0,
      'half day' : 0 ,
      medical: 0,
      other: 0, 
    };

   
    filteredData.forEach((entry) => {
      if (selectedTab === "Students" && Array.isArray(entry.attendenceStatusList)) {
        // Traverse all attendanceStatusList entries
        entry.attendenceStatusList.forEach((statusItem) => {
          const statusId = statusItem.attendanceStatusId;
          const status = statusMap[statusId]?.toLowerCase() || "other";
  
          if (statusCounts[status] !== undefined) {
            statusCounts[status]++;
          } else {
            statusCounts.other++;
          }
        });
      } else if (selectedTab === "Staff") {
        const statusString = entry.attendanceStatus;
        const status = statusMap[statusString]?.toLowerCase() || "other";
  
        if (statusCounts[status] !== undefined) {
          statusCounts[status]++;
        } else {
          statusCounts.other++;
        }
      }
    });
  
    return statusCounts;
  };

  // Generate data for the pie chart
  const generateChartData = () => {
    const filteredData = filterDataByCategory();
    const statusCounts = processAttendanceData(filteredData);

    return {
      labels: ["Present", "Absent","Half Day" , "Medical", "Other"],
      datasets: [
        {
          label: "Attendance Status",
          data: [
            statusCounts.present,
            statusCounts.absent,
            statusCounts["half day"],
            statusCounts.medical,
            statusCounts.other,
          ],
          backgroundColor: ["#87f542", "#FF6384", "#FFCE56", "#36A2EB" , "#A9A9A9"],
          hoverBackgroundColor: ["#87f542", "#FF6384", "#FFCE56", "#36A2EB" , "#A9A9A9"],
        },
      ],
    };
  };

  return (
    <div className="mt-5 rounded-md p-5 bg-white">
      <h1 className="text-lg text-blue-950 font-bold mb-4">Attendance</h1>

      {/* Tabs for Students, Staff */}
      <div className="flex space-x-4 border-b mb-10 mt-6">
        {["Students",  "Staff"].map((tab) => (
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

     <div className="flex justify-end mt-10">
     <Button label="View More" onClick={() => navigate('/admin/select')}/>
     </div>
    </div>
  );
}

export default Attendance;
