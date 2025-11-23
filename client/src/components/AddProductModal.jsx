/* eslint-disable react/prop-types */
import { useState } from "react";
import reactDom from "react-dom";
import { CgClose } from "react-icons/cg";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { addProduct } from "./../services/sellerService";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import { useSelector } from "react-redux";

function AddProductModal({ open, onClose, refreshProducts }) {
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
  const role = useSelector((state) => state.auth.user?.role);
  const sellerId = useSelector((state) => state.auth.user?.id);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((n) => ({ ...n, [name]: value }));
  };
  const handleProductSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("companyName", newProduct.companyName);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    formData.append("category", newProduct.category);
    formData.append("createdBy", role);
    formData.append("sellerId", sellerId);
    if (newProduct.imageUrl) {
      formData.append("imageUrl", newProduct.imageUrl); // File object
    }

    addProduct(formData)
      .then((res) => {
        if (res.status === true) {
          setToastOpen(true);
          setMessage(res.message);
          setTimeout(() => {
            onClose();
            refreshProducts(); //for refetching updated data
          }, 1000);
        } else {
          setMessage(res.message || "Something went wrong");
          setErrorToastOpen(true);
        }
      })
      .catch((err) => {
        setErrorToastOpen(true);
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

  };

  if (!open) return null;
  return reactDom.createPortal(
    <>
      <div style={OVERLAY_PORTAL}>
        <div style={MODAL_STYLES}>
          <div className="flex justify-between">
            <p className="text-2xl font-semibold">Add Product</p>
            <span
              className="text-black w-6 h-6 rounded-full hover:cursor-pointer flex items-center justify-center"
              onClick={() => onClose()}
            >
              <CgClose size={23} />
            </span>
          </div>
          <div className="flex">
            <div>
              <form
                onSubmit={handleProductSubmit}
                className="text-black w-[100%]"
              >
                <label htmlFor="title">
                  Product Title
                  <br />
                  <input
                    className="w-full my-2 bg-gray-200  rounded-md p-2"
                    name="title"
                    type="text"
                    value={newProduct.title}
                    onChange={(e) => handleInputChange(e)}
                  />
                </label>
                <br />
                <label htmlFor="companyName">
                  Company Name
                  <br />
                  <input
                    className="w-full my-2 bg-gray-200  rounded-md p-2"
                    name="companyName"
                    type="text"
                    value={newProduct.companyName}
                    onChange={(e) => handleInputChange(e)}
                  />
                </label>
                <br />
                <label htmlFor="description">
                  Product Description
                  <br />
                  <textarea
                    className="w-full  my-2 bg-gray-200  rounded-md p-2"
                    name="description"
                    type="text"
                    value={newProduct.description}
                    onChange={(e) => handleInputChange(e)}
                  />
                </label>
                <br />
                <label htmlFor="price">
                  Product Price
                  <br />
                  <input
                    className="w-full  my-2 bg-gray-200  rounded-md p-2"
                    name="price"
                    type="text"
                    value={newProduct.price}
                    onChange={(e) => handleInputChange(e)}
                  />
                </label>
                <br />
                <label htmlFor="stock">
                  Stock
                  <br />
                  <select
                    className="w-full  my-2 bg-gray-200  rounded-md p-2"
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
                <label htmlFor="category">
                  Category
                  <br />
                  <select
                    className="w-full  my-2 bg-gray-200  rounded-md p-2"
                    name="category"
                    id=""
                    value={newProduct.category}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="" hidden></option>
                    <option value="accessories">Accessories</option>
                    <option value="clothing">Clothing</option>
                    <option value="perfume">Perfume</option>
                  </select>
                </label>
                <br />

                <label htmlFor="imageUrl">
                  Upload Image
                  <input
                    className="bg-gray-200 w-full  my-2 rounded-md p-2"
                    name="imageUrl"
                    type="file"
                    onChange={(e) =>
                      setNewProduct((n) => ({
                        ...n,
                        imageUrl: e.target.files[0],
                      }))
                    }
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
                {newProduct.imageUrl ? (
                  <img
                    className="h-60 p-2"
                    src={URL.createObjectURL(newProduct.imageUrl)}
                    alt="preview"
                  />
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
