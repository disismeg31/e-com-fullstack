/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {createContext,useState}from 'react';
import {useSelector} from 'react-redux';
 

export const SearchContext = createContext();

function SearchContextProvider({children}) {
    const [searchText, setSearchText] = useState("");
    const [cart,setCart]=useState([]);
    

    const List = useSelector(state=>state.products.products);
    const addToCart = (id) =>{
      if(cart.some((item)=>item.id === id)){
        console.log('You already have this item in the cart')
      }
      else{
      const itemToAdd = List.find((item)=>(item.id === id))
      console.log(itemToAdd)
      if(itemToAdd){
      setCart((cart)=>[...cart,{...itemToAdd,quantity:1}])
      }
      
      }
    }

    const deleteFromCart = (id)=>{
      const newCartList = cart.filter((item)=>(
         item.id!==id
      ));
      setCart(newCartList)
    }
    const handleQty = (id,operation)=>{
       setCart((c)=> (
        c.map((item)=>
        item.id === id ?
        {...item,
          quantity: operation==="i"? item.quantity+1 : Math.max(1,item.quantity-1)
        }:
        item
        
       ))
       )
    }

    const getTotalCartItem = () =>cart.length;
    
    const data = {
        searchText,
        setSearchText,
        cart,
        addToCart,
        deleteFromCart,
        handleQty,
        getTotalCartItem,
        
    }
  return (
     <SearchContext.Provider value={data}>
        {children}
     </SearchContext.Provider>
  )
}


export default SearchContextProvider ;