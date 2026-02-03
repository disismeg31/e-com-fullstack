//  /* eslint-disable react/prop-types */
import { useContext,useEffect} from "react";
import Box from "@mui/material/Box";
// icons from react icons ❌✔️
import { DataGrid } from "@mui/x-data-grid";
import ViewOnlyModal from "./../../components/ViewOnlyModal.jsx";
import { AdminContext } from "../../context/AdminContextProvider.jsx";
import EditModal from "../../components/EditModal.jsx";
import { getSellerRequests } from "../../services/adminService.js";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'

function SellerRequests() {
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
    } = useContext(AdminContext);

    useEffect(()=>{
          getSellerRequests()
          .then((data)=>{
            // console.log(data)
            setRows(data)
          })
          .catch((err) => {
              console.error("Error fetching products:", err);
            })
      },[setRows])

  return (
    <div className="m-4">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center">
          <p className="text-black text-2xl">Seller Requests</p>
          <span className="ml-1 h-6 flex justify-center items-center bg-green-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
              Count
            </span>
        </div>
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
      </div>
     
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
        refreshProducts={fetchProducts}
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
  )
}

export default SellerRequests