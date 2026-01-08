import "../chartConfig";  
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import socket from "../socket";

export default function DashB() {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);

  const loadData = async () => {
    const res = await api.get(`/surveys/${id}/results`);
    setResponses(res.data);
  };

  useEffect(() => {
    loadData();

    socket.on("refresh", (surveyId) => {
      if (surveyId === id) loadData();
    });

    return () => socket.off("refresh");
  }, [id]);

  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <h3>Total Responses: {responses.length}</h3>

     <Bar
  data={{
    labels: responses.map((_, i) => `User ${i + 1}`),
    datasets: [
      {
        label: "Responses",
        data: responses.map(() => 1),
      },
    ],
  }}
/>

    </div>
  );
}
