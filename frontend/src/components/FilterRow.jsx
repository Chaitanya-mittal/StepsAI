import { useSearchParams } from "react-router-dom";

function FilterRow({ filterFields, filterName }) {
  const [searchParam, setSearchParams] = useSearchParams();
  const currFilter = searchParam.get([filterName]) || "all";
  function handleClick(value) {
    setSearchParams({ [filterName]: value });
  }
  return (
    <ul className="mx-auto mb-4 flex w-fit items-center gap-1 rounded-lg bg-white p-1 shadow-md">
      {filterFields.map((filter) => {
        return (
          <li
            className={`duration-70 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-blue-600 hover:text-white ${filter.key === currFilter ? "bg-blue-600 text-white" : "bg-white text-black"}`}
            key={filter.key}
            onClick={() => handleClick(filter.key)}
          >
            {filter.label}
          </li>
        );
      })}
    </ul>
  );
}

export default FilterRow;
