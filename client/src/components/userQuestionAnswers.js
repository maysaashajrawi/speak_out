import Axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./footer";
import { FaCommentMedical } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";

const url = "http://localhost:5000";

function UserQuestionsAnswers() {
  const [questionInfo, setQuestionInfo] = useState({
    questions: [],
  });
  useEffect(() => {
    Axios.get(
      `${url}/questions/getAllQuestionsAndAnswersForOneUser/${window.localStorage.userId}`
    )
      .then((res) => {
        console.log(res.data);
        setQuestionInfo({ questions: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, [window.localStorage.userId]);
  return (
    <div>
      <div
        className="container w-100"
        style={{
          textAlign: "left",
          backgroundColor: "#E3F2FD",
          alignSelf: "center",
          width: "100%",
          height: "auto",
          borderRadius: 5,
          marginBottom: 20,
        }}
      >
        <br />
        <h2>My Questions</h2>
        <div>
          {questionInfo.questions.map((questions) => (
            <div>
              <br />
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 5,
                  backgroundColor: "white",
                  fontSize: 14,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <FaCommentDots
                  style={{ marginRight: 20, color: "#E65100" }}
                  size={25}
                />
                Question: {questions.question}
              </div>

              <div
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 5,
                  backgroundColor: "white",
                  fontSize: 14,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              ></div>
              <div
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 5,
                  backgroundColor: "white",
                  fontSize: 14,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <FaCommentMedical
                  style={{ marginRight: 20, color: "#E65100" }}
                  size={25}
                />
                Answered by Dr.{questions.doctorName} : {questions.answer}
              </div>
              <br />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserQuestionsAnswers;
