//  /* eslint-disable react/prop-types */
import { useContext,useEffect} from "react";
import Box from "@mui/material/Box";
// icons from react icons ❌✔️
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import ViewOnlyModal from "./../../components/ViewOnlyModal.jsx";
import { AdminContext } from "../../context/AdminContextProvider.jsx";
import EditModal from "../../components/EditModal.jsx";
import { getApprovedSellers } from "../../services/adminService.js";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Tailspin } from 'ldrs/react'
import 'ldrs/react/Tailspin.css'
function ApprovedSellers() {
  const {rows,setRows,
      handlePause,
      handleViewClick,
      isModalOpen, setIsModalOpen, 
      rowData,updateRow,loadingAction,
      toastOpen,setToastOpen,
      errorToastOpen,setErrorToastOpen,
      message,
    } = useContext(AdminContext);

    useEffect(()=>{
              getApprovedSellers()
              .then((data)=>{
                // console.log(data)
                setRows(data)
              })
              .catch((err) => {
                  console.error("Error fetching sellers:", err);
                })
          },[setRows])
    
        const handleViewClose = () => {
        setIsModalOpen(false);
      };

        const columns = [
              {
                field: "name",
                headerName: "Name",
                width: 150,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "email",
                headerName: "Email",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "status",
                headerName: "Status",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "action",
                headerName: "Action",
                headerAlign: "center",
                width: 190,
                renderCell: ({ id }) => {
                  return (
                    <>
                      <div className="flex justify-evenly items-center h-12">
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
                        <div>
                          <button
                            className=" bg-yellow-400 rounded-2xl p-2.5 h-7 flex items-center hover:cursor-pointer hover:bg-yellow-500"
                            onClick={() => handlePause(id,"pending")}
                          >
                            {loadingAction.id === id && loadingAction.type === "pause" ? 
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
                              <p className="text-xs font-bold">Pause</p>
                            )}
                            {/* <EditIcon fontSize="medium" /> */}
                          </button>
                        </div>    
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

export default ApprovedSellers