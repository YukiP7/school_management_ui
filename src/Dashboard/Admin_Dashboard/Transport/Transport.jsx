import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../assets/edit.png';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
import AddUser from '../User/AddUser';
import EditUser from '../User/EditUser';

function Transport() {

const column = [
  {
    name: 'Route Name',
    selector: row => row.routeName,
    sortable: true,
  }, 
  {
    name: 'Vechile No.',
    selector: row => row.vechileNo,
    sortable: true,
  },
  {
    name: 'Driver Name',
    selector: row => row.driverName,
    sortable: true,
  },
  {
    name: 'Driver License',
    selector: row => row.license,
    sortable: true,
  },
  {
    name: 'Phone Number',
    selector: row => row.phone,
    sortable: true,
  },
  {
    name: 'Action',
    cell: row => (
      <div className='flex gap-2'>
        <button
        onClick={() => openEditPopup(row.id)}
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

  // const [user, setUser] = useState([]);
  // const [filterUser, setFilterUser] = useState([]);
  // const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  // const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  // const [editUserId, setEditUserId] = useState(null);

  // const openAddPopup = () => setIsAddPopupOpen(true);
  // const closeAddPopup = () => setIsAddPopupOpen(false);

  // const openEditPopup = (id) => {
  //   setEditUserId(id);
  //   setIsEditPopupOpen(true);
  // };

  // const closeEditPopup = () => {
  //   setEditUserId(null);
  //   setIsEditPopupOpen(false);
  // };

  // const fetchData = async() => {
  //   axios({
  //     method: 'GET',
  //     url: 'http://localhost:8080/user/getUserList',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => {
  //       setUser(response.data.data);
  //       console.log('Data from API:', response.data.data);
  //       console.log('Data from userData', user);
  //       setFilterUser(response.data.data)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   setUser(user);  
  //   setFilterUser(user); 
  // }, []);

  const searchOptions = [
    { label: 'Route Name', value: 'routeName' },
    { label: 'Vechile No.', value: 'vechile' },
    { label: 'Driver Name', value: 'driverName' },
    { label: 'Phone Number', value: 'phone' },
  ];

   // Handle Search Logic
   const handleSearch = (query, checkboxRefs) => {
    // if (!query) {
    //   setUser(filterUser);
    //   return;
    // }
  
    // const selectedFields = Object.keys(checkboxRefs)
    //   .filter((key) => checkboxRefs[key].checked);
  
    // const filteredData = filterUser.filter((row) =>
    //   selectedFields.some((field) =>
    //     row[field]?.toLowerCase().includes(query.toLowerCase())
    //   )
    // );
  
    // setUser(filteredData);
  };

  // handle clear button logic
  const handleClear = () => {
    // setUser(filterUser);  // Reset to original data
  };

  return (
    <div className='pl-0 h-full mb-10'>
       <h1 className='text-lg md:text-2xl pl-20 pt-8 font-semibold text-black'>All Transport Lists</h1>

      <Table
         columns={column}
         data={''}
         searchOptions={searchOptions}
         onSearch={handleSearch}
         handleClear = {handleClear}
         onAddClick={''}
      />
      {/* <AddUser 
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
      />

      <EditUser
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        userId={editUserId}
        onSuccess={fetchData} // Refresh data after editing
      /> */}
    </div>
  );
}

export default Transport;