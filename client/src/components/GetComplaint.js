import React, { useState, useEffect } from "react";
import axios from "axios";

const GetComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    axios
      .get("/showComplaints")
      .then((complaints) => setComplaints(complaints.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {complaints.map((complaint) => {
        return <p key={complaint._id}>{complaint.complaint}</p>;
      })}
    </div>
  );
};

export default GetComplaint;
