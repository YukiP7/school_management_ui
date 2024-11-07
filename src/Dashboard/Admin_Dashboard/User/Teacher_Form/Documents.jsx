import React , {useState} from 'react'
import ToggleButton from '../../../../Reusable_components/ToggleButton';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer , toast } from 'react-toastify';
import axios from 'axios';
import BASE_URL from '../../../../conf/conf';

function Documents({ handlePrevious , currentStep , selectedRole , userId}) {

  const {
    register,
    control ,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [toggleValue, setToggleValue] = useState(true);
  const navigate = useNavigate()

  const onSubmit = (data) => {
    axios({
      method: "post",
      url: `${BASE_URL}/user/updateUser`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { 
        id: userId ,
        isActive : data.active = toggleValue  
      }
    })
    .then((response) => {
      toast.success("User Updated Successfully !")
      navigate('/admin/activeUser')
    })
    .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className='space-y-2 mb-5'>
    <h3 className=" font-semibold text-gray-900 text-xl">Upload Documents</h3>
    <div className='grid grid-cols-2 gap-5'>
    <div className="flex flex-col  mb-5">
      <label htmlFor="resume">Resume </label>
      <input
        type="file"
        id="resume"
        className={`py-2 px-2 rounded-lg border ${errors.aadhar ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
        {...register('resume', /*{ required: 'Resume is required' }*/)}
      />
      {errors.resume && <span className="text-red-500 text-sm">{errors.resume.message}</span>}
    </div>

    <div className="flex flex-col  mb-5">
      <label htmlFor="photo">Upload Photo</label>
      <input
        type="file"
        id="photo"
        className={`py-2 px-2 rounded-lg border ${errors.pan ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
        {...register('photo',  /*{ required: 'Photo is required' }*/)}
      />
      {errors.pan && <span className="text-red-500 text-sm">{errors.pan.message}</span>}
    </div>
    </div>

    <div className="mb-2">
      <label className="mb-2" htmlFor="active">Status</label>
      <ToggleButton
        isOn={toggleValue}
        handleToggle={() => setToggleValue(!toggleValue)}
        id="active"
      />
    </div>

    <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="disabled:text-white text-gray-600"
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-1'/>
          Back
        </button>

        <div className="col-span-2 flex justify-end space-x-4 mt-5">
        <button
          onClick={handleSubmit(onSubmit)}
          hidden={selectedRole != 4}
          className="hover:bg-[#ffae01] bg-[#042954] text-white px-4 py-2 rounded-lg"
        >
          Save & Continue 
        </button>
            <Button onClick={() => { 
                navigate('/admin/pendingUser')
            }} 
            label="Cancel" className='px-6 bg-[#ffae01] hover:bg-[#042954]'/>
        </div>
      </div>

      <ToastContainer/>
  </div>
  )
}

export default Documents