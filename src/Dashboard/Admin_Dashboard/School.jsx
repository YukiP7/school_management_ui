import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import './Table.css';
// import { Link } from 'react-router-dom';
import edit from '../../assets/edit.png';
import AddSchoolPopup from './AddSchoolPopup';
import EditSchoolPopup from './EditSchoolPopup';
// import DataTable from 'react-data-table-component';
import Table from '../../Reusable_components/Table';

function School() {

const column = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'House Number',
    selector: row => row.houseNumber,
    sortable: true,
  },
  {
    name: 'Street',
    selector: row => row.street,
    sortable: true,
  },
  {
    name: 'City',
    selector: row => row.city,
    sortable: true,
  },
  {
    name: 'State',
    selector: row => row.state,
    sortable: true,
  },
  {
    name: 'Pin Code',
    selector: row => row.pinCode,
    sortable: true,
  },
  {
    name: 'Country',
    selector: row => row.country,
    sortable: true,
  },
  {
    name: 'Action',
    cell: row => (
      <button
        onClick={() => openEditPopup(row.id)}
        // className='p-1 bg-blue-500 text-white rounded ml-2'
      >
        <img src={edit} alt="Edit" className='h-10' />
      </button>
    ),
  },
]

  const [school, setSchool] = useState([]);
  const [filterSchool, setFilterSchool] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editSchoolId, setEditSchoolId] = useState(null);

  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (id) => {
    setEditSchoolId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditSchoolId(null);
    setIsEditPopupOpen(false);
  };

  const fetchData = async() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/school/getSchoolList',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setSchool(response.data.data);
        console.log('Data from API:', response.data.data);
        console.log('Data from schooldata', school);
        setFilterSchool(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (event) => {
     const newData = filterSchool.filter(row=>row.name.toLowerCase().includes(event.target.value.toLowerCase()))
     setSchool(newData);
  }

  return (
    // <div>
    //   <button
    //     onClick={openAddPopup}
    //     className='absolute top-4 right-5 p-2 bg-green-600 text-white rounded-lg shadow-sm shadow-black hover:bg-green-500 hover:font-semibold'>
    //     Add School
    //   </button>

    //   <div className='rounded-2xl mt-20 text-black w-4/5 mx-10'>
    //     <div className='flex justify-end'>
    //       <input type='text' placeholder='search...' onChange={handleFilter}></input>
    //     </div>
    //     <DataTable
    //       columns={column}
    //       data={school}
    //       pagination
    //     />


    //   </div>
    
    <div className='pl-0'>
      <Table
         columns={column}
         data={school}
         handleFilter={handleFilter}
         onAddClick={openAddPopup}
         addButtonLabel={"Add School"}
      />
      <AddSchoolPopup 
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
      />

      <EditSchoolPopup
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        schoolId={editSchoolId}
        onSuccess={fetchData} // Refresh data after editing
      />
    </div>
  );
}

export default School;
