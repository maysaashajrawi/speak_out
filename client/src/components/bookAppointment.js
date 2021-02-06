import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { bookAppointment } from "../actions/Appointment";
import moment from 'moment';

const url = "http://localhost:5000";
function BookAppointment(props, { currentId, setCurrrentId }) {
  // console.log(props.match.params,"props is ")
var i = 0;
  // var id;
  currentId = props.match.params.id;
  // const date = props.match.params.date
  const dispatch = useDispatch();
  const [schedules, setSchedule] = useState({
    schedule: [],
  });
  

  const [appointmentInfo, setAppointment] = useState({
    date: "",
    startTime: "",
  });

  // setAppointment(user_Id => ({ ...user_Id,["user_Id"] :window.localStorage.userId}))
  // setAppointment(doctor_Id => ({ ...doctor_Id,["doctor_Id"] :currentId}))

  function handleSchedule(e) {
    const { name, value } = e.target;
    setAppointment((date) => ({ ...date, [name]: value }));
    // dispatch(getScheduleForUser(currentId))
    const date = e.target.value;
    console.log(date);
    axios
      .get(`${url}/schedule/getScheduleForUser/${currentId}/${date}`)
      .then((res) => {
        setSchedule({ schedule: res.data });
        console.log(res.data);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    // appointmentInfo.doctor_Id = currentId;
    // appointmentInfo.user_Id = window.localStorage.userId
    setAppointment((appointmentInfo) => ({
      ...appointmentInfo,
      [name]: value,
    }));
    
    // var index = e.target.key;
    // var x = document.getElementById("myAnchor").getAttribute("data-id");
    
    // var optionElement = e.target.childNodes[index]
    // var option =  optionElement.setAttribute('disabled', true);
    // console.log("index",x, "optionnnnnnnnnnnnnn")
    // console.log(appointmentInfo.startTime,"hhhhhhhhhhhh")
  }

  function handleSubmit(e) {
    // e.preventDefault();
    const userId = window.localStorage.userId;
    console.log(userId);
    dispatch(bookAppointment(currentId, userId, appointmentInfo));
    var option = document.getElementsByTagName("option")[i];
    var id = option.id
    setTimeout(axios.post(`http://localhost:5000/schedule/updateDisable/${id}`)
    .then(res =>{
          console.log(res,"modified")
    }), 4000);
    
     
  
  
    window.location = `/appointmentList/${window.localStorage.userId}`;
   
    // console.log("dattttttttttttttttt",data)
    // var option = document.getElementsByTagName("option");
    // var id = option.getAttribute('data-id');

    // console.log( "id is:" , id)

    //  var element =document.getElementById("appointment");
    //  var key = element.options[element.selectedIndex].value
    //  console.log(key,"keyyyyyyyyyy")
    //  element.setAttribute("disabled", true);
    //  document.getElementById('#'+i).option[i].disabled = true;
    // `<Redirect to={{ pathname: '/appointmentList/'+${window.localStorage.userId}, state: { from: ${props.location } }}/>`
  }


  return (
    <div>
      <div  className="container w-50 p-3 mt-5"
        style={{
          backgroundColor: "#E3F2FD",
          borderRadius: "20px",
          height: "250px",
        }} >

        <h2 className="text-center">Book a Video Session</h2>
        <form name ="form" style={{ paddingRight: 4, paddingLeft: 4, paddingTop: 15 }}>
        <div className="form-group row">
          <label for="example-date-input" className="col-3 col-form-label">
            Date:
          </label>
          <div class="col-9">
            <input
              
              className="form-control"
              type="date"
              name="date"
              value={appointmentInfo.date}
              id="example-date-input"
              onChange={handleSchedule}
              min={moment().format("YYYY-MM-DD")}
              required
            />
          </div>
        </div>

        <div className="form-group row style={{ paddingRight: 4, paddingLeft: 4, paddingTop: 15 }}">
          <label className="col-3 col-form-label">Appointment Time: </label>
          <div className="col-9">
            
            <select
              id = "appointment"
              className="form-control"
              // value={schedules.schedule.startAt}
              value={appointmentInfo.startTime}
              onChange={handleChange}
              // onClick ={handleDisable}
              name="startTime"
              required
            >

              <option value="" disabled> - Select - </option>
              {schedules.schedule.map(function (schedule) {
                  var sch = schedule.startAt +' - '+ schedule.endAt;
                // console.log(schedule.scheduleId)  
                return (

                  <option  key={i += 1} value={sch} data-id={schedule.scheduleId} id = {schedule.scheduleId}>
                     {/* <a  data-id={schedule.scheduleId} href="#" onclick="goDoSomething(this);"> */}
                  
               {/* </a> */}
               {schedule.startAt} -  {schedule.endAt}
                    
                  </option>
                );
            
              })}
            </select>
          </div>
        </div>

              <div className="form-group" 
               style={{ textAlign: "center", marginTop: 30, marginBottom: 30 }}>
          <button className="btn btn-primary"  onClick = {() => { handleSubmit() }}>book Appointement</button>
        </div>
        </form>
       </div>

      </div>
    
        
  );
}
export default BookAppointment;