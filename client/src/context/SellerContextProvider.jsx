/* eslint-disable react/prop-types */
import {createContext,useState}from 'react';

export const SellerContext = createContext();

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
    title: randomDescription(),
    description: randomDescription(),
    price: randomAmount(),
    createdAt: new Date(),
  },
  {
    id: randomId(),
    status: randomStatus(),
    title: randomDescription(),
    description: randomDescription(),
    price: randomAmount(),
    createdAt: new Date(),
  },
  {
    id: randomId(),
    status: randomStatus(),
    title: randomDescription(),
    description: randomDescription(),
    price: randomAmount(),
    createdAt: new Date(),
  },
   
];

function SellerContextProvider({children}) {
const [isModalOpen, setIsModalOpen] = useState(false);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);

const [rowData, setRowData] = useState({});

const [rows, setRows] = useState([]);
// const [rows, setRows] = useState(initialRows);


const handleEditClick = (id) => {
    console.log(id, "Inside edit function");
    const selectedEditRow = rows.find((row)=>row._id === id);
    setRowData(selectedEditRow)
    setIsEditModalOpen(true);
  };

  const handleViewClick = (id) => {
    console.log("here");
    //to find the specific row that was selected
    const selectedRow = rows.find((row) => row._id === id);
    setRowData(selectedRow);
    setIsModalOpen(true);
  };
  const handleDeleteClick = (id) => {
    console.log(id, "Inside delete function");
    setRows(rows.filter((row) => row.id !== id));
  };


    const data={
        rows,
        setRows,
        handleEditClick,
        handleDeleteClick,
        handleViewClick,
        isModalOpen,
        setIsModalOpen,
        isEditModalOpen, 
        setIsEditModalOpen,
        rowData
    }

  return (
    <SellerContext.Provider value={data}>
        {children}
    </SellerContext.Provider>
  )
}

export default SellerContextProvider