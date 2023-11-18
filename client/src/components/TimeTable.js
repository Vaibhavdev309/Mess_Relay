// TimeTable.js
import React from "react";
import "./TimeTable.css";
import TableRow from "./TableRow";

const TimeTable = () => {
  return (
    <div className="table-container">
      <h1 className="heading">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>fal</th>
              <th>kh</th>
              <th>lh</th>
              <th>jskj</th>
            </tr>
          </thead>
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
        </table>
      </h1>
    </div>
  );
};

export default TimeTable;
