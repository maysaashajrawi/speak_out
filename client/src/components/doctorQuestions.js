import React, { useEffect } from 'react';
import { useState } from "react";
import { GetQuestions } from '.././actions/AddQuestion';
import { createAnswer } from '../actions/AddQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-bootstrap";

// Render All Questions With Textarea For Doctors To answer ..
// Take the value From Input Field ..

function DoctorQuestions() {

    // Get All Questions ..
        const dispatch = useDispatch();
        const AddQuestion = useSelector((state) => state.AddQuestions);
        useEffect(() => {
            dispatch(GetQuestions())
        }, [dispatch]);

    // Take The Input Value ..
        const [answers, setAnswer] = useState({
            answer: '',
            questionId: ''
        });

        function handleChange(e) {
            setAnswer({ answer : e.target.value ,
            questionId : e.target.name });
            console.log(answers, "from component"); 
        }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(AddQuestion);
        // console.log(e.target.value);
        // console.log(AddQuestion.question_Id)

        dispatch(createAnswer(answers))
        window.location = '/questions'
    }

    return (
        <div>
            <h2>Doctor Questions Page</h2>
            {AddQuestion.map((question, index) => (
                <div key ={index}>
                    
                        <h3>{question.question}</h3>
                        {/* <li>{question.questionId}</li> */}

                        <br />
                        <form onSubmit={handleSubmit}>
                            <textarea rows="3" cols="50" 
                            name={question.questionId} 
                            key={index} 
                            value={answers.answer} 
                            id={question.questionId} 
                            onChange={handleChange} />
                            <br/>

                            <Button type='submit' variant="info" style={{ width: "8%" }}>Reply</Button>
                        </form><br />
                   
                </div>
            ))}
        </div>
    )
}
export default DoctorQuestions;