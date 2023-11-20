// Import necessary dependencies
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

// Create a functional component for the pie chart
const MyPieChart = () => {
  // Set initial chart options and series data
  const [chartOptions, setChartOptions] = useState({
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  });

  const [chartSeries, setChartSeries] = useState([44, 55, 13, 43, 22]);

  // Fetch or update chart options and series data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getdata");
        const users = await axios.get("/getlength");
        const noofusers = users.data.length;
        const terms = response.data;

        const fetchedSeries = terms.map((term) => term.expense * noofusers);
        setChartSeries(fetchedSeries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once (on mount)

  // Render the chart component
  return (
    <div>
      <h2>Pie Chart Example</h2>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="pie"
        height={350}
      />
    </div>
  );
};

// Export the component
export default MyPieChart;
