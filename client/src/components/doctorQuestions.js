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
    // console.log(AddQuestion)
    // Take The Input Value ..
    const [answers, setAnswer] = useState({
        answer: '',
        question_Id: ''
    });
//
    function handleChange(e) {
        // const { name, value } = e.target;
        // console.log(e.target.value);
        setAnswer({ name: e.target.value });
        // const answer = e.target.value;
        // setAnswer({
        //     answer: e.target.value;
        // })

    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        console.log(AddQuestion.question_Id)

        dispatch(createAnswer(answers))
    }

    return (
        <div>
            <h2>Doctor Questions Page</h2>

            {AddQuestion.map((question, index) => (
                <div>
                    <ul >
                        <li>{question.question}</li>

                        <br />
                        <form onSubmit={handleSubmit}>
                            <textarea rows="4" cols="50" name={index} value={answers.answer} onChange={handleChange} />
                            <br />

                            <Button type='submit' variant="info" style={{ width: "8%" }}>Reply</Button>
                        </form><br />
                    </ul>
                </div>
            ))}

        </div>
    )
}

export default DoctorQuestions;