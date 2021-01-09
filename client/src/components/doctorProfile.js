import { React, useState, useEffect } from "react";
import axios from "axios";
import Footer from "./footer";
import { Link } from "react-router-dom";
import { storage } from "../firebase";
import { Badge } from "react-bootstrap";

const DoctorProfile = (props) => {
  const [doctorProfile, setDoctorProfile] = useState({});
  const [image, setImage] = useState(null);
  // eslint-disable-next-line
  const [firstUrl, setUrl] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/doctor/getOneDoctor/` +
          `${window.localStorage.doctorId}`
      )
      .then((res) => {
        console.log(res.data[0], " kkkkkkkkkkkkkkkkkkkkk");
        setDoctorProfile({
          doctorName: res.data[0].doctorName,
          doctorSpeciality: res.data[0].doctorSpeciality,
          bio: res.data[0].bio,
          email: res.data[0].email,
          password: res.data[0].password,
          imgURL: res.data[0].image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, [window.localStorage.doctorId]);

  function onChangeimg(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else console.log("error in onchangeimg");
  }

  function handleUpload(e) {
    e.preventDefault();
    console.log("imageeeeeeeee", image);

    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error, "error");
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((firstUrl) => {
            setUrl(firstUrl);
            // console.log(firstUrl, " fiiiiiiiiiiiiiiiiiiiiiiiirts")
            axios
              .post(
                "http://localhost:5000/doctor/postOneDoctorImage/" +
                  `${window.localStorage.doctorId}`,
                { firstUrl }
              )
              .then((res) => {
                console.log(res.config.data, " this is a res from post image");
                window.location =
                  "http://localhost:3000/doctorProfile/" +
                  `${window.localStorage.doctorId}`;
              })
              .catch((err) => {
                console.log("there is an errrrrrrrooooorrrr", err);
              });
          });
      }
    );
  }

  return (
    <div>
      <div
        className="container w-100"
        style={{
          textAlign: "left",
          backgroundColor: "#E3F2FD",
          alignSelf: "center",
          width: "100%",
        }}
      >
        <div>
          <table className="row w-100">
            {/* image div */}
            <div className="col">
              <br />
              <h2>
                {" "}
                DR. {doctorProfile.doctorName} <br />
                <Badge
                  pill
                  variant="secondary"
                  style={{ marginTop: 20, backgroundColor: "#E65100" }}
                >
                  {doctorProfile.email}
                </Badge>
                <br />
              </h2>
              {/* <span class="badge bg-primary">{doctorProfile.email}</span> */}

              <img
                alt="not found"
                className="rounded-circle z-depth-2"
                style={{
                  width: 200,
                  height: 200,
                  marginBottom: 4,
                  marginTop: 4,
                  marginRight: 4,
                  marginLeft: 4,
                }}
                src={
                  doctorProfile.imgURL || "http://via.placeholder.com/200x200"
                }
              />
              <br />
              <br />

              <h4>{doctorProfile.doctorSpeciality}</h4>
              <p
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginLeft: 5,
                  marginRight: 5,
                  marginBottom: 5,
                  height: "auto",
                  fontSize: 14,

                  paddingRight: 15,
                  paddingLeft: 15,
                  paddingTop: 15,
                  paddingBottom: 15,
                }}
              >
                {doctorProfile.bio}
              </p>

              <div
                style={{
                  marginLeft: 10,
                  alignItems: "center",
                  paddingRight: 15,
                  paddingLeft: 15,
                  paddingTop: 15,
                  paddingBottom: 15,
                }}
              >
                <input
                  className="btn btn-info"
                  type="file"
                  onChange={onChangeimg}
                />

                <button className="btn btn-info" onClick={handleUpload}>
                  Upload
                </button>

                <Link
                  to={`/updateDoctor/${window.localStorage.doctorId}`}
                  className="btn btn-info "
                  style={{ marginLeft: "5px" }}
                >
                  Edit Profile
                </Link>
              </div>

              {/* <p className="lead">{doctorProfile.bio}</p> */}
            </div>
          </table>
        </div>
      </div>

      {/* footer div */}
      <br />

      <Footer />
    </div>
  );
};

export default DoctorProfile;
