// import React from 'react'
import { Outlet,useNavigate } from "react-router-dom"
import { useState,useEffect,useContext } from "react";
// import Header from "../components/Header.jsx" 
import Footer from "../components/Footer.jsx"
// import Sidebar from "../components/Sidebar.jsx";
import { ThemeContext } from "../context/ThemeContextProvider";

function AdminLayout() {
  const navigate = useNavigate();
    const { themeName } = useContext(ThemeContext);
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth <= 768);
  
    useEffect(() => {
      document.body.className = themeName;
    }, [themeName]);
  
    useEffect(() => {
      const handleResize = () => {
        setSidebarCollapsed(window.innerWidth <= 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const containerSt = {
    display:"flex",
    flexDirection:"column",
    flexWrap:"wrap",
    width:"100%",
    minHeight:"100vh",
    padding: "100px 0px",
  }
  const headerStyle={
    height:"80px",
    backgroundColor: themeName ==='dark'? "#1E201E" :"#FFFDEC",
    display:"flex",
    alignItems:"center",
    width:"100%",
    position: "sticky",
    top: 0,
    zIndex: 10,
    borderBottom:themeName ==='dark' 
    ? "solid 1px #333333"
    : "solid 1px rgba(51, 51, 51, 0.2)",
  }
  const footerStyle ={
    width: "100%",
    // height:"70px",removed this to keep the footer on bottom
    // flexShrink:0, //new 25/8 for sticking footer to bottom -2
    borderTop:themeName ==='dark' 
    ? "solid 1px #333333"
    : "solid 1px rgba(51, 51, 51, 0.2)",
  }
  const sidebarStyle={
    backgroundColor:themeName ==='dark'? "#1E201E" :"#FFFDEC",
    width: isSidebarCollapsed ? "70px" : "180px", // Shrink sidebar on small screens
    minHeight: "100vh",
    borderRight:themeName ==='dark' 
    ? "solid 1px #333333"
    : "solid 1px rgba(51, 51, 51, 0.2)",
  }

  const outletStyle ={
    flex:1,
    // flex: "1 0 auto",  // new 25/8 for sticking footer to bottom - 2  // it was flex:1 before
    width:"100%",
    display:"flex",
    flexDirection:"column",
    boxSizing: "border-box",
    overflowY: "auto",  /* Enables vertical scrolling */
    maxHeight: "calc(100vh - 125px)",  //when i removed this it resulted in no scroll so i kept it
  }

  const sideNdout = {
    display:"flex",
    flex:"1", 
    minHeight:"100vh", 
  }

  const headerandoutlineandfooter = {
    display:'flex',
    flexDirection:"column",
    justifyContent:"space-between",
    flex: 1,
    minHeight:"100vh",   // for the ⬇️ we removed this line
    // height:"100%", //new 25/8 for sticking footer to bottom - 1
  }
   
  return (
     <div style={sideNdout}>
      <aside style={sidebarStyle}>
        <p className="text-black">Admin Sidebar</p>
        {/* <Sidebar isSidebarCollapsed={isSidebarCollapsed}/> */}
        </aside>
      <div style={headerandoutlineandfooter}>
        <div style={headerStyle}>
        {/* <Header/> */} 
        <p className="text-black">Admin Header</p>
        </div>
      <div className={themeName} style={outletStyle} ><Outlet/></div>
      <div style={footerStyle}><Footer/></div>
      </div>
      </div> 
  )
}

export default AdminLayout