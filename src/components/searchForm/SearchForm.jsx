import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import s from "./SearchForm.module.css";
const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query.trim());
  };
  return (
    <div className={s.search}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button className={s.button} type="submit">
          {" "}
          <BiSearchAlt2 />
        </button>

        <input
          className={s.input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
      </form>
    </div>
  );
};
export default SearchForm;
