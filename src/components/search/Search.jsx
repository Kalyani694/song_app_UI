import React from 'react';
import './search.css';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search"
        className="search-input"
      />
      <button className="search-button">
        <SearchIcon/>
      </button>
    </div>
  );
};

export default Search;
