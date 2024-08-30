import { React } from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import Dashboard from './Dashboard'
import SuccessCard from './SuccessCard'
import AdminDasboard from './Dashboard/AdminDasboard'
import ParentsDashboard from './Dashboard/ParentsDashboard'
import StudentDashboard from './Dashboard/StudentDashboard'
import TeacherDashboard from './Dashboard/TeacherDashboard'



function App() {

  return (
    <Router>
        <div className="h-screen">
          <Routes>
            <Route path="/" element={<Registration/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/adminDashboard" element={<AdminDasboard/>}/>
            <Route path="/parentsDashboard" element={<ParentsDashboard/>}/>
            <Route path="/studentDashboard" element={<StudentDashboard/>}/>
            <Route path="/teacherdashboard" element={<TeacherDashboard/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/SuccessCard" element={<SuccessCard/>}/>
          </Routes>
        </div>
      </Router>
  )
}

export default App
