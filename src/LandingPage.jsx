import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Reusable_components/Layout';
// import loginImg from './assets/Login.png';
import { CutEyeIcon } from './assets/Icons/CutEyeIcon';
import { EyeIcon } from './assets/Icons/EyeIcon';
import { useForm } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import Button from './Reusable_components/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

function LandingPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleRole = (id) => {
    axios({
      method: 'GET',
      url: `http://localhost:8080/role/getRole/${id}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      let roleID = res.data.data.id;
      let roleName = res.data.data.name;
      console.log(roleName)
      switch (roleName) {
        case 'Teacher':
          navigate('/teacherDashboard');
          break;
        case 'Student' :
          navigate('/studentDashboard');
          break;
        case 'Parents':
          navigate('/parentsDashboard');
          break;
        case 'Admin':
          navigate('/admin');
          break;
        case 'Guest' :
          navigate('/guestDashboard');
          break;
        default:
          navigate('/guestDashboard');
      }
    })
    .catch((err) => {
      toast.error('Role fetching error');
      console.log(err)
    });
  };

  const onSubmit = (data) => {
    axios({
      method: 'post',
      url: `http://localhost:8080/user/login`,
      data: {
        userName: data.userId,
        password: data.password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      let roleID = res.data.data.role;
      sessionStorage.setItem('username', res.data.data.userId);
      sessionStorage.setItem('role', res.data.data.role);
      sessionStorage.setItem('user', JSON.stringify(res.data.data));
      toast.success('Successfully Logged In');

      handleRole(roleID); // Pass the role ID to handleRole
    })
    .catch((err) => {
      toast.error('Runtime error');
    });
  };


  return (
    <Layout>
      <div >
        <div className="bg-white  rounded-lg shadow-2xl w-48 overflow-hidden  ">
          {/* Image Section */}
          {/* <div className="w-1/2 hidden md:block">
            <img src={loginImg} alt="Login" className="h-full object-cover" />
          </div> */}

          {/* Login form */}
          <div className=" bg-white rounded-md absolute right-5 top-5 px-5 py-2  flex flex-col justify-center items-center">
            {/* <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Welcome Back</h1> */}
            <p className="text-sm text-gray-500 mb-4">Please login to your account</p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              {/* Email Input */}
              <div className="mb-2">
                {/* <label htmlFor="userId" className="block text-sm text-gray-600 font-medium mb-2">
                  User ID
                </label> */}
                <Input
                  type="text"
                  id="userId"
                  placeholder='Enter User ID'
                  {...register('userId', { required: 'UserId is required' })}
                  className={`w-full border-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.userId ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>}
              </div>

              {/* Password Input */}
              <div className="mb-4">
                {/* <label htmlFor="password" className="block text-gray-600 font-medium mb-2 text-sm">
                  Password
                </label> */}
                <Input
                  id="password"
                  placeholder='Enter Password'
                  {...register('password', { required: 'Password is required' })}
                  className={`w-full border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? <CutEyeIcon /> : <EyeIcon />}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div className="w-full">
                <Button label="Login" type="submit" className="w-full" />
              </div>
            </form>

            <p className="text-sm text-gray-500 mt-4">
              {/* Don't have an account? <Button type= '' label="Create Account" className="bg-green-500  hover:bg-green-600 " onClick={handleClick}/> */}
              <Link to={'/registration'}>Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LandingPage;
