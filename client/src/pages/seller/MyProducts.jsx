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

function MyProducts() {
  
  const isStatus = useSelector(state=>state.auth.user?.status)
  const id = useSelector(state=>state.auth.user?.id)
   
  const {rows,setRows,handleEditClick,
    handleDeleteClick,handleViewClick,
    isEditModalOpen,setIsEditModalOpen,
    isModalOpen, setIsModalOpen, 
    isAddModalOpen,setIsAddModalOpen,
    handleAddProductClick,
    rowData,updateRow,deletingRowId,
    toastOpen,setToastOpen,
    errorToastOpen,setErrorToastOpen,
    message,
  } = useContext(SellerContext);
  
  useEffect(()=>{
    //if status is approved then only call the getProducts Api
    if(isStatus === 'approved' && id){
      getMyproducts(id)
      .then((data)=>{
        // console.log(data)
        setRows(data)
      })
      .catch((err) => {
          console.error("Error fetching products:", err);
        })
    }
  },[isStatus,id,setRows])

  const handleViewClose = () => {
    setIsModalOpen(false);
  };

  const handleEditClose = ()=>{
    setIsEditModalOpen(false);
  }

  const handleAddClose = () =>{
    setIsAddModalOpen(false);
  }

  const columns = [
    {
      field: "status",
      headerName: "Status",
      width: 100,
      type: "singleSelect",
      headerAlign: "center",
      align: "center",
      valueOptions: ["Pending", "Approved", "Rejected"],
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      width: 200,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => `₹${params.value.toFixed(2)}`,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      align: "center",
      headerAlign: "center",
      width: 280,
      renderCell: (params) => {
        const value = params.row?.createdAt;
        return value ? moment(value).format("YYYY-MM-DD HH:mm:ss") : "—";
      },
    },
    // { field: "_id", hide: true },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ id }) => {
        return (
          <>
            <div className="flex justify-between gap-2">
              <Tooltip
                title="View"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -19],
                        },
                      },
                    ],
                  },
                }}
              >
                <button
                  className=" h-10 flex items-center hover:cursor-pointer"
                  onClick={() => handleViewClick(id)}
                >
                  <VisibilityIcon fontSize="medium" />
                </button>
              </Tooltip>
              <Tooltip
                title="Edit"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -19],
                        },
                      },
                    ],
                  },
                }}
              >
                <button
                  className=" h-10 flex items-center hover:cursor-pointer"
                  onClick={() => handleEditClick(id)}
                >
                  <EditIcon fontSize="medium" />
                </button>
              </Tooltip>
              <Tooltip
                title="Delete"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -19],
                        },
                      },
                    ],
                  },
                }}
              >
                <button
                  className=" h-10 flex items-center hover:cursor-pointer"
                  onClick={() => handleDeleteClick(id)}
                >
                  {deletingRowId  === id ? 
                  (
                    <Tailspin
                      size="20"
                      stroke="5"
                      speed="0.4"
                      color="black" 
                      />
                    ) 
                      : 
                    (
                    <DeleteIcon fontSize="medium" />
                  )}
                </button>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="m-4">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center">
          <p className="text-black text-2xl">MyProducts</p>
          {isStatus === "pending" ? (
            <span className=" ml-1 h-6 flex justify-center items-center bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
              {isStatus}
            </span>
          ) : isStatus === "rejected" ? (
            <span className=" ml-1 h-6 flex justify-center items-center bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
              {isStatus}
            </span>
          ) : (
            <span className="ml-1 h-6 flex justify-center items-center bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
              {isStatus}
            </span>
          )}
        </div>

        <button
          disabled={isStatus === "pending" || isStatus === "rejected"}
          onClick={handleAddProductClick}
          className={`items-center justify-center bg-transparent border px-2 py-1 rounded-xl 
          ${
            isStatus === "pending"
              ? "bg-gray-400 border-gray-400 text-gray-700 hover:bg-gray-400 hover:text-gray-700 cursor-not-allowed"
              : isStatus === "rejected"
              ? "bg-gray-400 border-gray-400 text-gray-700 hover:bg-gray-400 hover:text-gray-700 cursor-not-allowed"
              : "bg-transparent border-[#5dd39e] text-[#5dd39e] hover:bg-[#5dd39e] hover:text-[#FFFDEC]"
          } `}
        >
          + Add Products
        </button>
      </div>
      {isStatus === "pending" ? (
        <div className="bg-yellow-200 my-4 p-4 rounded-xl">
          <p> Your seller status is {isStatus}. You cannot add products yet.</p>
        </div>
      ) : isStatus === "rejected" ? (
        <div className="bg-red-300 my-4 p-4 rounded-xl">
          <p> Your seller status is {isStatus}. You cannot add products.</p>
        </div>
      ) : (
        <div className="mt-4">
          {/* here the table will be there */}
          <Box
            sx={{
              height: 500,
              width: "1165px",
              "& .actions": {
                color: "text.secondary",
              },
              "& .textPrimary": {
                color: "text.primary",
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row._id}
              disableRowSelectionOnClick
              disableColumnSelector
              sx={{
                "& .MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-cell:focus-within": {
                  outline: "none",
                },
              }}
            />
          </Box>
        </div>
      )}
      {isModalOpen && (
        <ViewOnlyModal
          rowData={rowData}
          open={isModalOpen}
          onClose={handleViewClose}
        />
      )}
      {isEditModalOpen && (
        <EditModal
          rowData={rowData}
          open={isEditModalOpen}
          onClose={handleEditClose}
          onUpdate={updateRow}
        />
      )}

      {isAddModalOpen &&(
        <AddProductModal
        open={isAddModalOpen}
        onClose={handleAddClose}
        />
      )}
      
              <Snackbar
                open={errorToastOpen}
                autoHideDuration={2000}
                onClose={() => setErrorToastOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Alert
                  icon={<ErrorOutlineIcon fontSize="inherit" />}
                  severity="error"
                >
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
            
    </div>
  );
}

export default MyProducts;
