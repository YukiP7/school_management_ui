import React from 'react';
import {Outlet } from 'react-router-dom';
import Layout from '../../Reusable_components/Layout';
import HeaderBar from '../../Reusable_components/HeaderBar';
import StdSidebar from '../../Reusable_components/Sidebars/StdSidebar';

function StudentDashboard() {
  return (
    <Layout>
    <div className='flex gap-10'>
      {/* Sidebar */}
      <div className=" w-1/3 text-white flex flex-col sm:w-1/5 ">
       <StdSidebar/>
     </div>

     {/* Main content */}
     <div className='w-full mr-10'>
      <HeaderBar/>
       <Outlet />
     </div>
    </div>
   </Layout>
  )
}

export default StudentDashboard