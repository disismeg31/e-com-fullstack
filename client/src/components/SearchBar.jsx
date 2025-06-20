/* eslint-disable react/prop-types */
import { useState,useEffect,useContext } from "react";
import "./SearchBar.css";
import { SearchContext } from "../context/SearchContextProvider";


function SearchBar( ) {
  const {searchText,setSearchText} = useContext(SearchContext)
  const [count,setCount] = useState(0)
   useEffect(()=>{
    if(searchText.trim().length>0){
     setCount((c)=>c+1)
    }
     console.log(searchText)
   },[searchText])
  
  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchText(val);
  };
  return (
    <>
      <input
        value={searchText}
        className="searchB"
        type="text"
        placeholder="🔍Search here"
        onChange={handleInputChange}
      />
      <p className="count">{`Count:${count}`}</p>
    </>
  );
}

export default SearchBar;
