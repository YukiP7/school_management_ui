import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../Reusable_components/Button';

function EditSubject({ isOpen, onClose, subjectId , onSuccess }) {
  
  const [subject, setSubject] = useState({ subject: '', description: '' });
  // const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8080/subject/getSubject/${subjectId}`, // API to get specific subject by ID
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setSubject(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching subject:", error);
      });
  }, [subjectId , isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject({ ...subject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:8080/subject/createSubject/${subjectId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: subject,
    })
      .then((response) => {
        console.log("Subject updated:", response.data);
        toast.success("Subject updated successfully!")
        // navigate("/admin/subject"); 

        onSuccess() ;
        onClose() ;
      })
      .catch((error) => {
        console.error("Error updating subject:", error);
        toast.error('Failed to update subject.')
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
       <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
      
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6 text-[#042954]">Edit Subject</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={subject.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter subject name"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={subject.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter subject description"
            rows="4"
            required
          />
        </div>

          <Button 
          label={"Update Subject"}
          type='submit'
          className='w-full text-center'
          onClick={handleSubmit}/>

      </form>
      </div>
    </div>
  );
}

export default EditSubject;