import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../../conf/conf';


function ClassFaculties({ className }) {
  const tileWidth = 400; // Width for each tile
  const visibleTiles = 3; // Number of tiles visible at a time

  const [scrollPosition, setScrollPosition] = useState(0);
  const [timeTableData, setTimeTableData] = useState([]);
  const [subjectData, setSubjectData] = useState({});
  const [userList, setUserList] = useState([]);

  // Fetch timetable data from the new API
  useEffect(() => {
    if (className) {
      axios
        .get(`${BASE_URL}/teacherInfo/getClassSubjectInfo/${className}`)
        .then((response) => {
          const activeData = response.data.data.filter((item) => item.isActive == 'true');
          setTimeTableData(activeData);
          console.log(activeData,'activehgm')
        })
        .catch((error) => console.error(error));
    }
  }, [className]);

  // Fetch subject data
  useEffect(() => {
    axios
      .get(`${BASE_URL}/subject/getSubjectList`)
      .then((response) => {
        const subjects = response.data.data.reduce((acc, subject) => {
          acc[subject.id] = subject.subject;
          return acc;
        }, {});
        setSubjectData(subjects);
      })
      .catch((error) => console.error(error));
  }, []);

  // Fetch User List from API
  const fetchUserList = async () => {
    axios
      .get(`${BASE_URL}/user/getUserList`)
      .then((response) => {
        setUserList(response.data.data); // Store the user list data
      })
      .catch((error) => console.error(error));
  };

  // Function to get Faculty Details by teacherId
  const getFacultyDetails = (teacherId) => {
    const user = userList.find((user) => user.id == teacherId);
    if (user) {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    }
    return { firstName: '', lastName: '', email: '' }; // Return empty values if user is not found
  };

  // Map through timetable data and update with faculty details
  const getUpdatedTimeTableData = () => {
    return timeTableData.map((entry) => {
      const facultyDetails = getFacultyDetails(entry.teacherId);
      return {
        ...entry,
        facultyName: `${facultyDetails.firstName} ${facultyDetails.lastName}`,
        email: facultyDetails.email,
      };
    });
  };

  useEffect(() => {
    // Fetch user list data when the component mounts
    fetchUserList();
  }, []);

  // Function to get subject name by ID
  const getSubjectName = (id) => {
    return subjectData[id] || 'Unknown Subject';
  };

  // Scroll logic to move by one tile at a time
  const scrollRight = () => {
    if (scrollPosition < timeTableData.length - visibleTiles) {
      setScrollPosition(scrollPosition + 1);
    }
  };

  const scrollLeft = () => {
    if (scrollPosition > 0) {
      setScrollPosition(scrollPosition - 1);
    }
  };

  // Get the updated timetable data with faculty details
  const updatedTimeTableData = getUpdatedTimeTableData();

  return (
    <div className="p-2 space-y-4 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="space-y-4 flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Class Faculties</h1>
        <div className="flex space-x-2">
          <button onClick={scrollLeft} className="bg-gray-200 p-2 rounded-full">
            &#8592; {/* Left arrow */}
          </button>
          <button onClick={scrollRight} className="bg-gray-200 p-2 rounded-full">
            &#8594; {/* Right arrow */}
          </button>
        </div>
      </div>

      {/* Faculty List with scrolling */}
      <div className="overflow-x-hidden" style={{ width: `${tileWidth * visibleTiles}px` }}>
        <div
          className="flex transition-transform ease-in-out"
          style={{
            transform: `translateX(-${scrollPosition * tileWidth}px)`, // Scroll based on the fixed tile width
            width: `${tileWidth * updatedTimeTableData.length}px`, // Total width of the tiles (scrollable area)
          }}
        >
          {updatedTimeTableData.map((entry) => (
            <div key={entry.id} className="flex-shrink-0" style={{ width: `${tileWidth}px`, padding: '10px' }}>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="font-semibold">{entry.facultyName}</p>
                <p className="text-sm text-gray-500">Subject: {getSubjectName(entry.subjectId)}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="text-blue-500">{entry.email}</span>
                  <button className="bg-blue-500 text-white p-1 rounded-full">
                    <i className="fas fa-comments"></i> Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClassFaculties;
