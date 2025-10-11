/* eslint-disable react/prop-types */
import React, { useState } from "react";
import reactDom from "react-dom";
import { CgClose } from "react-icons/cg";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {updatemyProduct} from './../services/sellerService'

function EditModal({ open, onClose, rowData }) {
  const [editData, setEditData] = useState(rowData);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData((e) => ({ ...e, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const changedFields = Object.keys(editData).reduce((acc, key) => {
      if (editData[key] !== rowData[key]) acc[key] = editData[key];
      return acc;
    }, {});
    console.log("edited data", changedFields);
    let id = editData._id
    updatemyProduct(id,changedFields)
    .then((res)=>{

    })
    .catch((err)=>{
      
    })
  };
   console.log(rowData)
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
          <form onSubmit={handleSubmit} className="text-black w-[100%]">
            <label htmlFor="title">
              Product Title
              <br />
              <input
                className="w-full my-2 bg-gray-200 rounded-md p-2"
                name="title"
                type="text"
                value={editData.title}
                onChange={(e)=>handleInputChange(e)}
              />
            </label>
            <br />
            <label htmlFor="description">
              Product Description
              <br />
              <input
                className="w-full  my-2 bg-gray-200 rounded-md p-2"
                name="description"
                type="text"
                value={editData.description}
                onChange={(e)=>handleInputChange(e)}
              />
            </label>
            <br />
            <label htmlFor="stock">
              Stock
              <br />
              <select
                className="w-full  my-2 bg-gray-200 rounded-md p-2"
                name="stock"
                id=""
                value={editData.stock}
                onChange={(e)=>handleInputChange(e)}
              >
                <option value="" hidden></option>
                <option value="inStock">
                  In Stock
                </option>
                <option value="limited">Limited</option>
                <option value="outOfStock">Out Of Stock</option>
              </select>
            </label>
            <br />
            <label htmlFor="price">
              Product Price
              <br />
              <input
                className="w-full  my-2 bg-gray-200 rounded-md p-2"
                name="price"
                type="text"
                value={editData.price}
                onChange={(e)=>handleInputChange(e)}
              />
            </label>
            <br />
            <label htmlFor="imageUrl">
              Upload Image
              <input
                className="bg-gray-200  my-2 rounded-md p-2"
                name="imageUrl"
                type="file"
              />
            </label>
            <div className="flex justify-center my-2">
              <button
                className="w-full  my-2 rounded-md bg-green-300 h-10 p-3 flex justify-center items-center hover:cursor-pointer"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>,

    document.getElementById("portal")
  );
}

export default EditModal;
