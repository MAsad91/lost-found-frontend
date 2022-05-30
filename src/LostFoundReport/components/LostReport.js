import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ItemsData from "../../shared/components/ItemsData";
import { AuthContext } from "../../shared/context/auth-context";
import NoDataCard from "../../shared/components/NoDataCard";
import styles from "../../shared/Css/ReportForm.module.css";

const LostReport = () => {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState("");
  const [reportData, setReportData] = useState([]);
  const auth = useContext(AuthContext);
  const params = useParams().userId;
  console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/lost-report/`);
        console.log(0, data);
        setReportData(data);
        if (data) {
          setShow(false);
        }
      } catch (err) {
        const message = err.response.data.message;
        setMessage(message);
        console.log(message);
      }
    };
    fetchData();
  }, []);

  console.log(reportData);

  return (
    <div>
      <div className={styles.title}>
        <h1>Lost Items Reports</h1>
      </div>
      <div className={styles.actions}>
        <Link
          to={`/lost-report/${auth.userId}/reportform`}
          className={styles.button}
        >
          Add Report
        </Link>
      </div>
      <div>
        {show && <NoDataCard title="Lost Items Report" text={message} />}
        <ItemsData data={reportData} />
      </div>
    </div>
  );
};

export default LostReport;
