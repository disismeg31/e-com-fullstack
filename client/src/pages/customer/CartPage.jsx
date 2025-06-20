import './CartPage.css'
// import { useContext } from 'react';
// import { SearchContext } from '../context/SearchContextProvider.jsx';
import {useNavigate } from "react-router-dom"; 
import { FaArrowLeft } from "react-icons/fa6";
import CartItem from '../../components/CartItem.jsx'
import { useSelector} from 'react-redux';
function CartPage() {
  //using redux
  const cart = useSelector(state => state.products?.cartItems || []); 
  const totalAmt = useSelector(state=>state.products?.totalAmount);
  // using context api
  // const {cart} = useContext(SearchContext);

  const navigate = useNavigate();
  const handleCheckOut =()=>{
    navigate('/checkoutorderplaced');
  }
  return (
    <div className='cart-container'>
      <span className="back-arrow" onClick={()=>navigate(-1)}><FaArrowLeft size={25} /></span>
      { 
      cart.length>0 ? 
      (cart.map((item)=>(
        <CartItem key={item.id} item={item}/>
      )))
      :
      (<p className='no-item'>No items in the cart</p>)
    }
    {
      cart.length>0 &&
      <>
      <div className='total-amt'>
      <span className='total'>TOTAL AMOUNT</span>
      <span className='total'>${totalAmt}</span>
      </div>
      <button className='placeorder-btn' onClick={()=>{handleCheckOut()}}>CHECKOUT</button>
      </>
      }
    
    </div>
  )
}

export default CartPage