/* eslint-disable react/prop-types */
import { useContext,useEffect} from "react";
import { useSelector } from "react-redux"
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import ViewOnlyModal from "./../../components/ViewOnlyModal.jsx";
import { SellerContext } from "../../context/SellerContextProvider.jsx";
import EditModal from "../../components/EditModal.jsx";
import { getMyproducts } from "../../services/sellerService.js";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'
import AddProductModal from "../../components/AddProductModal.jsx";
function ManageProducts() {
  return (
    <div>ManageProducts</div>
  )
}

export default ManageProducts