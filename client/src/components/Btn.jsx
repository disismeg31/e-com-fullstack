/* eslint-disable react/prop-types */
import React from "react";
function Btn({ label, onClick, type }) {
  console.log(`Rendering Btn: ${label}`); // Logs every render
  return (
    // bg-[#5dd39e]
    <button type={type} onClick={onClick} 
        className="btn w-full h-11 mx-1 my-2 text-[#3a395a]  border-2 border-[#3a395a] text-lg hover:bg-[#5dd39eb7] hover:cursor-pointer">
      {
        label.includes('-') ? label.slice(0,label.length-1).toUpperCase() : label
      }
    </button>
  );
}

export default React.memo(Btn);
