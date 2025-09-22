// import React from 'react'
import { Outlet,useNavigate } from "react-router-dom"
import { useState,useEffect,useContext } from "react";
import SAHeader from "../components/SAHeader.jsx" 
import Footer from "../components/Footer.jsx"
import SellerSideBar from "../components/SellerSideBar.jsx";
import { ThemeContext } from "../context/ThemeContextProvider";
 

function SellerLayout() {
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
  
  const sidebarStyle={
    backgroundColor:themeName ==='dark'? "#1E201E" :"#FFFDEC",
    width: isSidebarCollapsed ? "70px" : "180px", // Shrink sidebar on small screens
    minHeight: "calc(100vh-80px)",
    borderRight:themeName ==='dark' 
    ? "solid 1px #333333"
    : "solid 1px rgba(51, 51, 51, 0.2)",
  }

  const outletStyle ={
    flex:1,
    backgroundColor:themeName ==='dark'? "#1E201E" :"#FFFDEC",
    // flex: "1 0 auto",  // new 25/8 for sticking footer to bottom - 2  // it was flex:1 before
    width:"100%",
    display:"flex",
    flexDirection:"column",
    boxSizing: "border-box",
    overflowY: "auto",  /* Enables vertical scrolling */
    // maxHeight: "calc(100vh - 125px)",  //when i removed this it resulted in no scroll so i kept it
    maxHeight: "100vh",  //so that it will take the entire space left
  }

  const sideNdout = {
    display:"flex",
    flex:"1", 
    minHeight:"100vh", 
  }

  const headerandoutlineandfooter = {
    display:'flex',
    flexDirection:"column",
    // justifyContent:"space-between",
    flex: 1,
    minHeight:"100vh",   // for the ⬇️ we removed this line
    // height:"100%", //new 25/8 for sticking footer to bottom - 1
  }

  return (
     <div style={sideNdout}>
        <aside style={sidebarStyle}>
        <SellerSideBar isSidebarCollapsed={isSidebarCollapsed}/>
        </aside>
      <div style={headerandoutlineandfooter}>
        <div style={headerStyle}>
        <SAHeader/>
        </div>
      <div className={themeName} style={outletStyle} ><Outlet/></div>
      </div>
      </div> 
  )
}

export default SellerLayout