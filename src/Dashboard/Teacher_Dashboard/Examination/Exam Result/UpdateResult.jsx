import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";  // Import Axios
import Button from "../../../../Reusable_components/Button";

const UpdateResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  const [userList, setUserList] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [subjects, setSubjects] = useState('');
  const [examType, setExamType] = useState('');
  const [classNamestr, setClassNamestr] = useState('');

  const { className, selectedSubject, selectedExamType } = location.state || {};
  const teacherId = user.id;

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:8080/user/getUserList");
      const data = await response.json();

      if (data.success && data.data) {
        // Filter users based on the given conditions
        const filteredUsers = data.data.filter(
          (user) =>
            user.role === 3 &&
            user.isActive === true &&
            user.className.includes(className)
        );

        // Set the filtered user list
        setUserList(filteredUsers);
        setExamResults(
          filteredUsers.map(user => ({
            studentId: user.id,
            examMarks: "",
            remarks: ""
          }))
        );
      }
    };

    fetchUserData();
  }, [className]);

  useEffect(() => {
    fetchSubjects();
    fetchExamType()
    fetchClassName()
  }, []);

  const fetchExamType = async () => {
    try {
      const response = await axios.get("http://localhost:8080/examType/getExamTypeList");
      
      if (response.data.success) {
        const examTypeData = response.data.data;
        const ExamTyperes = examTypeData.find((type) => type.id === selectedExamType);
        const examName = ExamTyperes?.examTypeName;
        
        if (examName) {
          setExamType(examName);
        } else {
          console.error("Exam type not found for the selected exam ID.");
        }
      } else {
        console.error("Failed to fetch exam type data.");
      }
    } catch (error) {
      console.error("Error fetching exam type data:", error);
    }
  };
  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/subject/getSubjectList");
      
      if (response.data.success) {
        const subjectData = response.data.data;
        const Subjectres = subjectData.find((type) => type.id === selectedSubject);
        const SubjectName = Subjectres?.subject;
        
        if (SubjectName) {
          setSubjects(SubjectName);
        } else {
          console.error("Subject Name not found for the selected Subject ID.");
        }
      } else {
        console.error("Failed to fetch Subject data.");
      }
    } catch (error) {
      console.error("Error fetching Subject data:", error);
    }
  };
  const fetchClassName = async () => {
    try {
      const response = await axios.get("http://localhost:8080/class/getClassList");
      
      if (response.data.success) {
        const clasdata = response.data.data;
        const classres = clasdata.find((type) => type.id === className);
        const clas = classres?.name;
        
        if (clas) {
          setClassNamestr(clas);
        } else {
          console.error("Class name not found for the selected Class ID.");
        }
      } else {
        console.error("Failed to fetch Class data.");
      }
    } catch (error) {
      console.error("Error fetching Class data:", error);
    }
  };

  const handleMarksChange = (studentId, value) => {
    setExamResults((prevResults) =>
      prevResults.map((result) =>
        result.studentId === studentId
          ? { ...result, examMarks: value }
          : result
      )
    );
  };

  const handleRemarksChange = (studentId, value) => {
    setExamResults((prevResults) =>
      prevResults.map((result) =>
        result.studentId === studentId
          ? { ...result, remarks: value }
          : result
      )
    );
  };

  const handleSaveChanges = async () => {
    const saveData = {
      teacherid: teacherId, // Assuming teacherId is passed in the location state
      className: className,
      subject: selectedSubject,
      examType: selectedExamType,
      isActive: true,
      studentMarksMapping: examResults
    };

    try {
      // Use Axios to send the request
      const response = await axios.post("http://localhost:8080/exam/saveExamResult", saveData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the response
      if (response.data.success) {
        alert("Changes saved successfully!");
        navigate("/teacherDashboard/tchExamResult"); // Navigate to teacher dashboard after saving
      } else {
        alert("Error saving changes.");
      }
    } catch (error) {
      console.error("There was an error saving the exam results:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-full mb-10">
      {/* Navbar */}
      <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">Exam Result</h1>
      <p className="mt-2">
        Dashboard / <NavLink to="/teacherDashboard">Teacher Dashboard</NavLink> /{" "}
        <span className="text-[#ffae01] font-semibold">Exam Result</span>
      </p>

      {/* Dynamic Heading */}
      <h2 className="mt-6 text-xl font-semibold text-black">
        Update Marks of {classNamestr} for {subjects} in {examType}
      </h2>

      <div className="container mt-4">
        <table className="min-w-full table-auto border-collapse border border-gray-200 bg-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Exam Marks</th>
              <th className="border px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">
                  {/* Display FirstName and LastName in a single column */}
                  {user.firstName} {user.lastName}
                </td>
                <td className="border px-4 py-2">
                  {/* Exam Marks input */}
                  <input
                    type="number"
                    className="border p-1 rounded"
                    placeholder="Enter marks"
                    value={examResults.find(result => result.studentId === user.id)?.examMarks || ""}
                    onChange={(e) =>
                      handleMarksChange(user.id, e.target.value)
                    }
                  />
                </td>
                <td className="border px-4 py-2">
                  {/* Remarks input */}
                  <input
                    type="text"
                    className="border p-1 rounded"
                    placeholder="Enter remarks"
                    value={examResults.find(result => result.studentId === user.id)?.remarks || ""}
                    onChange={(e) =>
                      handleRemarksChange(user.id, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Save Changes button aligned to the right */}
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateResult;
