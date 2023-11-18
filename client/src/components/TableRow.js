import React from "react";

const TableRow = (props) => {
  return (
    <tbody>
      <tr>
        <td data-label="Day">{props.day}</td>
        <td data-label="Breakfast">{props.breakfast}</td>
        <td data-label="Lunch">{props.lunch}</td>
        <td data-label="Snacks">{props.snacks}</td>
        <td data-label="Dinner">{props.dinner}</td>
      </tr>
    </tbody>
  );
};

export default TableRow;
