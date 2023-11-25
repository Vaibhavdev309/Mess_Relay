import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import "./Complaint.css";

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const { id } = useParams();
  const user = localStorage.getItem("usersdataid");
  const fname = localStorage.getItem("usersdatafname");
  const [selectedImg, setSelectedImg] = useState("");
  const [comment, setComment] = useState("");
  const fetchImage = () => {
    axios
      .get(`/fetchimage/${id}`)
      .then((res) => {
        console.log("The ans is ", res.data);
        setSelectedImg(res.data.image.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchImage();
  }, []);
  const doComment = (event) => {
    event.preventDefault();
    axios
      .post(`/comp/commented/${id}`, { user, comment, fname })
      .then(() => {
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`/complaintbox/${id}`);
      setComplaints(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-start align-items-center">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
            alt="avatar"
            width="60"
            height="60"
          />
          <div>
            {complaints.length > 0 && (
              <>
                <h6 className="fw-bold text-primary mb-1">
                  {complaints[0].fname}
                </h6>
                <p className="text-muted small mb-0">
                  {complaints[0].submittedon}
                </p>
              </>
            )}
          </div>
        </div>
        {complaints.length > 0 && (
          <>
            <h2 className="mt-3 mb-4 pb-2">{complaints[0].subject}</h2>
            <div className="comp">
              <p className="complaint-text mt-3 mb-4 pb-2">
                {complaints[0].complaint}
                {selectedImg && (
                  <img
                    src={`http://localhost:8009/${selectedImg}`}
                    alt=""
                    className="complaint-image"
                  />
                )}
              </p>
            </div>
          </>
        )}
        <div className="small d-flex justify-content-start">
          <a href="#!" className="d-flex align-items-center me-3">
            <i className="far fa-thumbs-up me-2"></i>
            <p className="mb-0">Like</p>
          </a>
          <a href="#!" className="d-flex align-items-center me-3">
            <i className="far fa-comment-dots me-2"></i>
            <p className="mb-0">Comment</p>
          </a>
          <a href="#!" className="d-flex align-items-center me-3">
            <i className="fas fa-share me-2"></i>
            <p className="mb-0">Share</p>
          </a>
        </div>
      </div>
      <div
        className="card-footer py-3 border-0"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="d-flex flex-start w-100">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
            alt="avatar"
            width="40"
            height="40"
          />
          <div className="form-outline w-100">
            <form onSubmit={doComment}>
              <textarea
                className="form-control"
                id="textAreaExample"
                rows="4"
                type="text"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                style={{ background: "#fff" }}
              ></textarea>
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div>
        {complaints.length > 0 && (
          <>
            {complaints[0].commentedBy.map((comment) => {
              return (
                <div>
                  <Comment
                    fname={comment.fname}
                    createdOn={comment.createdOn}
                    comment={comment.text}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Complaint;
