import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./footer";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TiVideo } from "react-icons/ti";

const Doctors = (props) => {
  // const [currentId, setCurrrentId] = useState(null);
  const [doctors, setDoctor] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/doctor/getAllDoctors")
      .then((res) => {
        // console.log("HIIIIIII");
        setDoctor(res.data);
      })
      .catch((err) => {
        alert("Error fetching doctors List!");
      });
  });

  return (
    <div
      className="container w-100"
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      {/* main container start */}
      <div
        className="container w-100"
        style={{
          textAlign: "left",
          backgroundColor: "beige",
          alignSelf: "center",
          width: "100%",
        }}
      >
        {doctors.map((doctor, index) => (
          <div
            className="row"
            key={doctor.doctorId}
            style={{ borderBottom: "1px solid silver" }}
          >
            <div className="col pt-3 pb-2">
              <div className="row">
                <div className="col-md-10">
                  {/* Doctor name container */}
                  <h3> {doctor.doctorName}</h3>
                  {/* <h6>{doctor.doctorId}</h6> */}
                  <h4> Doctor Speciality: {doctor.doctorSpeciality}</h4>
                  <p
                    className="lead mt-4 mb-5"
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                      width: 900,
                      height: "auto",
                      fontSize: 14,
                      borderWidth: 1,
                      borderColor: "blue",
                      alignItems: "center",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    {doctor.bio}
                  </p>
                  <p>
                    {/* <h4 className="badge">  </h4> */}
                    {/* <span className="badge">{doctor.password} </span> */}
                  </p>
                  <h5>
                    <Badge pill variant="secondary">
                      {doctor.email}
                    </Badge>
                  </h5>
                  <Link
                    //'/updateDoctor/:id'
                    to={`/bookAppointment/${doctor.doctorId}`}
                    className="btn btn-danger "
                    style={{
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.2)",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "auto",
                      height: 23,
                      backgroundColor: "blue",
                      borderRadius: 30,
                    }}
                  >
                    {" "}
                    Book A Session
                  </Link>{" "}
                  <TiVideo size={30} />
                    <div>
                  <Link
                    //'/updateDoctor/:id'
                    to={`/rateDoctor/${doctor.doctorId}`}
                    className="btn btn-danger "
                    style={{
                      borderWidth: 1,
                      borderColor: "rgba(0,0,0,0.2)",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "auto",
                      height: 23,
                      backgroundColor: "blue",
                      borderRadius: 30,
                    }}
                  >
                    {" "}
                    Rate Doctor
                  </Link>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <br></br>
        <br></br>
      </div>

      {/* footer div */}
      <div
        className="container w-100 mt-5 mb-5"
        style={{
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Footer />
      </div>
      {/* footer div ends*/}
      {/* main container end */}
    </div>
  );
};

export default Doctors;
