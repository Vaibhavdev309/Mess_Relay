import axios from "axios";
import { useState } from "react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateComplaint = () => {
  const [complaint, setComplaint] = useState("");
  const navigate = useNavigate();

  const ComplaintValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("/validUser", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    });
    const data = await res.json();
    if (data.status === 401 || !data) {
      navigate("*");
    } else {
      navigate("/mainpage/createcomplaint");
    }
  };
  useEffect(() => {
    ComplaintValid();
  }, []);
  const subComp = (event) => {
    const fname = localStorage.getItem("usersdatafname");
    const user = localStorage.getItem("usersdataid");
    const regno = localStorage.getItem("usersdataregno");
    event.preventDefault();
    if (complaint === "") {
      console.log("Please Enter your complaint first before submitting");
    } else {
      axios
        .post("/subComp", { complaint, user, regno, fname })
        .then(async (response) => {
          const res = response.data;
          if (res.status === 201) {
            navigate("/mainpage/createcomplaint");
            setComplaint("");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };
  return (
    <form action="">
      <input
        type="string"
        name="complaint"
        id="compalint"
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
        placeholder="Type your complaint here"
      />
      <button type="submit" onClick={subComp}>
        Submit
      </button>
    </form>
  );
};

export default CreateComplaint;
