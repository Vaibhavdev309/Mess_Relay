import axios from "axios";
import { useState } from "react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateComplaint = () => {
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState("");

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
      navigate("/createcomplaint");
    }
  };
  useEffect(() => {
    console.log("i reached here");
    ComplaintValid();
  }, []);
  const subComp = (event) => {
    event.preventDefault();
    if (complaint === "") {
      console.log("Please Enter your complaint first before submitting");
    } else {
      axios
        .post("/subComp", { complaint })
        .then(async (response) => {
          const res = response.data;
          if (res.status === 201) {
            console.log("I successfully going to navigate to getcomplaint");
            navigate("/getcomplaint");
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
