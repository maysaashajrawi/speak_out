import React from "react";
import { useState } from "react";
import axios from "axios";
import moment from 'moment';
import ScheduleForDoctor from "./scheduleForDoctor"
import "react-datepicker/dist/react-datepicker.css";
function CreateDoctorsSchedule() {
  const [selectedDate, setSelectedDate] = useState({
    doctorId: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (name) => (event) => {
    setSelectedDate({ ...selectedDate, [name]: event.target.value });
    console.log(selectedDate);
  };
  function handleClick(e) {
    e.preventDefault();
    console.log(selectedDate);
    axios
      .post(
        `http://localhost:5000/schedule/createSchedule/` +
          `${window.localStorage.doctorId}`,
        { selectedDate }
      )
      .then((res) => {
        console.log(res, " this is a res from post image");
      })
      .catch((err) => {
        console.log("there is an errrrrrrrooooorrrr", err);
      });
  }
  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Create Your Schedule</h2>
      <br></br>
      <br></br>
      <br></br>
      <form name="form">
        <div className="form-group">
          <label for="date">Date:</label>
          <br></br>
          <input
            type="date"
            class="form-control"
            id="date"
            value={selectedDate.date}
            selected={selectedDate}
            onChange={handleChange("date")}
            dateFormat="yyyy/MM/dd"
            min={moment().format("YYYY-MM-DD")}
          />
        </div>
        <div className="form-group">
          <label for="str">startTime:</label>
          <input
            type="time"
            class="form-control"
            id="str"
            value={selectedDate.startTime}
            onChange={handleChange("startTime")}
          />
        </div>
        <div className="form-group">
          <label for="end">End Time:</label>
          <input
            type="time"
            class="form-control"
            id="end"
            value={selectedDate.endTime}
            onChange={handleChange("endTime")}
          />
        </div>
        <button type="submit" className="btn btn-info btn-rounded mr-2 ml-2" onClick={handleClick}>
          Add to the Schedule{" "}
        </button>
      </form>

    <div>
      <ScheduleForDoctor/>      
    </div>
    </div>


  );
}
export default CreateDoctorsSchedule;