import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../assets/edit.png';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
import AddUser from './AddUser';
import EditUser from './EditUser';

function User() {

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
    sortable: false,
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: false,
  },
  {
    name: 'Phone Number',
    selector: row => row.phone,
    sortable: false,
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

  const [user, setUser] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const [selectedColumn, setSelectedColumn] = useState(''); 
  const [searchValue, setSearchValue] = useState('');

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (id) => {
    setEditUserId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditUserId(null);
    setIsEditPopupOpen(false);
  };

  const fetchData = async() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/user/getUserList',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setUser(response.data.data);
        console.log('Data from API:', response.data.data);
        console.log('Data from userData', user);
        setFilterUser(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
  const handleSearch = (event, type) => {
    if (type === 'column') {
      setSelectedColumn(event.target.value); // Set selected column
    } else if (type === 'query') {
      setSearchValue(event.target.value); // Set search query
    } else if (type === 'button') {
      // search filter when the search button is clicked
      const filteredData = filterUser.filter((row) =>
        row[selectedColumn]?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setUser(filteredData); // Update data
    }
  };

  // handle clear button logic
  const handleClear = () => {
    setUser(filterUser);  // Reset to original data
  };

  return (
    <div className='pl-0'>
       <h1 className='text-lg md:text-2xl pl-20 pt-8 font-semibold text-black'>All Users</h1>

      <Table
         columns={column}
         data={user}
         searchOptions={searchOptions}
         onSearch={handleSearch}
         handleClear = {handleClear}
         onAddClick={openAddPopup}
      />
      <AddUser 
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
      />
    </div>
  );
}

export default User;