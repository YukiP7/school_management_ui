import React , {useState} from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faAngleDown, faAngleRight, faSchool, faBookOpen, faUser, faPenRuler, faBookAtlas, faChildren,  faFileLines, faBus, faCalendarDay, faSliders, faHotel, faVolleyball, faFile, faClipboardUser } from '@fortawesome/free-solid-svg-icons';

function StdSidebar() {
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(prevDropdown => prevDropdown === dropdown ? null : dropdown);
  };

  const renderAngleIcon = (dropdown) => {
    return openDropdown === dropdown ? faAngleDown : faAngleRight;
  };

  return (
    <div>
      <nav className="p-5 h-full overflow-y-auto scrollbar-hide bg-[#051f3e] fixed text-white">
      <ul>
        {/* Dashboard Section */}
       <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
          <NavLink to="/studentDashboard" className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 hover:rounded-xl ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`}
              >
            <div className="flex gap-1 justify-center items-center">
              <FontAwesomeIcon icon={faHouse} className="mr-2 text-[#ffae01]"  />
              Dashboard
            </div>
          </NavLink>
      </li>
      {/* Profile Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/studentDashboard/profile"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faClipboardUser} className="mr-3 text-[#ffae01]" />
            Profile
          
        </NavLink>
      </li>
      {/* Attendance Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/studentDashboard/attendance"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faClipboardUser} className="mr-3 text-[#ffae01]" />
            Attendance
          
        </NavLink>
      </li>
      {/* Time Table Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/studentDashboard/timetable"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faCalendarDay} className="mr-4 text-[#ffae01]" />
                Time Table
              
            </NavLink>
      </li>
       {/* HomeWork Section */}
       <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/studentDashboard/homework"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faBookOpen} className="mr-3 text-[#ffae01]" />
            Home work
          
        </NavLink>
      </li>
      {/* Leaves Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/studentDashboard/leaves"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => toggleDropdown('leave')} 
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                Leave
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('leave')} className="mr-3" onClick={() => toggleDropdown('leave')} />
            </NavLink>
            {openDropdown=='leave' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/studentDashboard/leaves"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    List of Leaves
                  </NavLink>
                </li>
              </ul>
            )}
      </li>

       {/* Holidays Section */}
       <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/studentDashboard/holidays"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faBookOpen} className="mr-3 text-[#ffae01]" />
            Holidays
          
        </NavLink>

      </li>

      {/* Sports section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/studentDashboard/stdsports"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faChildren} className="mr-2 text-[#ffae01]" />
                Sports
            </NavLink>
      </li>

      {/* Notice Board Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/studentDashboard/stdnotice"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
            Notice
          
        </NavLink>
      </li>
      {/* Fees Section */}
      <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
        <NavLink
          to="/studentDashboard/StdFeeCollection"
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
            Fee Collection
          
        </NavLink>
      </li>
                   {/* Events Section */}
                   <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/studentDashboard/StdEvent"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faClipboardUser} className="mr-4 text-[#ffae01]" />
                Event
              
            </NavLink>
          </li>
                   {/* StdBookIssue Section */}
                   <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/studentDashboard/StdBookIssue"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faClipboardUser} className="mr-4 text-[#ffae01]" />
                Book Issue
              
            </NavLink>
          </li>
                   {/* stdExamResult Section */}
                   {/* <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/studentDashboard/stdExamResult"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faClipboardUser} className="mr-4 text-[#ffae01]" />
                Exam Result
              
            </NavLink>
          </li> */}
                    <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
                      <NavLink
                        to="/studentDashboard/stdExamResult"
                        className={({ isActive }) =>
                          `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
                        }
                        onClick={() => toggleDropdown('exam')} 
                      >
                        <div className='flex items-center justify-start gap-1'>
                          <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                          Examinations
                        </div>
                        <FontAwesomeIcon icon={renderAngleIcon('exam')} className="mr-3" onClick={() => toggleDropdown('exam')} />
                      </NavLink>
                      {openDropdown=='exam' && (
                        <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                          <li>
                            <NavLink
                              to="/studentDashboard/stdExamResult"
                              className={({ isActive }) =>
                                `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                              }
                            >
                              <FontAwesomeIcon icon={faAngleRight} />
                              Exam Result
                            </NavLink>
                          </li>
          
                          <li>
                            <NavLink
                              to="/studentDashboard/StdExamSchedule"
                              className={({ isActive }) =>
                                `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                              }
                            >
                              <FontAwesomeIcon icon={faAngleRight} />
                              Exam Schedule
                            </NavLink>
                          </li>
                        </ul>
                      )}
                </li>






          
      </ul>
      </nav>
      </div>
  )
}

export default StdSidebar