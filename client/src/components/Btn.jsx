/* eslint-disable react/prop-types */
import React from "react";
function Btn({ label, onClick }) {
  console.log(`Rendering Btn: ${label}`); // Logs every render
  return (
    <button onClick={onClick} 
        className="btn w-70 h-11 m-2 text-[#fff] bg-[#5dd39e] text-lg hover:bg-[#5dd39eb7] hover:cursor-pointer">
      {label.toUpperCase()}
    </button>
  );
}

export default React.memo(Btn);
