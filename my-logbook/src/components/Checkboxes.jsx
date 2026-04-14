import { useState } from "react";

export function CheckBoxes({visitorLogs}) {
  const [isSignedOut, setIsSignedOut] = useState(false);

  const filtered = visitorLogs.filter((visitorlog) => {

  })

  function handleSignedIn() {
    setIsSignedOut(!isSignedOut);
    console.log("i worked");
  }

  const [inBuilding, setInBuilding] = useState(false);

  function handleInBuilding() {
    setInBuilding(!inBuilding)
    console.log('kpoyeke');
  }

  return (
    <>
      <label className="block ml-5 mb-5">
        <input type="checkbox"
         checked={isSignedOut} 
         onChange={handleSignedIn} />
        Signed In
      </label>

      <label className="block ml-5">
        <input
         type="checkbox"
         checked={inBuilding}
         onChange={handleInBuilding}
         />
        In Building
      </label>
    </>
  );
}
