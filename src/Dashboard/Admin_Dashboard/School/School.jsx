import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import './Table.css';
// import { Link } from 'react-router-dom';
import edit from '../../../assets/edit.png';
import AddSchoolPopup from './AddSchoolPopup';
import EditSchoolPopup from './EditSchoolPopup';
// import DataTable from 'react-data-table-component';
import Table from '../../../Reusable_components/Table';
import deleteIcon from '../../../assets/delete.png'
import { NavLink } from 'react-router-dom';
import AddBtn from '../../../Reusable_components/AddBtn'
import BASE_URL from '../../../conf/conf';

function School() {

const column = [
  {
    name: 'SR.No',
    selector: (row , idx) => idx+1,
    sortable: false,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'School Number',
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
    selector: row => cityMap[row.city],
    sortable: true,
  },
  {
    name: 'State',
    selector: row => stateMap[row.state],
    sortable: true,
  },
  {
    name: 'Country',
    selector: row => {
      const country = countries.filter((c) => c.id == row.country)   
      return country[0]?.name
    },
    sortable: true,
  },
  {
    name: 'Pin Code',
    selector: row => row.pinCode,
    sortable: true,
  },
  {
    name: 'Action',
    cell: row => (
      <div className='flex gap-2'>
        <button
        onClick={() => openEditPopup(row.id)}
        // className='p-1 bg-blue-500 text-white rounded ml-2'
      >
        <img src={edit} alt="Edit" className='h-8' />
      </button>

      <button
        // onClick={() => openEditPopup(row.id)}
        // className='p-1 bg-blue-500 text-white rounded ml-2'
      >
        <img src={deleteIcon} alt="Delete" className='h-8' />
      </button>
      </div>
    ),
  },
]

  const [school, setSchool] = useState([]);
  const [filterSchool, setFilterSchool] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editSchoolId, setEditSchoolId] = useState(null);
  const [countries, setCountries] = useState([]);
  const [stateMap, setStateMap] = useState({});
  const [cityMap, setCityMap] = useState({});


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

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/area/getCountryList`);
      setCountries(response.data.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStatesByCountry = async (countryId) => {
    try {
      const response = await axios.get(`${BASE_URL}/area/getStateList/${countryId}`);
      const states = response.data.data;
      const newStateMap = { ...stateMap };
      states.forEach((state) => {
        newStateMap[state.id] = state.name;
      });
      setStateMap(newStateMap);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCitiesByState = async (stateId) => {
    try {
      const response = await axios.get(`${BASE_URL}/area/getCitiesList/${stateId}`);
      const cities = response.data.data;
      const newCityMap = { ...cityMap };
      cities.forEach((city) => {
        newCityMap[city.id] = city.name;
      });
      setCityMap(newCityMap);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    if (isAddPopupOpen || isEditPopupOpen) {
      document.body.style.overflow = 'hidden';  // Disable scroll when any popup is open
    } else {
      document.body.style.overflow = 'auto';  // Enable scroll when no popup is open
    }

    return () => {
      document.body.style.overflow = 'auto';  // Cleanup on unmount
    };
  }, [isAddPopupOpen, isEditPopupOpen]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/school/getSchoolList`);
      const schoolData = response.data.data;

      // Fetch states and cities dynamically for each school
      for (const school of schoolData) {
        if (school.country && !stateMap[school.state]) {
          await fetchStatesByCountry(school.country); // Fetch states for this country
        }
        if (school.state && !cityMap[school.city]) {
          await fetchCitiesByState(school.state); // Fetch cities for this state
        }
      }

      setSchool(schoolData);
      setFilterSchool(schoolData);
    } catch (error) {
      console.error('Error fetching school data:', error);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSchool(school);  
    setFilterSchool(school); 
  }, []);

  // const handleFilter = (event) => {
  //    const newData = filterSchool.filter(row=>row.name.toLowerCase().includes(event.target.value.toLowerCase()))
  //    setSchool(newData);
  // }

   // Handle Search Logic
   const handleSearch = (query, checkboxRefs) => {
    if (!query) {
      setSchool(filterSchool);
      return;
    }
  
    const selectedFields = Object.keys(checkboxRefs)
      .filter((key) => checkboxRefs[key].checked);
  
    const filteredData = filterSchool.filter((row) =>
      selectedFields.some((field) =>
        row[field]?.toLowerCase().includes(query.toLowerCase())
      )
    );
  
    setSchool(filteredData);
  };

  const handleClear = () => {
    setSchool(filterSchool);  // Reset to original data
  };
  
  const searchOptions = [
    { label: 'School Name', value: 'name' },
    { label: 'School Number', value: 'houseNumber' },
    { label: 'Street', value: 'street' },
    { label: 'State', value: 'state' },
    { label: 'City', value: 'city' },
    { label: 'Pincode', value: 'pinCode' },
    { label: 'Country', value: 'country' }
  ];

  return (
    <div className='h-full mb-10'>
        <h1 className='text-lg md:text-2xl  pt-8 font-semibold text-black'>Schools</h1>
        <p className=' mt-2'>
          <NavLink to = '/admin'> Dashboard  </NavLink>/ 
          <NavLink to = '/admin/config'> Configuration </NavLink>/
          <span className='text-[#ffae01] font-semibold'>Schools</span> </p>
        <AddBtn onAddClick={openAddPopup}/>
      <Table
         columns={column}
         data={school}
         searchOptions={searchOptions}
         onSearch={handleSearch}
         handleClear={handleClear}
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
