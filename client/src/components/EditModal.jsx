/* eslint-disable react/prop-types */
import React, { useState } from "react";
import reactDom from "react-dom";
import { CgClose } from "react-icons/cg";

function EditModal({ open, onClose, rowData }) {
    const [formData,setFormData] = useState({

    })
  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#fdfdfd",
    padding: "20px",
    zIndex: 1000,
    borderRadius: "15px",
    width: "400px",
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

  const handleInputChange = () => {

  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("submit");
  }

  if (!open) return null;

  return reactDom.createPortal(
    <>
      <div style={OVERLAY_PORTAL}>
        <div style={MODAL_STYLES}>
          <div className="flex justify-end">
            <span
              className="text-black w-6 h-6 rounded-full hover:cursor-pointer flex items-center justify-center"
              onClick={() => onClose()}
            >
              <CgClose size={23} />
            </span>
          </div>
          <form onSubmit={handleSubmit}  className="text-black">
            <label htmlFor="name">
              Product Name
              <br />
              <input name="name" type="text" value={rowData.description} onChange={handleInputChange} />
            </label>
            <br />
            <label htmlFor="description">
              Product Description
              <br />
              <input name="description" type="text" value={rowData.description} onChange={handleInputChange} />
            </label>
            <br />
            <label htmlFor="stock">
              Stock
              <select name="stock" id="" onChange={handleInputChange}>
                <option value="" hidden></option>
                <option value="instock">In Stock</option>
                <option value="limited">Limited</option>
                <option value="outofstock">Out Of Stock</option>
              </select>
            </label>
            <br />
            <label htmlFor="amount">
              Product Price
              <input name="amount" type="text"  value={rowData.amount} onChange={handleInputChange}/>
            </label>
            <label htmlFor="img">Upload Image
              <input name="img" type="file" />
            </label>
            <div className="flex justify-center">
            <button className="bg-green-300 h-10 p-3 flex justify-center items-center hover:cursor-pointer" type="submit">Submit</button>

            </div>
             
          </form>
        </div>
      </div>
    </>,

    document.getElementById("portal")
  );
}

export default EditModal;
