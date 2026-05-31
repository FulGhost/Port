import axios from "axios";
import { useState } from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { VisitorPage } from "./pages/VisitorPage";
import { LandingPage } from "./pages/LandingPage";
import "./App.css";

export function App() {
  //Empty object that saves visitor details
  const [visitorDetails, setVisitorDetails] = useState({
    name: "",
    organisation: "",
    nature: "",
    contact: "",
    time: "",
    tag: "",
  });

  //empty array that saves visitor details object
  const [visitorLogs, setVisitorLogs] = useState([]);

  const getLogs = async (date) => {
    const response = await axios.get("/api/visitorlogs", {
    params: date ? { date } : {},
  });
    setVisitorLogs(response.data);
  };

  // useEffect(() => {
  //     // eslint-disable-next-line react-hooks/set-state-in-effect
  //   getLogs();
  // }, []);

  //states lifted up from homepage to app and passes as a property
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <HomePage
              visitorDetails={visitorDetails}
              setVisitorDetails={setVisitorDetails}
              visitorLogs={visitorLogs}
              setVisitorLogs={setVisitorLogs}
              getLogs={getLogs}
            />
          }
        />
        <Route
          path="visitor"
          element={
            <VisitorPage
              visitorDetails={visitorDetails}
              setVisitorDetails={setVisitorDetails}
              visitorLogs={visitorLogs}
              setVisitorLogs={setVisitorLogs}
              getLogs={getLogs}
            />
          }
        />
        <Route path="landingpage" element={<LandingPage />}/>
      </Routes>
    </>
  );
}

export default App;
