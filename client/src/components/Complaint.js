import React from "react";
import { useState } from "react";

const Complaint = () => {
  return (
    <input
      type="number"
      name="regNo"
      id="regNo"
      value={regNo}
      onChange={(e) => setRegNo(e.target.value)}
      placeholder="Enter your Registration Number"
    />
  );
};

export default Complaint;
