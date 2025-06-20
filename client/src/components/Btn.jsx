/* eslint-disable react/prop-types */
import React from 'react'
import './Btn.css'
function Btn({label,onClick}) {
    console.log(`Rendering Btn: ${label}`); // Logs every render
    return(
        
            
                <button onClick={onClick} className="btn">{label.toUpperCase()}</button>
           
    )
}

export default  React.memo(Btn);
