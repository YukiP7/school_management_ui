import axios from 'axios';
import React, { useEffect, useState } from 'react';
import edit from '../../../../assets/edit.png';
import deleteIcon from '../../../../assets/delete.png';
import { NavLink, useNavigate } from 'react-router-dom';
import Table from '../../../../Reusable_components/Table';
import StatusButton from '../../../../Reusable_components/StatusButton';

function Income() {
  const navigate = useNavigate();
  const column = [
    {
      name: 'SR.No',
      selector: (row, idx) => idx + 1,
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
        <StatusButton isActive={row.isActive} />
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className='flex gap-2'>
          <button onClick={() => openEditPopup(row.id)}>
            <img src={edit} alt="Edit" className='h-8' />
          </button>
          <button>
            <img src={deleteIcon} alt="Delete" className='h-8' />
          </button>
        </div>
      ),
    },
  ];

  const [income, setIncome] = useState([]);
  const [filterIncome, setFilterIncome] = useState([]);

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
        setFilterIncome(response.data.data);
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
    setFilterIncome(income);
  }, [income]);

  // Helper function to access nested fields
  const getNestedFieldValue = (obj, field) => {
    return field.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  // Handle Search Logic
  const handleSearch = (query, checkboxRefs) => {
    if (!query) {
      setIncome(filterIncome);
      return;
    }

    const selectedFields = Object.keys(checkboxRefs).filter((key) => checkboxRefs[key].checked);

    const filteredData = filterIncome.filter((row) =>
      selectedFields.some((field) => {
        const fieldValue = getNestedFieldValue(row, field);
        return fieldValue?.toString().toLowerCase().includes(query.toLowerCase());
      })
    );

    setIncome(filteredData);
  };

  const handleClear = () => {
    fetchData();  // Fetch the original data again to reset the table
  };
  

  const handleAddClick = () => {
    navigate('/admin/addincome');
  };

  const searchOptions = [
    { label: 'Income Name', value: 'incomeName' },
    { label: 'Description', value: 'description' },
    { label: 'Source', value: 'incomeSource' },
    { label: 'Date', value: 'incomeDate' },
    { label: 'Amount', value: 'amount' },
    { label: 'Invoice no.', value: 'invoice' },
    { label: 'Payment Method', value: 'paymentMode' },
  ];

  return (
    <div className=' h-full mb-10 mr-10'>
      <h1 className='text-lg md:text-2xl pt-8 font-semibold text-black'>Income</h1>
      <p className='mt-2'>
        Dashboard /<NavLink to='/admin'> Admin </NavLink>/
        <NavLink to='/admin/expenses'> Expenses </NavLink>/
        <span className='text-[#ffae01] font-semibold'>Income</span>
      </p>

      <Table
        columns={column}
        data={income}
        searchOptions={searchOptions}
        onSearch={handleSearch}
        handleClear={handleClear}
        onAddClick={handleAddClick}
      />
    </div>
  );
}

export default Income;