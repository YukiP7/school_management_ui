import axios from 'axios';
import React, {useEffect, useState } from 'react'
import edit from '../../../../assets/edit.png'
import Table from '../../../../Reusable_components/Table';
import deleteIcon from '../../../../assets/delete.png'
import { NavLink } from 'react-router-dom';
import AddBtn from '../../../../Reusable_components/AddBtn'
import StatusButton from '../../../../Reusable_components/StatusButton';
import Swal from 'sweetalert2'
import AddEventCategory from './AddEventCategory';
import EditEventCategory from './EditEventCategory';
import BASE_URL from '../../../../conf/conf';



function EventCategory() {
  const [data, setData] = useState([]);
  const [filterData , setFilterData] = useState([])
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editEventCatId , setEditEventCatId] = useState(null)

  useEffect(() => {
    if (isAddPopupOpen ) {
      document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
    } else {
      document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
    }

    return () => {
      document.body.style.overflow = 'auto';  // Cleanup on unmount
    };
  }, [isAddPopupOpen]);

// const handleDelete = (id)=>{

//     Swal.fire({
//         title: "Are you sure?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!"
//       }).then((result) => {
//         if (result.isConfirmed) {

//             axios({
//                 method: "post",
//                 url: `${BASE_URL}/roomType/deleteRoomType/${id}`,
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 // withCredentials: true,
//               })
//                 .then((response) => {
//                   console.log("Data from Delete API:", response.data);
//                   fetchData()
//                 })
//                 .catch((error) => {
//                   console.error("Error to Delete data:", error);
//                   fetchData()
//                 });

//           Swal.fire({
//             title: "Deleted!",
//             text: "Your Data has been deleted.",
//             icon: "success"
//           });
//         }
//       });

// }
  
  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => setIsAddPopupOpen(false);

  const openEditPopup = (id) => {
    setEditEventCatId(id);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setEditEventCatId(null);
    setIsEditPopupOpen(false);
  };


  const fetchData = () => {
    axios({
      method: "GET",
      url: `${BASE_URL}/eventCategory/getEventCatList`,
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    })
      .then((response) => {
        console.log("Data from API:", response.data);
        setData(response.data.data);
        setFilterData(response.data.data) ;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData() ;
  } , []);

  useEffect(() => {
    setData(data);  
    setFilterData(data); 
  }, []);
  
  const column = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
      sortable: false,
    //   width: '300px', 
    },
    {
      name: 'Event Category Id',
      selector: (row) => row.eventCategoryId,
      sortable: true,
      wrap: true, 
    //   width: '300px', 
    },
    {
      name: 'Title',
      selector: (row) => row.eventCategoryTitle,
      sortable: true,
      wrap: true, 
    //   width: '300px', 
    },
    // {
    //   name: 'Description',
    //   selector: (row) => row.description,
    //   sortable: true,
    //   wrap: true,
    //   width: '300px', 
    // },
    {
        name: 'Status',
        selector: row => (
          <StatusButton isActive={row.isActive} />
        ),
        sortable: true,
        // width: '117px',
              // wrap: true, 
      },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => openEditPopup(row.id)}>
            <img src={edit} alt="Edit" className="h-8" />
          </button>
          <button
          onClick={()=>handleDelete(row.id)}
          >
            <img src={deleteIcon} alt="Delete" className="h-8" />
          </button>
        </div>
      ),
      width: '300px', 
    },
  ];

// const handleFilter = (event) => {
//   const newData = filterData.filter(row=>row.subject.toLowerCase().includes(event.target.value.toLowerCase()))
//   setData(newData);
// }

const handleSearch = (query, checkboxRefs) => {
  if (!query) {
    setData(filterData);
    return;
  }

  const selectedFields = Object.keys(checkboxRefs)
    .filter((key) => checkboxRefs[key].checked);

  const filteredData = filterData.filter((row) =>
    selectedFields.some((field) =>
      row[field]?.toLowerCase().includes(query.toLowerCase())
    )
  );

  setData(filteredData);
};

// handle clear button logic
const handleClear = () => {
  setData(filterData);  // Reset to original data
};

const searchOptions = [
  { label: 'Event Category Id', value: 'eventCategoryId' },
  { label: 'Title', value: 'eventCategoryTitle' }
];

  return (
    <div className=' h-full mb-10'>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Event Category</h1>
      <p className=' mt-2'>
        <NavLink to = '/admin'>Dashboard </NavLink>/ 
        <NavLink to = '/admin/config'> Configuration </NavLink>/
        <span className='text-[#ffae01] font-semibold'>Event Category</span> </p>
      <AddBtn onAddClick={openAddPopup}/>
      <Table 
      columns={column}
      data={data}
      searchOptions={searchOptions}
      onSearch={handleSearch}
      handleClear={handleClear}
      onAddClick={openAddPopup}
      />

      <AddEventCategory
        isOpen={isAddPopupOpen} 
        onClose={() => {
          closeAddPopup();
          fetchData(); // Refresh data when add popup closes
        }} 
        />

      <EditEventCategory
        isOpen={isEditPopupOpen}
        onClose={() => {
          closeEditPopup();  // Only close the Edit popup here
          fetchData();       // Fetch data after the Edit popup is closed
        }}
        EventCatId={editEventCatId}
        onSuccess={fetchData} // Refresh data after editing
      />
    </div>
  );
};


export default EventCategory