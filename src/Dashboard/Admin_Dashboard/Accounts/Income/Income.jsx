import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../../assets/edit.png'
import deleteIcon from '../../../../assets/delete.png'
// import Table from '../../../Reusable_components/Table';
import { NavLink, useNavigate } from 'react-router-dom';
import Table from '../../../../Reusable_components/Table';
import StatusButton from '../../../../Reusable_components/StatusButton';
// import StatusButton from '../../../Reusable_components/StatusButton';


function Income() {
const navigate =useNavigate()
  const column = [
    {
      name: 'SR.No',
      selector: (row,idx) => idx+1 ,
      sortable: false,
    },
    {
      name: 'Income Name',
      selector: row => row.incomeName,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Source',
      selector: row => row.incomeSource,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => row.incomeDate,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => row.amount,
      sortable: true,
    },
    {
      name: 'Invoice No.',
      selector: row => row.invoice,
      sortable: true,
    },
    {
      name: 'Payment Method',
      selector: row => row.paymentMode,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <StatusButton isActive={row.isActive}/>
      ),
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

  const [income, setIncome] = useState([]);
  const [filterincome, setFilterincome] = useState([]);

//   const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [editBookId, setEditBookId] = useState(null);

//   const openAddPopup = () => setIsAddPopupOpen(true);
//   const closeAddPopup = () => setIsAddPopupOpen(false);

//   const openEditPopup = (id) => {
//     setEditBookId(id);
//     setIsEditPopupOpen(true);
//   };

//   const closeEditPopup = () => {
//     setEditBookId(null);
//     setIsEditPopupOpen(false);
//   };

//   useEffect(() => {
//     if (isAddPopupOpen || isEditPopupOpen) {
//       document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
//     } else {
//       document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
//     }

//     return () => {
//       document.body.style.overflow = 'auto';  // Cleanup on unmount
//     };
//   }, [isAddPopupOpen, isEditPopupOpen]);

  const fetchData = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/income/getIncomeList',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Data from API:', response.data);
        setIncome(response.data.data);
        setFilterincome(response.data.data)

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setIncome(income);  
    setFilterincome(income); 
  }, []);

//   const handleFilter = (event) => {
//     const newData = filterSchool.filter(row=>row.name.toLowerCase().includes(event.target.value.toLowerCase()))
//     setBook(newData);
//  }

  // Handle Search Logic
  const handleSearch = (query, checkboxRefs) => {
    if (!query) {
      setIncome(filterincome);
      return;
    }
  
    const selectedFields = Object.keys(checkboxRefs)
      .filter((key) => checkboxRefs[key].checked);
  
    const filteredData = filterincome.filter((row) =>
      selectedFields.some((field) =>
        row[field]?.toLowerCase().includes(query.toLowerCase())
      )
    );
  
    setIncome(filteredData);
  };

// handle clear button logic
const handleClear = () => {
  setIncome(filterincome);  // Reset to original data
};

const handleAddClick = () => {
  navigate('/admin/addincome')
}

const searchOptions = [
  { label: 'Income Name', value: 'name' },
  { label: 'Description', value: 'description' },
  { label: 'Source', value: 'source' },
  { label: 'Date', value: 'date' },
  { label: 'Amount', value: 'amount' },
  { label: 'Invoice no.', value: 'Invoice no.' },
  { label: 'Payment Method', value: 'paymentmethod' },
];

  return (
    <div className=' h-full mb-10 mr-10'>

      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Expenses</h1>
      <p className='mt-2'>Dashboard /<NavLink to = '/admin'> Admin </NavLink>/<NavLink to = '/admin/expenses'> Expenses </NavLink>/ <span className='text-[#ffae01] font-semibold'>Income</span> </p>

      <Table
      columns={column}
      data={income}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
      onAddClick={handleAddClick}
      />

      {/* <AddBooksPopup
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
      /> */}

      {/* <EditBookPopup
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        bookId={editBookId}
        onSuccess={fetchData} // Refresh data after editing
      /> */}
    </div>
  );
}

export default Income

