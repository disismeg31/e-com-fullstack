/* eslint-disable react/prop-types */
import {createContext,useState}from 'react';
import {deleteProduct} from './../services/sellerService'

export const SellerContext = createContext();

function SellerContextProvider({children}) {
const [isModalOpen, setIsModalOpen] = useState(false);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [isAddModalOpen,setIsAddModalOpen] = useState(false);
// const [loading, setLoading] = useState(false);
const [deletingRowId, setDeletingRowId] = useState(null);
const [toastOpen, setToastOpen] = useState(false);
const [errorToastOpen, setErrorToastOpen] = useState(false);
const [message,setMessage] = useState("");

const [rowData, setRowData] = useState({});

const [rows, setRows] = useState([]);
// const [rows, setRows] = useState(initialRows);

const updateRow = (updatedRow) => {
  setRows((r) =>r.map((row) => (row._id === updatedRow._id ? updatedRow : row)));
};

const handleAddProductClick = () =>{
    setIsAddModalOpen(true);
}

const handleEditClick = (id) => {
    const selectedEditRow = rows.find((row)=>row._id === id);
    setRowData(selectedEditRow)
    setIsEditModalOpen(true);
  };

  const handleViewClick = (id) => {
    //to find the specific row that was selected
    const selectedRow = rows.find((row) => row._id === id);
    setRowData(selectedRow);
    setIsModalOpen(true);
  };
  const handleDeleteClick = (id) => {
    console.log(id, "Inside delete function");
    // setLoading(true);
    setDeletingRowId(id);
    deleteProduct(id)
    .then((res)=>{
      if(res.status === true){
        //to remove the deleted row from the ui
        setRows((r)=>r.filter((row) => row._id !== id));
        setDeletingRowId(null); // stop loader
        setToastOpen(true);
        setMessage(res.message);
      }
      else{
          setMessage(res.message || "Something went wrong");
          setErrorToastOpen(true);
          setDeletingRowId(null); // also stop loader in failure
      }
    })
    .catch((err)=>{
        setDeletingRowId(null);
        setErrorToastOpen(true);
        setMessage(err.message)
    })
    // .finally(()=>{
    //   setLoading(false);
    // })

    
  };


    const data={
        rows,
        setRows,
        handleEditClick,
        handleDeleteClick,
        handleViewClick,
        handleAddProductClick,
        isModalOpen,
        setIsModalOpen,
        isEditModalOpen, 
        setIsEditModalOpen,
        isAddModalOpen,
        setIsAddModalOpen,
        rowData,
        updateRow,
        deletingRowId, 
        setDeletingRowId,
        toastOpen, 
        setToastOpen,
        errorToastOpen, 
        setErrorToastOpen,
        message,
    }

  return (
    <SellerContext.Provider value={data}>
        {children}
    </SellerContext.Provider>
  )
}

export default SellerContextProvider