export function SearchBar() {
  return (
    <>
      <div className=" right-side-header flex items-start p-6 flex-1">
        <input
          className="h-12 flex-1 rounded-lg border p-3"
          placeholder="Search Visitor"
        />
        <button className="bg-gray-500 w-30 h-12 ml-1 rounded-lg cursor-pointer hover:opacity-80 active:opacity-100">
          Search
        </button>
      </div>
    </>
  );
}
