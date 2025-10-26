/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import reactDom from "react-dom";
import { CgClose } from "react-icons/cg";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { updatemyProduct } from "./../services/sellerService";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

function AddProductModal({ open, onClose }) {
  const [newProduct, setNewProduct] = useState({
    title: "",
    companyName: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
  });
  // sellerId: and createdBy can be added while submition
  const [toastOpen, setToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const stock = ["inStock", "limited", "outOfStock"];
  const category = ["clothing", "perfume", "accessories"];

  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#fdfdfd",
    padding: "20px",
    zIndex: 1000,
    borderRadius: "15px",
    width: "800px",
    // display:"flex"
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

  const handleInputChange = () => {};
  const handleSubmit = () => {};

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

          <div className="flex">

            <div>
              <div className="flex justify-start">
                <p className="text-2xl font-semibold">Add Product</p>
              </div>
              <form onSubmit={handleSubmit} className="text-black w-[100%]">
                <label htmlFor="title">
                  Product Title
                  <br />
                  <input
                    className="w-full my-2 bg-gray-200 rounded-md p-2"
                    name="title"
                    type="text"
                    value={newProduct.title}
                    onChange={(e) => handleInputChange(e)}
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
                    value={newProduct.description}
                    onChange={(e) => handleInputChange(e)}
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
                    value={newProduct.stock}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="" hidden></option>
                    <option value="inStock">In Stock</option>
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
                    value={newProduct.price}
                    onChange={(e) => handleInputChange(e)}
                  />
                </label>
                <br />
                <label htmlFor="imageUrl">
                  Upload Image
                  <input
                    className="bg-gray-200 w-full  my-2 rounded-md p-2"
                    name="imageUrl"
                    type="file"
                  />
                </label>

                <div className="flex justify-center my-2">
                  <button
                    className="w-full  my-2 rounded-md bg-green-300 h-10 p-3 flex justify-center items-center hover:cursor-pointer"
                    type="submit"
                  >
                    {loading ? (
                      <Tailspin
                        size="20"
                        stroke="5"
                        speed="0.4"
                        color="black"
                      />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="p-2 flex justify-center items-center">
              <label htmlFor="ImgPreview">
                {newProduct.imageUrl.length > 0 ? (
                  <div>
                    <img
                      className="h-70 p-2"
                      src={newProduct.imageUrl}
                      alt="image"
                    />
                  </div>
                ) : (
                  <div className="h-70 p-2 bg-gray-200 flex justify-center items-center">
                    <p>Product image upload preview will be displayed here</p>
                  </div>
                )}
              </label>
            </div>

          </div>
        </div>
      </div>
      <Snackbar
        open={errorToastOpen}
        autoHideDuration={2000}
        onClose={() => setErrorToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error">
          {message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </>,
    document.getElementById("portal")
  );
}

export default AddProductModal;
