import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import Select from "./Select.jsx";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get("sortBy") ?? "";

  const handleChange = useCallback(
    (e) => {
      searchParams.set("page", 1);
      searchParams.set("sortBy", e.target.value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={currentSortBy}
      type="white"
    />
  );
};

export default SortBy;
