import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import logImage from "../../public/images/iuliu-illes-rZiVfk-tg6Y-unsplash.jpg";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function HomePage({ visitorDetails, setVisitorDetails, getLogs, data}) {
  const [currentTime, setCurrentTime] = useState("");
  const [showErrors, setShowErrors] = useState(null);
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    function updateTime() {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    }

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  // function passed into onChange in the input elements
  // Adds data of input to visitor details object
  function logInput(event) {
    setVisitorDetails({
      ...visitorDetails,
      [event.target.name]: event.target.value,
    });
  }

  // function passed to onClick in submit button
  // Adds visitor details object to visitor log array
  async function handleClick() {
    try {
        setShowErrors(null);
        setLoading(true)
        setSuccess(false)

    const token = localStorage.getItem('token');

     await axios.post("/api/visitorlogs", {
      name: visitorDetails.name,
      organisation: visitorDetails.organisation,
      nature: visitorDetails.nature,
      contact: visitorDetails.contact,
      tag: visitorDetails.tag,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

    await getLogs();

    // Resets data in input boxes to empty
    setVisitorDetails({
      name: "",
      organisation: "",
      nature: "",
      contact: "",
      time: "",
      tag: "",
    });
    setSuccess(true)

    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setShowErrors(message)
    } finally {
      setLoading(false)
    }
  
  }

  return (
    <>
      <Header data={data}/>

      <div className="page-body grid grid-rows-2 md:grid-rows-1 md:grid-cols-[300px_1fr] lg:grid-cols-[500px_1fr] pl-2 pr-2">
        <div className="left-side h-145 mb-2">
          <div className="left-side">
            <div className=" inline-block h-124 w-113 ml-8">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-primary leading-tight">
                Visitor <br />
                Registration.
              </h1>
              <p className="text-on-surface-variant text-lg max-w-md leading-relaxed mb-1">
                Welcome to The Andy-Fidel Portal. Please provide your
                identification details to facilitate a secure and seamless entry
                into our corporate facility.
              </p>
              <div>
                <img src={logImage} className="h-80 w-110 rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="right-side pt-2 pl-1 pr-1">
          <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-lg pt-3 pl-6 lg:w-230 h-135">
            <div className="name-box mt-3 ">
              <label>
                Full Name <br />
                <input
                  name="name"
                  className="border border-gray-300 lg:w-202 md:w-100 w-110 h-10 rounded-lg pl-3"
                  placeholder="Enter Your Name"
                  onChange={logInput}
                  value={visitorDetails.name}
                />
              </label>
            </div>

            <div className="company-box mt-3">
              <label>
                Company or Organisation <br />
                <input
                  name="organisation"
                  className="border border-gray-300 lg:w-202 md:w-100 w-110 h-10 rounded-lg pl-3"
                  placeholder="Which Company Are You From"
                  onChange={logInput}
                  value={visitorDetails.organisation}
                />
              </label>
            </div>

            <div className="bg-lime-400 mt-3"></div>

            <div className="nature-box mt-3">
              <label>
                Nature of Visit <br />
                <input
                  name="nature"
                  className="border border-gray-300 lg:w-202 md:w-100 w-110 h-10 rounded-lg pl-3"
                  placeholder="Nature of Visit"
                  onChange={logInput}
                  value={visitorDetails.nature}
                />
              </label>
            </div>

            <div className="contact-box mt-3">
              <label className="lg:inline-block lg:mr-2">
                Contact
                <br />
                <input
                  name="contact"
                  className="border border-gray-300 lg:w-100 md:w-100 w-110 h-10 rounded-lg pl-3"
                  placeholder="contact"
                  onChange={logInput}
                  value={visitorDetails.contact}
                />
              </label>

              <label className="lg:inline-block">
                Time In
                <br />
                <input
                  name="time"
                  className="bg-gray-200 lg:w-100 md:w-100 w-110 h-10 rounded-lg pl-3"
                  value={currentTime}
                  readOnly
                />
              </label>
            </div>

            <div className="tag-box mt-3">
              <label>
                Tag
                <br />
                <input
                  name="tag"
                  className="border border-gray-300 lg:w-202 md:w-100 w-110 h-10 rounded-lg pl-3" 
                  placeholder="Tag"
                  onChange={logInput}
                  value={visitorDetails.tag}
                  maxLength={3}
                  type="number"
                />
              </label>
            </div>

            <div className="button-box mt-3">
              <button
                className="bg-cyan-700 mt-2 h-10 text-white rounded-lg lg:w-190 md:w-100 w-110 hover:opacity-90 active:bg-cyan-800"
                onClick={handleClick}
                disabled={loading}
              >
                {loading && <LoadingSpinner />}
                {loading ? "Submitting Logs" : "Submit Logs"}
              </button>
            </div>
            <div>
              {success && <p className="text-green-600">✓ Submitted successfully</p>}
              {showErrors && <p className="text-red-600">{showErrors}</p>}
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
