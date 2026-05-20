export function SearchBar({ searchText, setSearchText }) {
  return (
    <>
      <div className="right-side-header flex flex-col items-stretch gap-2 p-0 flex-1 w-full md:flex-row md:items-start md:gap-0 md:p-6">
        <input
          className="h-12 w-full flex-1 rounded-lg border p-3 md:w-auto"
          placeholder="Search by name or organisation"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button className="bg-gray-500 w-full h-12 ml-0 rounded-lg cursor-pointer hover:opacity-80 active:opacity-100 md:w-30 md:ml-1"
        onClick={() => setSearchText("")}
        >
          Clear
        </button>
      </div>
    </>
  );
}
