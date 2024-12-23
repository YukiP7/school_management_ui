import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../assets/edit.png';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
import { NavLink, useNavigate } from 'react-router-dom';
import BASE_URL from '../../../conf/conf';
import { useUserContext } from '../../../hooks/UserContext';
import { useStepContext } from '../../../hooks/StepContext';

function PendingAdmForm() {
const navigate = useNavigate();
const [formDets , setFormDets] = useState([]) ;
const {setUserId , setId} = useUserContext() 
const {setCurrentStep} = useStepContext() 

const column = [
  {
    name: 'SR.No',
    selector: (row , idx) => idx+1,
    sortable: false,
  }, 
  {
    name: 'First Name',
    selector: row => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.lastName,
    sortable: true,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true,
  },
  {
    name: 'Phone Number',
    selector: row => row.phone,
    sortable: true,
  },
  {
    name: 'Gender',
    selector: row => row.gender,
    sortable: true,
  },
  {
    name: 'Action',
    cell: row => (
      <div className='flex gap-2'>
        <button
        onClick={() => handleForm(row.userId)}
      >
        <img src={edit} alt="Edit" className='h-8' />
      </button>

      <button>
        <img src={deleteIcon} alt="Delete" className='h-8' />
      </button>
      </div>
    ),
  },
]

  const [user, setUser] = useState([]);
  const [filterUser, setFilterUser] = useState([]);

  const fetchData = async() => {
    axios({
      method: 'GET',
      url: `${BASE_URL}/user/getUserList`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const users = response.data.data.filter((user) => user.role === 3) ;
        setUser(users.filter((user) => (user.isActive == null || user.isActive == false)));
        setFilterUser(users.filter((user) => (user.isActive == null || user.isActive == false)))
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchFormDetails = async (userId) => {
    await axios({
      method: 'GET',
      url: `${BASE_URL}/user/getStudentDetails/${userId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log(res.data.data);
      const details = res.data.data;
      setFormDets(details);
      setUserId(userId);
      setId(details.id);
  
      // Update the step based on the details without navigating
      if (details.school === null) {
        setCurrentStep(2);
      } else if (details.admissionDate === null) {
        setCurrentStep(3);
      } else if (details.routeName === null) {
        setCurrentStep(4);
      } else if (details.buildingName === null) {
        setCurrentStep(5);
      } else if (details.previousSchoolName === null) {
        setCurrentStep(6);
      }else if (details.isActive === null || details.isActive === false) {
        setCurrentStep(7);
      } else {
        console.log("All details are filled");
      }
  
      // Navigate to the AdmissionForm page (if not already there)
      navigate('/admin/admissionForm');
    })
    .catch((err) => {
      console.error("Error in fetching form details:", err);
    });
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleForm = (userId) => {
    fetchFormDetails(userId) ;
  }

  useEffect(() => {
    setUser(user);  
    setFilterUser(user); 
  }, []);

  const searchOptions = [
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'Gender', value: 'gender' },
  ];

   // Handle Search Logic
   const handleSearch = (query, checkboxRefs) => {
    if (!query) {
      setUser(filterUser);
      return;
    }
  
    const selectedFields = Object.keys(checkboxRefs)
      .filter((key) => checkboxRefs[key].checked);
  
    const filteredData = filterUser.filter((row) =>
      selectedFields.some((field) =>
        row[field]?.toLowerCase().includes(query.toLowerCase())
      )
    );
  
    setUser(filteredData);
  };

  // handle clear button logic
  const handleClear = () => {
    setUser(filterUser);  // Reset to original data
  };

  return (
    <div className='pl-0 h-full mb-10'>
       <h1 className='text-lg md:text-2xl  pt-8 font-semibold text-black'>Pending Students</h1>
       <p className=' mt-2'>
        <NavLink to = '/admin'> Dashboard </NavLink>/ 
        <NavLink to = '/admin/students'> Students </NavLink>/
        <span className='text-[#ffae01] font-semibold'>Pending Admission Form</span> </p>

      <Table
         columns={column}
         data={user}
         searchOptions={searchOptions}
         onSearch={handleSearch}
         handleClear = {handleClear}
      />
    </div>
  );
}

export default PendingAdmForm;