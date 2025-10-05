/* eslint-disable react/prop-types */
import { useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import MuiToolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import ViewOnlyModal from "./../../components/ViewOnlyModal.jsx";

const randomId = () => Math.random().toString(36).substring(2, 9);

const randomArrayItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const status = ["Pending", "Approved", "Rejected"];
const randomStatus = () => {
  return randomArrayItem(status);
};

const amount = [1299, 699, 899];
const randomAmount = () => {
  return randomArrayItem(amount);
};

const description = [
  "Blue T-shirt",
  "Black Cargos",
  "White Tee",
  "Green Jeans",
];
const randomDescription = () => {
  return randomArrayItem(description);
};

const initialRows = [
  {
    id: randomId(),
    status: randomStatus(),
    description: randomDescription(),
    amount: randomAmount(),
    createdAt: new Date(),
  },
  {
    id: randomId(),
    status: randomStatus(),
    description: randomDescription(),
    amount: randomAmount(),
    createdAt: new Date(),
  },
  {
    id: randomId(),
    status: randomStatus(),
    description: randomDescription(),
    amount: randomAmount(),
    createdAt: new Date(),
  },
  {
    id: randomId(),
    status: randomStatus(),
    description: randomDescription(),
    amount: randomAmount(),
    createdAt: new Date(),
  },
];

function MyProducts() {
  const [isStatus, setIsStatus] = useState("approved");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState({});

  const [rows, setRows] = useState(initialRows);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleViewClick = (id) => {
    console.log("here");
    //to find the specific row that was selected
    const selectedRow = rows.find((row) => row.id === id);
    setRowData(selectedRow);
    setIsModalOpen(true);
  };

  const handleEditClick = (id) => () => {
    console.log(id, "Inside edit function");
  };

  const handleDeleteClick = (id) => () => {
    console.log(id, "Inside delete function");
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    {
      field: "status",
      headerName: "Status",
      width: 100,
      // editable: false,
      type: "singleSelect",
      headerAlign: "center",
      align: "center",
      valueOptions: ["Pending", "Approved", "Rejected"],
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      width: 200,
      align: "left",
      headerAlign: "center",
      // editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 180,
      // editable: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => `₹${params.value.toFixed(2)}`,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      align: "center",
      headerAlign: "center",
      // type: "date",
      width: 280,
      renderCell: (params) => {
        const value = params.row?.createdAt;
        return value ? moment(value).format("YYYY-MM-DD HH:mm:ss") : "—";
      },
    },
    { field: "_id", hide: true },
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
                  <DeleteIcon fontSize="medium" />
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
              width: "100%",
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
              // pageSize={5}
              // pageSizeOptions={[10]}
              // disableSelectionOnClick
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
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default MyProducts;
