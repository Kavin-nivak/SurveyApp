import "../chartConfig";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import api from "../api/axios";
import { useParams } from "react-router-dom";
 
export default function DashB() {
  const { id } = useParams();
   const [responses, setResponses] = useState([]);
  useEffect(() => {
    api.get(`/surveys/${id}/results`).then((res) => {
      setResponses(res.data);
    });
  }, [id]);

  //COUNT OPTIONS
  const optionCounts = {};
  responses.forEach((res) => {
    res.answers.forEach((ans) => {
      optionCounts[ans] = (optionCounts[ans] || 0) + 1;
    });
  });

  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <h3>Total Responses: {responses.length}</h3>

      <Bar
        data={{
          labels: Object.keys(optionCounts),
          datasets: [
            {
              label: "Option Selection Count",
              data: Object.values(optionCounts)
            }
          ]
        }}
      />
    </div>
  );
}
