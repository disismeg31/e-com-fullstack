/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import reactDom from "react-dom";
import { CgClose } from "react-icons/cg";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { updatemyProduct } from "./../services/sellerService";
import { updateProductAdmin } from "../services/adminService";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import { useSelector } from "react-redux";

function EditModal({ open, onClose, rowData, onUpdate }) {
  const role = useSelector((state) => state.auth.user?.role);

  const [toastOpen, setToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [editData, setEditData] = useState(rowData);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const whoToCall = {
    seller: updatemyProduct,
    admin: updateProductAdmin,
  };

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

  useEffect(() => {
    if (rowData) setEditData(rowData);
  }, [rowData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // setEditData((e) => ({ ...e, [name]: value }));
    setEditData((e) => ({
      ...e,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const updateFn = whoToCall[role];

    if (!updateFn) {
      setErrorToastOpen(true);
      setMessage("Invalid role");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    Object.keys(editData).forEach((key) => {
      if (editData[key] !== rowData[key]) {
        formData.append(key, editData[key]);
      }
    });

    // const fileInput = document.querySelector('input[name="imageUrl"]');
    // if (fileInput?.files?.[0]) {
    //   formData.append("imageUrl", fileInput.files[0]);
    // }
    if (selectedFile) {
      formData.append("imageUrl", selectedFile);
    }

    updateFn(editData._id, formData)
      .then((res) => {
        if (res.status === true) {
          // Update the row in seller context
          // onUpdate && onUpdate({ ...editData });
          onUpdate && onUpdate(res.payload);

          setToastOpen(true);
          setMessage(res.message);
          setTimeout(onClose, 1000);
        } else {
          setErrorToastOpen(true);
          setMessage(res.message);
        }
      })
      .catch((err) => {
        setErrorToastOpen(true);
        setMessage(err.message);
      })
      .finally(() => setLoading(false));
  };

  //  console.log(rowData)
  if (!open) return null;

  return reactDom.createPortal(
    <>
      <div style={OVERLAY_PORTAL}>
        <div style={MODAL_STYLES}>
          <div className="flex justify-between">
            <p className="text-2xl font-semibold">Edit Product</p>
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
                value={editData.description}
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
                value={editData.stock}
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
                value={editData.price}
                onChange={(e) => handleInputChange(e)}
              />
            </label>
            <br />
            <label htmlFor="imageUrl">
              Upload Image
              <input
                className="bg-gray-200  my-2 rounded-md p-2"
                name="imageUrl"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </label>
            <div className="flex justify-center my-2">
              <button
                className="w-full  my-2 rounded-md bg-green-300 h-10 p-3 flex justify-center items-center hover:cursor-pointer"
                type="submit"
              >
                {loading ? (
                  <Tailspin size="20" stroke="5" speed="0.4" color="black" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
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

export default EditModal;
