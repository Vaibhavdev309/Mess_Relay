import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import axios from "axios";

const ProfilePage = () => {
  const user = localStorage.getItem("usersdataid");
  const role = localStorage.getItem("usersdatarole");
  const email = localStorage.getItem("usersdataemail");
  const name = localStorage.getItem("usersdatafname");
  const regno = localStorage.getItem("usersdataregno");
  const hostel = localStorage.getItem("usersdatahostel");

  const [selectedFile, setSelectedFile] = useState(null);
  const fetchImage = () => {
    axios
      .get(`/getimage/${user}`)
      .then((res) => {
        // console.log("The ans is ", res.data);
        setSelectedFile(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchImage();
  }, []);
  const ImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("File selected:", file);
    }
  };
  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("user", user);
    console.log(formData);
    try {
      const response = await axios.post("/upload", formData);
      setSelectedFile(response.data.image);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div>
      <div class="container emp-profile">
        <form
          method="post"
          onSubmit={handleUpload}
          encType="multipart/form-data"
        >
          <div class="row">
            <div class="col-md-4">
              <div class="profile-img">
                <img src={`http://localhost:8009/${selectedFile}`} alt="" />
                <div class="file btn btn-lg btn-primary">
                  {/* Change Photo */}
                  <input type="file" name="image" onChange={ImageUpload} />
                  <button type="submit">Submit</button>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="profile-head">
                <h5>{name}</h5>
                <h6>{role}</h6>
                <p class="proile-rating">
                  RANKINGS : <span>8/10</span>
                </p>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-2">
              <input
                type="submit"
                class="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="profile-work">
                <p>WORK LINK</p>
                <a href="">Website Link</a>
                <br />
                <a href="">Bootsnipp Profile</a>
                <br />
                <a href="">Bootply Profile</a>
                <p>SKILLS</p>
                <a href="">Web Designer</a>
                <br />
                <a href="">Web Developer</a>
                <br />
                <a href="">WordPress</a>
                <br />
                <a href="">WooCommerce</a>
                <br />
                <a href="">PHP, .Net</a>
                <br />
              </div>
            </div>
            <div class="col-md-8">
              <div class="tab-content profile-tab" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div class="row">
                    <div class="col-md-6">
                      <label>Registration No.</label>
                    </div>
                    <div class="col-md-6">
                      <p>{regno}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Name</label>
                    </div>
                    <div class="col-md-6">
                      <p>{name}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Email</label>
                    </div>
                    <div class="col-md-6">
                      <p>{email}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Hostel</label>
                    </div>
                    <div class="col-md-6">
                      <p>{hostel}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div class="col-md-6">
                      <p>{role}</p>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div class="row">
                    <div class="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div class="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div class="col-md-6">
                      <p>10$/hr</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div class="col-md-6">
                      <p>230</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>English Level</label>
                    </div>
                    <div class="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div class="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <label>Your Bio</label>
                      <br />
                      <p>Your detail description</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
