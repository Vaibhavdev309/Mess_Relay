import React from "react";
import "./Comment.css";

const Comment = (props) => {
  return (
    <div>
      <div className="d-flex justify-content-center row">
        <div className="d-flex flex-column">
          <div className="coment-bottom bg-white p-2 px-4">
            <div className="commented-section mt-2">
              <div className="d-flex flex-row align-items-center commented-user">
                <h5 className="mr-2">{props.fname} </h5>
                <span className="dot mb-1"></span>
                <span className="mb-1 ml-2">{props.createdOn}</span>
              </div>
              <div className="comment-text-sm">
                <span>{props.comment}</span>
              </div>
              <div className="reply-section">
                <div className="d-flex flex-row align-items-center voting-icons">
                  <i className="fa fa-sort-up fa-2x mt-3 hit-voting"></i>
                  <i className="fa fa-sort-down fa-2x mb-3 hit-voting"></i>
                  <span className="ml-2">10</span>
                  <span className="dot ml-2"></span>
                  <h6 className="ml-2 mt-1">Reply</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
