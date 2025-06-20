/* eslint-disable react/prop-types */
// import {useContext} from 'react'
// import { SearchContext } from '../context/SearchContextProvider.jsx';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import './CartItem.css'
import { useDispatch } from 'react-redux';
import { delFromCart,handleQuantity,placeOrder } from '../store/actions/productActions.js';

function CartItem({item}) {
  // using context api
  // const {deleteFromCart,handleQty} = useContext(SearchContext);

  // using redux
  const dispatch = useDispatch();
  return (
    <div className='cart-item-container'>
      <img src={item.images} alt="product" />
      <div className="item-dets">
      <li><h2 className='prod-heading'>{item.title}</h2></li>
      <span><p className="price">{`$${item.price}`}</p></span>
      <div className='qty-container'>
        <button className='cart-item-qty-btn' onClick={()=>dispatch(handleQuantity(item.id,"d"))}><CiSquareMinus size={25}/></button>
        <span>Qty: {item.quantity}</span>
        <button className='cart-item-qty-btn' onClick={()=>dispatch(handleQuantity(item.id,"i"))} ><CiSquarePlus  size={25} /></button>
      </div>
      {/* <button className='cart-del-btn' onClick={()=>deleteFromCart(item.id)} ><MdOutlineDeleteOutline size={25} /></button> */}
      <button className='cart-del-btn' onClick={()=>dispatch(delFromCart(item.id))} ><MdOutlineDeleteOutline size={25} /></button>
      <button className='cart-placeorder-btn' onClick={()=>dispatch(placeOrder(item.id))} >PLACEORDER</button>

      </div>
    </div>
  )
}

export default CartItem