import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../Reusable_components/Button';
import { NavLink } from 'react-router-dom';
import BASE_URL from '../../../conf/conf';
import axios from 'axios';

function StudentPromotion() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [currentSession, setCurrentSession] = useState("");
  const [promoteSession , setPromoteSession] = useState("") ;
  const [classList , setClassList] = useState([]);
  const [userList , setUserList] = useState([]);
  const [selectedClass , setSelectedClass] = useState('') ;
  const [selectedUsers , setSelectedUsers] = useState([]) ;
  const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
    const year = new Date().getFullYear();
    const currentSession = `${year-1}-${year}`;
    const promoteSession = `${year}-${year + 1}`;
    setCurrentSession(currentSession);
    setPromoteSession(promoteSession);
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/class/getClassList`);
        setClassList(response.data.data);
      } catch (error) {
        console.error('Error fetching class list:', error);
      }
    };

    const fetchStds = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/getUserList`);
        const students = response.data.data.filter((std) => std.role === 3);
        setUserList(students);
        setSelectedUsers(students.map((user) => user.id)); // select all users initially
      } catch (error) {
        console.error('Error fetching student list:', error);
      }
    };

    fetchClasses();
    fetchStds();
  }, []);

  const handleUserSelect = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );

    if(setSelectedUsers.length === 0){
      setSelectAll(false)
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]); // Unselect all
    } else {
      setSelectedUsers(userList.map((user) => user.id)); // Select all
    }
    setSelectAll(!selectAll); // Toggle selectAll state
  };

  const onSubmit = (data) => {
    data.currentSession = currentSession;
    data.promoteSession = promoteSession ;
    data.selectedStudents = selectedUsers ;
    console.log(data);
  };

  return (
    <div className='h-full mb-10'>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Student Promotion</h1>
      <p className=' mt-2'>
        Dashboard /<NavLink to='/admin/user'> Admin </NavLink>/ <NavLink to='/admin/allStudents'> Students </NavLink>/<span className='text-[#ffae01] font-semibold'> Student Promotion</span>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="p-10 mx-auto  bg-white rounded-xl shadow-md space-y-6 my-5">
        <div className="grid grid-cols-4 gap-6">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Current Session *</label>
            <input
              type="text"
              id="currentSession"
              value={currentSession}
              readOnly
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-2"
            />
            {errors.currentSession && <p className="text-red-500 text-sm mt-1">{errors.currentSession.message}</p>}
          </div>
          <div>
            <label className="block text-base mb-1 font-medium text-gray-700">Promote Session *</label>
            <input
              type="text"
              id="promoteSession"
              value={promoteSession}
              readOnly
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-2"
            />
            {errors.promoteSession && <p className="text-red-500 text-sm mt-1">{errors.promoteSession.message}</p>}
          </div>
          <div>
            <label className="block text-base mb-1 font-medium text-gray-700">Promotion From Class *</label>
            <select
              {...register('promotionFromClass', { required: 'Promotion From Class is required' })}
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-2"
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Please Select *</option>
              {classList.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}-{classItem.section}
                </option>
              ))}
            </select>
            {errors.promotionFromClass && <p className="text-red-500 text-sm mt-1">{errors.promotionFromClass.message}</p>}
          </div>
          <div>
            <label className="block text-base mb-1 font-medium text-gray-700">Promotion To Class *</label>
            <select
              {...register('promotionToClass', { required: 'Promotion To Class is required' })}
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-[#f3f4f6] py-2"
            >
              <option value="">Please Select *</option>
              {classList.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}-{classItem.section}
                </option>
              ))}
            </select>
            {errors.promotionToClass && <p className="text-red-500 text-sm mt-1">{errors.promotionToClass.message}</p>}
          </div>
        </div>

        {selectedClass && (
          <div className="my-6">
          <div className='flex gap-4'>
          <label className="block text-base font-medium text-gray-700 mb-1">Select Students</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="h-4 w-4 border-gray-300 rounded"
            />
            <span className="ml-2">Select All</span>
          </div>
          </div>

          <div className="max-h-60 overflow-y-auto border rounded-md p-2 bg-[#f9f9f9]">
            {userList.map((user) => (
              <div key={user.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleUserSelect(user.id)}
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <span className="ml-2">{`UserId : ${user.userId} , Name : ${user.firstName} ${user.lastName} , Roll No: ${user.rollNumber} , Result Status : `}</span>
              </div>
            ))}
            </div>
        </div> 
      )}

        <div className="flex items-center justify-center space-x-4">
          <Button text="Submit" onClick={handleSubmit(onSubmit)} />
        </div>
      </form>
    </div>
  );
}

export default StudentPromotion;
