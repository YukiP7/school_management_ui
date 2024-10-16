import React, { useEffect , useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from '../../../../Reusable_components/Button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../../hooks/UserContext';
import BASE_URL from '../../../../conf/conf';
import ProgressIndicator from './ProgressIndicator';

function HostelDets({handleNextStep}) {
  const {userId} = useUserContext()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
      const [hostels , setHostels] = useState([])
      const [hostelRoom , setHostelRoom] = useState([])

    const fetchHostelOptions = () => {
        axios({
          method: "GET",
          url: `http://localhost:8080/hostel/getHostelList`,
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        })
          .then((response) => {
            setHostels(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

      const fetchData = () => {
        axios({
          method: "GET",
          url: `http://localhost:8080/hostelRooms/getHostelRoomsList`,
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        })
          .then((response) => {
            setHostelRoom(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      };

      useEffect(() => {
        fetchHostelOptions() ;
        fetchData() ;
      } , [])

      const onSubmit = async (data) => {
        console.log(data);
        
        const userData = {
            ...data , 
            userId : userId ,
          }
          await axios({
              method:"Post",
              url : `${BASE_URL}/user/updateHostelDetails`,
              data: userData ,
              headers: {
                "Content-Type": "application/json",
              },
          
            })
            .then((response)=>{
              console.log('response' , response.data.data)
              handleNextStep(6)
              reset()
          })
          .catch(err=>{
              console.log(err,'error:')
              reset()
          })
    }
  return (
    <div>
       <ProgressIndicator currentStep={5} />
    <div className='bg-white mt-10 p-5 rounded-xl'>
        <h2 className="col-span-4 mt-8 text-xl font-semibold text-black">Hostel Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 mt-5 gap-6">
          <div className="flex flex-col px-1">
            <label htmlFor="buildingName">Building Name</label>
            <select
              id="buildingName"
              className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('buildingName')}
            >
              <option value="" hidden>Select Hostel </option>
              {hostels.map(option => (
                <option key={option.hostelId} value={option.id}>{option.hostelName}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col px-1">
            <label htmlFor="roomNumber">Room Number</label>
            <select
             type="text"
             id="roomNumber"
             placeholder=""
             className="py-1 px-3 rounded-lg bg-gray-100 border focus:outline-none"
              {...register('roomNumber')}
            >
              <option value="" hidden>Select Room </option>
              {hostelRoom.map(option => (
                <option key={option.hostelRoomId} value={option.id}>{option.hostelRoomNumber}</option>
              ))}
            </select>
          </div>

          <div className="col-span-2 flex justify-start space-x-4 mt-10">
          <Button type='submit' label="Save" className='px-8'/>
          <Button onClick={() => {
            reset() 
            navigate('/admin/allStudents')
          }} 
          label="Cancel" className='px-8 bg-[#ffae01] hover:bg-[#042954]'/>
      </div>
        </form>
    </div>
    </div>
  )
}

export default HostelDets