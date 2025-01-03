import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faAngleDown, faAngleRight, faSchool, faBookOpen, faUser, faPenRuler, faBookAtlas, faChildren,  faFileLines, faBus, faCalendarDay, faSliders, faHotel, faVolleyball, faFile, faClipboardUser } from '@fortawesome/free-solid-svg-icons';
import {useStepContext} from '../../hooks/StepContext'
import { useUserContext } from '../../hooks/UserContext';

const Sidebar = ({setIsSidebarOpen}) => {

  const {setUserId} = useUserContext()
  const [openDropdown, setOpenDropdown] = useState(null)
  const {setCurrentStep} = useStepContext()

   const toggleDropdown = (dropdown) => {
    setOpenDropdown(prevDropdown => prevDropdown === dropdown ? null : dropdown);
  };

  const renderAngleIcon = (dropdown) => {
    return openDropdown === dropdown ? faAngleDown : faAngleRight;
  };

  const handleNavClick = () => {
    setIsSidebarOpen(false); 
  };
 

  return (
    <div>
      <nav className="p-5 h-full overflow-y-auto scrollbar-hide bg-[#051f3e] fixed text-white">
        <ul>
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink to={'/admin'} className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 hover:rounded-xl ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`}
              >
              <div className="flex gap-1 justify-center items-center">
                <FontAwesomeIcon icon={faHouse} className="mr-2 text-[#ffae01]"  />
                  Dashboard
              </div>
            </NavLink>
            </li>

           {/* User Section */}
           <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/user"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => {
                toggleDropdown('user')
                handleNavClick()
              }} 
            >
              <div className='flex items-center justify-start gap-1'>
              <FontAwesomeIcon icon={faUser} className="mr-3 text-[#ffae01]" />
                User
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('user')} className="mr-2" onClick={() => toggleDropdown('user')} />
            </NavLink>
            {openDropdown === 'user' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/activeUser"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Active Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/pendingUser"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Pending Users
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Conf Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/config"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] text-[#ffae01] font-bold rounded-xl' : ''}`
              }
              onClick={() => {
                toggleDropdown('conf')
                handleNavClick()
              }}
            >
              <div className='flex items-center justify-start'>
              <FontAwesomeIcon icon={faSliders} className=" text-[#ffae01]" />
                Configuration
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('conf')}  onClick={() => toggleDropdown('conf')} />
            </NavLink>
            {openDropdown=='conf' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/role"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256]  hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Role
                  </NavLink>
                </li>
            {/* School Section */}
            <li className="">
            <NavLink
              to="/admin/school"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] text-[#ffae01] font-bold rounded-xl' : ''}`
              }
            >
              {/* <FontAwesomeIcon icon={faSchool} className="mr-3 text-[#ffae01]" /> */}
               <FontAwesomeIcon icon={faAngleRight} />
              School
            </NavLink>
          </li>

            {/* Subject Section */}
            <li className="">
            <NavLink
              to="/admin/subject"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              {/* <FontAwesomeIcon icon={faBook} className="mr-3 text-[#ffae01]" /> */}
               <FontAwesomeIcon icon={faAngleRight} />
              Subject
            </NavLink>
          </li>


          {/* Class Section */}
          <li className="">
            <NavLink
              to="/admin/class"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
              {/* <FontAwesomeIcon icon={faPenRuler} className="mr-3 text-[#ffae01]" /> */}
              <FontAwesomeIcon icon={faAngleRight} />
              Grade
            </NavLink>
          </li>

                 
                 {/* Designation Section */}
                 <li className="">
            <NavLink
              to="/admin/designation"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] text-[#ffae01] font-bold rounded-xl' : ''}`
              }
            >
              {/* <FontAwesomeIcon icon={faSchool} className="mr-3 text-[#ffae01]" /> */}
               <FontAwesomeIcon icon={faAngleRight} />
               Designation
            </NavLink>
          </li>
                 {/* Departmrnt Section */}
                 <li className="">
            <NavLink
              to="/admin/department"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] text-[#ffae01] font-bold rounded-xl' : ''}`
              }
            >
              {/* <FontAwesomeIcon icon={faSchool} className="mr-3 text-[#ffae01]" /> */}
               <FontAwesomeIcon icon={faAngleRight} />
               Department
            </NavLink>
          </li>
                 {/* event Collection Section */}
                 <li className="">
            <NavLink
              to="/admin/eventcategory"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] text-[#ffae01] font-bold rounded-xl' : ''}`
              }
            >
              {/* <FontAwesomeIcon icon={faSchool} className="mr-3 text-[#ffae01]" /> */}
               <FontAwesomeIcon icon={faAngleRight} />
               Event Category
            </NavLink>
          </li>
                 {/* StaffAttendanceStatus Section */}
                 <li className="">
            <NavLink
              to="/admin/StaffAttendanceStatus"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'bg-[#002b52] text-[#ffae01] font-bold rounded-xl' : ''}`
              }
            >
              {/* <FontAwesomeIcon icon={faSchool} className="mr-3 text-[#ffae01]" /> */}
               <FontAwesomeIcon icon={faAngleRight} />
               Attendance Status
            </NavLink>
          </li>

          {/* Manager Section */}
          <li className="">
            <NavLink
              to="/admin/managerReport"
              className={({ isActive }) =>
                `flex items-center gap-1 hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
               <FontAwesomeIcon icon={faAngleRight} />
              Manager Report
            </NavLink>
          </li>
              </ul>
            )}
          </li>


          {/* Library Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/library"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() =>{
                toggleDropdown('library')
                handleNavClick()
              }}
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faFileLines} className="mr-3 text-[#ffae01]" />
                Library
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('library')} className="mr-1" onClick={() => toggleDropdown('library')} />
            </NavLink>
            {openDropdown=='library' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/books"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Library Books
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/bookissue"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Book Issue
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Student Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
            to={'/admin/students'}
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => {
                toggleDropdown('students')
                handleNavClick()
                  setUserId(null)
                  setCurrentStep(1)
                }}
            >
              <div className='flex items-center justify-center gap-1'>
                <FontAwesomeIcon  icon={faChildren} className="text-[#ffae01] mr-2" />
                Students
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('students')} className="mr-1" onClick={() => toggleDropdown('students')} />
            </NavLink>
            {openDropdown == 'students' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                {/* <li>
                  <NavLink
                    to="/admin/AllStudents"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-5 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    All Students
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to="/admin/AdmissionForm"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                    onClick={() => {
                      setUserId(null)
                      setCurrentStep(1)
                    }}
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Admission Form
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/pendingAdmissionForm"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    <span
                      className="block "
                      style={{ maxWidth: '100px', whiteSpace: 'normal', wordBreak: 'break-word' }} // Adjust maxWidth as needed
                    >
                      Pending Admission Form
                    </span>
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/admin/studentDetails"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-5 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                    Student Details 
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                    to="/admin/studentPromotion"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Student Promotion 
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

             {/* Attendance Section */}
             <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/select"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faClipboardUser} className="mr-4 text-[#ffae01]" />
                Attendance
              
            </NavLink>
          </li>

          {/* Transport section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/transport"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faBus} className="mr-3 text-[#ffae01]" />
                Transport
            </NavLink>
          </li>

          {/* Notice Board Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/notice"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
            >
                <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                Notice
              
            </NavLink>
          </li>


          {/* Examinations Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/exam"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => {
                toggleDropdown('exam')
                handleNavClick()
              }}
            >
              <div className='flex items-center justify-start'>
                <FontAwesomeIcon icon={faFileLines} className=" text-[#ffae01] text-sm" />
                Examinations
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('exam')}  onClick={() => toggleDropdown('exam')} />
            </NavLink>
            {openDropdown=='exam' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/Examinations"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Exam type
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Examschedule"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Exam Schedule
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Grade"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Grade
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Examattendance"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Exam Attendance
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/ExamTypeTiles"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Exam Results
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Time Table Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/home"
              onClick={handleNavClick}
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
          to="/admin/homework"
          onClick={handleNavClick}
          className={({ isActive }) =>
            `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
          }
        >
            <FontAwesomeIcon icon={faBookOpen} className="mr-3 text-[#ffae01]" />
            Home work
          
        </NavLink>
      </li>


          {/* accounts Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/accounts"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => {
                toggleDropdown('accounts')
                handleNavClick()
              }}
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faFileLines} className="mr-3 text-[#ffae01]" />
                Accounts
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('accounts')} className="mr-3" onClick={() => toggleDropdown('accounts')} />
            </NavLink>
            {openDropdown=='accounts' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/Expenses"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Expenses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/ExpenseCategory"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Expense Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/income"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Income
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Invoices"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Invoices
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Invoiceview"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Invoice Veiw
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Transactions"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Transactions
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Holidays section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
                  <NavLink
                    to="/admin/holidays"
                    className={({ isActive }) =>
                      `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
                    }
                    onClick={handleNavClick}
                  >
                      <FontAwesomeIcon icon={faFile} className="mr-3 text-[#ffae01]" />
                      Holidays
                  </NavLink>
          </li>
          {/* Leave Type section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
                  <NavLink
                    to="/admin/leave"
                    className={({ isActive }) =>
                      `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
                    }
                    onClick={handleNavClick}
                  >
                      <FontAwesomeIcon icon={faFile} className="mr-3 text-[#ffae01]" />
                      Leave Type
                  </NavLink>
          </li>

          {/* Leaves Section */}
       <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/leaveModule"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => {
                toggleDropdown('leaveApp')
                handleNavClick()
              }} 
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                Leave
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('leaveApp')} className="mr-3" onClick={() => toggleDropdown('leaveApp')} />
            </NavLink>
            {openDropdown=='leaveApp' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                {/* <li>
                  <NavLink
                    to="/admin/leaves"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    List of Leaves
                  </NavLink>
                </li> */}

                <li>
                  <NavLink
                    to="/admin/leaveRequest"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Approve Request
                  </NavLink>
                </li>
              </ul>
            )}
      </li>


          {/* Sports Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
            to={'/admin/sportModule'}
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => {
                toggleDropdown('sports')
                handleNavClick()
              }}
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faVolleyball} className="mr-1 text-[#ffae01]" />
                Sports
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('sports')} className="mr-3" onClick={() => toggleDropdown('sports')} />
            </NavLink>
            {openDropdown=='sports' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/sports"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Sports List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/Players"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                    Players 
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* Hostel Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
            to={'/admin/hostelModule'}
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => {
                toggleDropdown('hostel')
                handleNavClick()
              }}
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faHotel} className="mr-1 text-[#ffae01]" />
                Hostel
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('hostel')} className="mr-3" onClick={() => toggleDropdown('hostel')} />
            </NavLink>
            {openDropdown == 'hostel' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/hostel"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Hostel List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/roomtype"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                     Room Type
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/hostelrooms"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                    Hostel Rooms 
                  </NavLink>
                </li>

                {/* <li>
                  <NavLink
                    to="/admin/hostelallocation"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] py-2 px-10 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight}  />
                    Hostel Allocation 
                  </NavLink>
                </li> */}
              </ul>
            )}
          </li>

          {/* Fees Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/fees"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => {
                toggleDropdown('fees')
                handleNavClick()
              }}
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                Fees
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('fees')} className="mr-3" onClick={() => toggleDropdown('fees')} />
            </NavLink>
            {openDropdown=='fees' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/feesgrp"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Fees Group
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/feescollect"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Collect Fees
                  </NavLink>
                </li>
              </ul>
            )}
          </li>


             {/* Events Section */}
             <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/Event"
              className={({ isActive }) =>
                `flex items-center  hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={handleNavClick}
            >
                <FontAwesomeIcon icon={faClipboardUser} className="mr-4 text-[#ffae01]" />
                Event
              
            </NavLink>
          </li>

          {/*Hrm Section */}
          <li className="mb-4 pb-2 text-base font-medium border-b border-gray-300">
            <NavLink
              to="/admin/hrm"
              className={({ isActive }) =>
                `flex items-center justify-between hover:bg-[#063256] hover:rounded-xl p-2 ${isActive ? 'text-[#ffae01] bg-[#002b52] font-bold rounded-xl' : ''}`
              }
              onClick={() => {
                toggleDropdown('hrm')
                handleNavClick()
              }}
            >
              <div className='flex items-center justify-start gap-1'>
                <FontAwesomeIcon icon={faFileLines} className="mr-4 text-[#ffae01]" />
                HRM
              </div>
              <FontAwesomeIcon icon={renderAngleIcon('hrm')} className="mr-3" onClick={() => toggleDropdown('hrm')} />
            </NavLink>
            {openDropdown=='hrm' && (
              <ul className=" text-sm font-normal flex flex-col bg-[#021933] mt-2">
                <li>
                  <NavLink
                    to="/admin/hrm/payroll"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Payroll
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/ViewPaySlip"
                    className={({ isActive }) =>
                      `flex items-center gap-1 hover:bg-[#063256] p-2 ${isActive ? 'bg-[#002b52] text-[#ffa901] font-bold rounded-xl' : ''}`
                    }
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                    Pay Slip
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

