/* eslint-disable react/prop-types */
import { useState } from "react";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import MuiToolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  // Toolbar,
  // ToolbarButton,
} from '@mui/x-data-grid';
 

const randomId = () => Math.random().toString(36).substring(2, 9);

const randomArrayItem = (array) => array[Math.floor(Math.random() * array.length)];

const status = ['Pending', 'Approved', 'Rejected'];
const randomStatus = () => {
  return randomArrayItem(status);
};

const amount = [1299,699,899];
const randomAmount = () => {
  return randomArrayItem(amount)
}

const description = ['Blue T-shirt','Black Cargos', 'White Tee','Green Jeans'];
const randomDescription = () =>{
  return randomArrayItem(description)
}





const initialRows = [
  {
    id: randomId(),
    status:randomStatus(),
    description: randomDescription(),
    amount:randomAmount()
  },
  {
    id: randomId(),
    status:randomStatus(),
    description: randomDescription(),
    amount:randomAmount()
  },
  {
    id: randomId(),
    status:randomStatus(),
    description: randomDescription(),
    amount:randomAmount()
  },
  {
    id: randomId(),
    status:randomStatus(),
    description: randomDescription(),
    amount:randomAmount()
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, status: '', description: '', amount: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'description' },
    }));
  };
return (
    <MuiToolbar>
      <Tooltip title="Add record">
        <IconButton onClick={handleClick}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </MuiToolbar>
  );
}



function MyProducts() {
  const [isStatus, setIsStatus] = useState("approved");

  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 100, 
      editable: false,
      type: 'singleSelect',
      valueOptions: ['Pending', 'Approved', 'Rejected'],
     },
    {
      field: 'description',
      headerName: 'Description',
      type: 'string',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 180,
      editable: true,
      format: (value) => value.toFixed(2),
    },
    // {
    //   field: 'joinDate',
    //   headerName: 'Join date',
    //   type: 'date',
    //   width: 180,
    //   editable: true,
    // },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 180,
      cellClassName: 'actions',
      resizable:false,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              material={{
                sx: {
                  color: 'primary.main',
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
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
          ) : (
            <span className=" ml-1 h-6 flex justify-center items-center bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
              {isStatus}
            </span>
          )}
        </div>

        <button
          disabled={isStatus === "pending"}
          className={`items-center justify-center bg-transparent border px-2 py-1 rounded-xl 
          ${
            isStatus === "pending"
              ? "bg-gray-400 border-gray-400 text-gray-700 hover:bg-gray-400 hover:text-gray-700 cursor-not-allowed"
              : "bg-transparent border-[#5dd39e] text-[#5dd39e] hover:bg-[#5dd39e] hover:text-[#FFFDEC]"
          } `}
        >
          + Add Products
        </button>
      </div>
      {isStatus === "pending" ? (
        <div className="bg-gray-300 my-4 p-4 rounded-xl">
          <p> Your seller status is pending. You cannot add products yet.</p>
        </div>
      ) : (
        <div className="mt-4">
          {/* here the table will be there */}
           <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        disableColumnResize 
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        showToolbar
      />
    </Box>
        </div>
      )}
    </div>
  );
}

export default MyProducts;
