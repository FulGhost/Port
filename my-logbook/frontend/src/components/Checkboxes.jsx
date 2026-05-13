export function CheckBoxes({selectedFilter, setSelectedFilter}) {
  function handleSignedOutChange() {
    if (selectedFilter === "signed-out") {
      setSelectedFilter("all");
    } else {
      setSelectedFilter("signed-out");
    }
  }

  function handleInBuildingChange() {
    if (selectedFilter === "in-building") {
      setSelectedFilter("all");
    } else {
      setSelectedFilter("in-building");
    }
  }
  return (
    <>
      <label className="block ml-5 mb-5">
        <input type="checkbox"
         checked={selectedFilter === "signed-out"} 
         onChange={handleSignedOutChange} />
        Signed Out
      </label>

      <label className="block ml-5">
        <input
         type="checkbox"
         checked={selectedFilter === "in-building"}
         onChange={handleInBuildingChange}
         />
        In Building
      </label>
    </>
  );
}
