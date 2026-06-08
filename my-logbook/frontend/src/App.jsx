import axios from "axios";
import { useState } from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { VisitorPage } from "./pages/VisitorPage";
import { LandingPage } from "./pages/LandingPage";
import { ResetPassword } from "./pages/ResetPasswordPage";
import { QrCode } from "./pages/QrCode";
import { VisitorScan } from "./pages/VisitorScan";
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

  const [organisationDetails, setOrganisationDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  //empty array that saves visitor details object
  const [visitorLogs, setVisitorLogs] = useState([]);

  //state that gets the stored token
  const [token, setToken] = useState(localStorage.getItem("token"));

  // sate that gets data from auth response
    const [data, setData] = useState({username: localStorage.getItem("username") || ""})


  const getLogs = async (date) => {
    const response = await axios.get("/api/visitorlogs", {
      params: date ? { date } : {},
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    setVisitorLogs(response.data);
  };

  const [organisationId, setOrganisationId] = useState(localStorage.getItem("organisationId") || null)

  // useEffect(() => {
  //     // eslint-disable-next-line react-hooks/set-state-in-effect
  //   getLogs();
  // }, []);

  if (!token) {
    return (
      <>
        <Routes>
          <Route
            path="resetpassword/:resetToken"
            element={
              <ResetPassword/>
            }
          />
          <Route 
          path="scan/:organisationId"
           element={<VisitorScan/>}
           />
          <Route
            path="*"
            element={
              <LandingPage
                organisationDetails={organisationDetails}
                setOrganisationDetails={setOrganisationDetails}
                setData={setData}
                onLogin={(token) => {
                  localStorage.setItem("token", token);
                  setToken(token);
                }}
                setorganisationId={setOrganisationId}
              />
            }
          />
        </Routes>
      </>
    );
  }
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
              data={data}
              onLogout={() => {
                localStorage.removeItem("token")
                localStorage.removeItem("username")
                localStorage.removeItem("organisationId")
                setToken(null)
                window.location.reload()
              }}
            />
          }
        />
        <Route
          path="visitorlog"
          element={
            <VisitorPage
              visitorDetails={visitorDetails}
              setVisitorDetails={setVisitorDetails}
              visitorLogs={visitorLogs}
              setVisitorLogs={setVisitorLogs}
              getLogs={getLogs}
              data={data}
              onLogout={() => {
                localStorage.removeItem("token")
                localStorage.removeItem("username")
                localStorage.removeItem("organisationId")
                setToken(null)
                window.location.reload()
              }}
            />
          }
        />
        <Route path="/qr-code-generator" element={<QrCode organisationId={organisationId}/>}/>
      </Routes>
    </>
  );
}
//states lifted up from homepage to app and passes as a property

export default App;
