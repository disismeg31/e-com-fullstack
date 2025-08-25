/* eslint-disable react/prop-types */
import { useState,useEffect,useContext } from "react";
import { IoSearchOutline } from "react-icons/io5";
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
      {/* <label htmlFor="searchhere"> */}

      {/* <div className="w-full flex items-center text-[#1a1b25]">
      <span className="z-1 t-10"><IoSearchOutline size={23}/></span> */}
      <input
        id="searchhere"
        value={searchText}
        className="searchB"
        type="text"
        placeholder='🔍︎Search here'
        onChange={handleInputChange}
      />
      {/* </div> */}
      {/* </label> */}
      <p className="count">{`Count:${count}`}</p>
    </>
  );
}

export default SearchBar;
