/* eslint-disable react/prop-types */
// import React from "react";
import reactDom from "react-dom";
import { CgClose } from "react-icons/cg";
 
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

  if (!open) return null;

  return reactDom.createPortal(
        <div style={OVERLAY_PORTAL}>
        <div style={MODAL_STYLES}>
          <div className="flex justify-between">
            <p className="text-2xl font-semibold">View Product</p>
            <span
              className="text-black w-6 h-6 rounded-full hover:cursor-pointer flex items-center justify-center"
              onClick={() => onClose()}
            >
              <CgClose size={23} />
            </span>
          </div>
          <form  className="text-black w-[100%]">
            <label htmlFor="title">
              Product Title
              <br />
              <input
                className="w-full my-2 bg-gray-200 rounded-md p-2"
                name="title"
                type="text"
                disabled
                value={rowData.title}
              />
            </label>
            <br />
            <label htmlFor="description">
              Product Description
              <br />
              <textarea
                className="w-full  my-2 bg-gray-200 rounded-md p-2"
                name="description" 
                id=""
                disabled
                rows="3"
                cols="6"
                value={rowData.description}>
                </textarea>
            </label>
            <br />
            <label htmlFor="stock">
              Stock
              <br />
              <select
                className="w-full  my-2 bg-gray-200 rounded-md p-2"
                name="stock"
                id=""
                disabled
                value={rowData.stock}
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
                disabled
                value={rowData.price}
              />
            </label>
            <br />
            <label htmlFor="imageUrl">
              Image
              <img style={{height:"100px",width:"400px",objectFit:"cover"}} src={rowData.imageUrl} alt="image" />
            </label>
          </form>
        </div>
      </div>   
    ,
        document.getElementById('portal')
  );
}

export default ViewOnlyModal;
