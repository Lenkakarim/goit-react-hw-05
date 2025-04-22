import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import styles from "./SearchForm.module.css";
const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query.trim());
  };
  return (
    <div className={styles.search}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button className={styles.button} type="submit">
          <BiSearchAlt2 />
        </button>

        <input
          className={styles.input}
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
