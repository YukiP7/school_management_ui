import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const ExamTypeTiles = () => {
  const [examResults, setExamResults] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch the exam data from the API
    axios
      .get("http://localhost:8080/exam/getExamResult")
      .then((response) => {
        if (response.data.success) {
          setExamResults(response.data.data);
        } else {
          console.error("Failed to fetch exam results");
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  // Handle tile click to navigate to the class data page with filtered data
  const handleTileClick = (examTypeId) => {
    const filteredExamData = examResults.filter(
      (exam) => exam.examData.examType === examTypeId
    );
    navigate("/admin/ClassNameTiles", {
      state: { examData: filteredExamData, examTypeId: examTypeId }, // Send filtered data and examTypeId
    });
    console.log(filteredExamData, 'filteredExamData');
  };

  // Get unique exam types from the fetched data
  const uniqueExamTypes = [
    ...new Set(examResults.map((exam) => exam.examData.examType)),
  ];

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {uniqueExamTypes.map((examTypeId) => {
        // Filter the data to get exam information for the current examTypeId
        const examType = examResults.filter((exam) => exam.examData.examType === examTypeId);
        const examTypeName = `Exam Type ${examTypeId}`;  // Customize this if you have names for exam types

        return (
          <div
            key={examTypeId}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
            onClick={() => handleTileClick(examTypeId)}
          >
            <h2 className="text-xl font-semibold">{examTypeName}</h2>
            <p>Total Exams: {examType.length}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ExamTypeTiles;