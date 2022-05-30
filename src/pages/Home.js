import React, { useState, useEffect } from "react";
import StatsCard from "../shared/components/StatsCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const Home = () => {
  
  
  const [lostItemReport, setLostItemReport] = useState();
  const [foundItemReport, setFoundItemReport] = useState();
  const params = useParams().userId;
  useEffect(() => {
    const fetchReportCount = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5000/home/'
        );
        setLostItemReport(data.lostItemsReportCount);
        setFoundItemReport(data.foundItemsReportCount);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchReportCount();
  }, []);

  console.log( lostItemReport, foundItemReport);

  return (
    <React.Fragment>
      
      <StatsCard
        lostCount={lostItemReport}
        foundCount={foundItemReport}
      />
    </React.Fragment>
  );
};

export default Home;
