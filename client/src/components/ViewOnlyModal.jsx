/* eslint-disable react/prop-types */
import React from "react";
import reactDom from "react-dom";
import { CgClose } from "react-icons/cg";
import moment from "moment";

function ViewOnlyModal({ open, onClose,rowData }) {
  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#fdfdfd",
    padding: "20px",
    zIndex: 1000,
    borderRadius: "15px",
    width:"400px"
  };

  const OVERLAY_PORTAL = {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.1)",
    zIndex: 1000,
  };

  if (!open) return null;

  return reactDom.createPortal(
        <div style={OVERLAY_PORTAL}>
          <div style={MODAL_STYLES}>
            <div className="flex justify-end">
              <span className="text-black w-6 h-6 rounded-full hover:cursor-pointer flex items-center justify-center" onClick={()=>onClose()}>
               <CgClose size={23}/>
            </span>
            </div>
            
            <div className="w-40 p-4 text-black">
              <p>ID:{rowData._id}</p>
              <br />
              <p>DESCRIPTION:{rowData.description}</p>
              <br />
              <p>PRICE:{rowData.price}</p>
              <br />
              <p>CREATED AT:{moment(rowData.createdAt).format("YYYY-MM-DD HH:mm:ss")} </p>
              <p>Image</p>
              {
                rowData.imageUrl ? (
                `<img src=${rowData.imageUrl}/>`
              ) : 'No image'
              }
              </div>
          </div>
        </div>       
    ,
        document.getElementById('portal')
  );
}

export default ViewOnlyModal;
