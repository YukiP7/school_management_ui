import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../conf/conf';

function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  // Fetch notices from API
  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notice/getNoticeList`);
      const currentDate = new Date(); // Get the current date
  
      const filteredNotices = response.data.data
        .filter((notice) => notice.role === 0 || notice.role === 3) // Filter by role
        .sort((a, b) => {
          // Sort by closeness to the current date
          const dateA = new Date(a.noticeDate);
          const dateB = new Date(b.noticeDate);
          return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate);
        })
        .slice(0, 3); // Limit to the top 3 notices
  
      setNotices(filteredNotices);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };
  
  

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="p-6 font-sans bg-white shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notice Board</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => navigate('/studentDashboard/stdnotice')}
        >
          View All
        </button>
      </div>

      {/* Notice List */}
      <div className="space-y-4">
        {notices.length === 0 ? (
          <p className="text-gray-500">No notices available.</p>
        ) : (
          notices.map((notice) => (
            <div
              key={notice.id}
              className="flex justify-between items-center border-b h-20 pb-2 border rounded-lg shadow-md last:border-none"
            >
              <div className="flex items-center ml-4 mr-4">
                {/* Calendar Icon */}
                <div className="w-8 h-8 bg-blue-500 text-white flex justify-center items-center rounded-full mr-4 text-lg">
                  📅
                </div>
                {/* Notice Title and Date */}
                <div>
                  <h3 className="text-lg font-semibold">{notice.noticeTitle}</h3>
                  <p className="text-sm text-gray-500">
                    Notice for: {new Date(notice.noticeDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {/* Right Arrow for Navigation */}
              <div
                className="text-blue-500 text-2xl cursor-pointer hover:text-blue-600 transition"
                onClick={() => console.log(`Navigating to details of: ${notice.noticeTitle}`)}
              >
                ➡️
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NoticeBoard;
