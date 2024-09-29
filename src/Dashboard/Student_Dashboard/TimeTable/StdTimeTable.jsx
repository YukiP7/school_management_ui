import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import TimetableGrid from '../../Admin_Dashboard/TimeTable/TimetableGrid';
import { NavLink } from 'react-router-dom';

const StdTimetable = () => {
  const user = JSON.parse(sessionStorage.getItem('user')); // Parse the user data
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        // Fetch timetable data from API
        const response = await axios.get(`http://localhost:8080/timeTable/getTimeTable`);
        
        // Log the user data to check if it's being fetched correctly
        console.log(user);

        // Filter the response data based on user className and section
        const filteredData = response.data.data.filter(item => 
          item.className === user.className.name && item.section === user.className.section
        );

        // Set the filtered timetable data
        setTimetableData(filteredData); 
        console.log(filteredData);
      } catch (error) {
        setError(error.message || 'Something went wrong'); 
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [user]); // Dependency array includes user to refetch if user changes

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className='flex flex-col justify-start pl-0'>
        <h1 className='text-lg md:text-2xl  font-semibold text-black mt-5'>Time Table</h1>
        <p className='mt-2'>Dashboard /<NavLink to='/studentDashboard'> Student </NavLink>/ <span className='text-[#ffae01] font-semibold'>Time Table</span> </p>

        <div>
            <h2 className="text-lg mb-4 text-black font-semibold mt-5">
              Time Table for {user.className?.name} - {user.className?.section}
            </h2>
            <TimetableGrid selectedClass={user.className?.name} selectedSection={user.className?.section} />
        </div> 
    </div>
  );
};

export default StdTimetable;
