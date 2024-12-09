import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../../../Reusable_components/Button";
import Table from "../../../../Reusable_components/Table";
import edit from '../../../../assets/edit.png';
import EditablePopup from "./EditablePopup";


const UpdateResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const teacherData = JSON.parse(sessionStorage.getItem("teacherData"));
  
    const [userList, setUserList] = useState([]);
    const [examResults, setExamResults] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classNamestr, setClassNamestr] = useState([]);
    const [examTypeName, setExamTypeName] = useState([]);
    const [studentName, setStudentName] = useState([]);
    const [initialExamResults, setInitialExamResults] = useState([]);

  
    const { className = "Unknown", examType = "Unknown" } = location.state || {};
    const teacherId = user.id;
  
    const subjectId = teacherData?.classSubjectEntity?.find(
      (entry) => entry.classId == className
    )?.subjectId;
  
    useEffect(() => {
      const fetchUserData = async () => {
        const response = await fetch("http://localhost:8080/user/getUserList");
        const data = await response.json();
  
        if (data.success && data.data) {
          const filteredUsers = data.data.filter(
            (user) =>
              user.role === 3 &&
              user.isActive === true &&
              user.className == className
          );
  
          setUserList(filteredUsers);
  
          const defaultExamResults = filteredUsers.map((user) => ({
            studentId: user.id,
            examMarks: "",
            remarks: "",
          }));
          setExamResults(defaultExamResults);
          setInitialExamResults(defaultExamResults); // Store the initial state

  
          // Fetch and populate exam results
          fetchExamResults(defaultExamResults);
        }
      };
  
      fetchUserData();
    }, [className]);
  
    const fetchExamResults = async (defaultExamResults) => {
      try {
        const response = await axios.get(
          "http://localhost:8080/exam/getExamResult"
        );
  
        if (response.data.success) {
          const fetchedResults = response.data.data;
  
          // Map fetched results to default results
          const updatedResults = defaultExamResults.map((result) => {
            const matchedResult = fetchedResults.find(
              (exam) =>
                exam.studentId == result.studentId &&
                exam.examData.teacherId == teacherId &&
                exam.examData.className == className &&
                exam.examData.subjectId == subjectId &&
                exam.examData.examType == parseInt(examType)
            );
            return matchedResult
              ? {
                  ...result,
                  examMarks: matchedResult.examMarks || "",
                  remarks: matchedResult.remarks || "",
                }
              : result;
          });
  
          setExamResults(updatedResults);
          setInitialExamResults(updatedResults); // Update the initial state

        }
      } catch (error) {
        console.error("Error fetching exam results:", error);
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
        teacherid: teacherId,
        className: className,
        subject: subjectId,
        examType,
        isActive: true,
        studentMarksMapping: examResults,
      };
  
      try {
        const response = await axios.post(
          "http://localhost:8080/exam/saveExamResult",
          saveData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.data.success) {
          alert("Changes saved successfully!");
          navigate("/teacherDashboard/tchExamResult");
        } else {
          alert("Error saving changes.");
        }
      } catch (error) {
        console.error("There was an error saving the exam results:", error);
        alert("An error occurred. Please try again.");
      }
    };
  
    const isSubmitButtonVisible = initialExamResults.every(
        (result) => result.examMarks === "" && result.remarks === ""
      );

      const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [selectedResult, setSelectedResult] = useState(null);
    
      const handleEditClick = (result) => {
        setSelectedResult(result);
        setIsPopupOpen(true);
      };
    
      const handleSaveChangesInPopup = (id, marks, remarks) => {
        setExamResults((prevResults) =>
          prevResults.map((result) =>
            result.studentId === id
              ? { ...result, examMarks: marks, remarks: remarks }
              : result
          )
        );
      };
  
    const column = [
      {
        name: "SR.No",
        selector: (row, idx) => idx + 1,
        sortable: false,
      },
      {
        name: "Student ",
        selector: (row) => getStudentNameById(row.studentId),
        sortable: true,
        wrap: true,
      },
      {
        name: "Exam Marks",
        cell: (row) => (
          <input
            type="number"
            className="border p-1 rounded  text-center"
            placeholder="Enter marks"
            value={row.examMarks || ""}
            onChange={(e) => handleMarksChange(row.studentId, e.target.value)}
          />
        ),
        sortable: true,
        wrap: true,
      },
      {
        name: "Remarks",
        cell: (row) => (
          <input
            type="text"
            className="border p-1 rounded  text-center"
            placeholder="Enter remarks"
            value={row.remarks || ""}
            onChange={(e) => handleRemarksChange(row.studentId, e.target.value)}
          />
        ),
        sortable: true,
        wrap: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <button onClick={() => handleEditClick(row)}>
            <img src={edit} alt="Edit" className="h-8" />
          </button>
        ),
      },
    ];

    const fetchExamType = async () => {
        try {
          const response = await axios.get("http://localhost:8080/examType/getExamTypeList");
    
          if (response.data.success) {
            const examTypeData = response.data.data;
            const ExamTyperes = examTypeData.find((type) => type.id == examType);
            const examName = ExamTyperes?.examTypeName;
            console.log(examName, 'examName');
    
            if (examName) {
                setExamTypeName(examName);
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
    
      // Fetch Class List from the server
      const fetchClassName = async () => {
        try {
          const response = await axios.get("http://localhost:8080/class/getClassList");
    
          if (response.data.success) {
            const clasdata = response.data.data;
            setClassNamestr(clasdata);
          }
        } catch (error) {
          console.error("Error fetching class data:", error);
        }
      };
      const fetchStudentName = async () => {
        try {
          const response = await axios.get("http://localhost:8080/user/getUserList");
    
          if (response.data.success) {
            const std = response.data.data;
            setStudentName(std);
          }
        } catch (error) {
          console.error("Error fetching User data:", error);
        }
      };
      const fetchSubjectName = async () => {
        try {
          const response = await axios.get("http://localhost:8080/subject/getSubjectList");
    
          if (response.data.success) {
            const sub = response.data.data;
            setSubjects(sub);
          }
        } catch (error) {
          console.error("Error fetching Subject data:", error);
        }
      };

      useEffect(() => {
        fetchExamType();
        fetchClassName();
        fetchStudentName()
        fetchSubjectName()
      }, [examType]); 

      const getclassNameById = (id) => {
        const cls = classNamestr.find((type) => type.id == id);
        return cls ? cls.name : "Unknown";
      };
      const getStudentNameById = (id) => {
        const std = studentName.find((type) => type.id == id);
        return std ? std.firstName : "Unknown";
      };
      console.log(examTypeName,'examTypeName')
      const getSubjectNameById = (id) => {
        const sub = subjects.find((type) => type.id == id);
        return sub ? sub.subject : "Unknown";
      };
  
    return (
      <div className="h-full mb-10">
        
        <h1 className="text-lg md:text-2xl pt-8 font-semibold text-black">
          Add Exam Result
        </h1>
      <p className="mt-2">

        <NavLink to="/teacherDashboard"> Dashboard </NavLink> /
        <NavLink to="/teacherdashboard/tchExamResult"> Exam Result </NavLink>/
        <NavLink to="/teacherDashboard/ExamClasses"> Class List </NavLink> /
        <span className="text-[#ffae01] font-semibold"> Add Exam Result</span>
      </p>

      <h2 className="mt-6 text-xl font-semibold text-black">
        Update Marks of Class {getclassNameById(className)} for {getSubjectNameById(subjectId)}   in {examTypeName}
      </h2>

  
        <Table columns={column} data={examResults} />
        {isPopupOpen && selectedResult && (
        <EditablePopup
          examResultId={selectedResult.studentId}
          marks={selectedResult.examMarks}
          remarks={selectedResult.remarks}
          onSave={handleSaveChangesInPopup}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
  
        {isSubmitButtonVisible && (
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  export default UpdateResult;
  