import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000" || import.meta.env.VITE_ADMIN_API_URL;

const Analytics = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Visits',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchVisitData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/analytics/visits`);
    
        if (!response.ok) {
          console.error(`Error: ${response.statusText} (${response.status})`);
          return;
        }
    
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          if (result.success) {
            const visits = result.data;
            const labels = visits.map(visit => visit.date);
            const visitCounts = visits.map(visit => visit.count);
   
            setData({
              labels: labels,
              datasets: [
                {
                  label: 'Visits',
                  data: visitCounts,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: true,
                },
              ],
            });
          } else {
            console.error('Error fetching visit data:', result.message);
          }
        } else {
          console.error("Expected JSON response but got", contentType);
        }
      } catch (error) {
        console.error('Error fetching visit data:', error);
      }
    };
  
    fetchVisitData();
  }, []);
  
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Website Visit Analytics',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Visits: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Visits',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          precision: 0,  // Ensure integer values on the Y-axis
        },
      },
    },
    maintainAspectRatio: false,  // Allow flexible height
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '80%', height: '80%' }}>
        <h2 style={{ textAlign: 'center' }}>Analytics</h2>
        <Line data={data} options={chartOptions} height={400} width={600} />
      </div>
    </div>
  );
};

export default Analytics;
