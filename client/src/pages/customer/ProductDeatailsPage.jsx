import {useEffect} from 'react';
import { useLocation,useNavigate } from "react-router-dom"; 
import { FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
// import { SearchContext } from '../context/SearchContextProvider.jsx';
import './ProductDeatailsPage.css'
import {useDispatch} from 'react-redux';
import {addToCartProduct} from '../../store/actions/productActions.js';

function ProductDeatailsPage() {
  // using use Context
  // const {addToCart} = useContext(SearchContext);
  const location = useLocation();
  const navigate = useNavigate();
  // using redux
  const dispatch =useDispatch();
  const item = location.state?.item;//retrieve the item object
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if(!item){
    return <p>Item not found</p>;
  }
  return (
    <div className="product-details-container">
      <span className="back-arrow" onClick={()=>navigate(-1)}><FaArrowLeft size={25} /></span>
      <div className="product-heading">
        <h1>Product details</h1>
        <h3>{item.title}</h3>
        <h3>{item.brand}</h3>
      </div>
      <div className="details">
      <img className="image" src={item.images} alt="item image" />
        <span>
        {
          item.rating <=5 && 
          Array.from({ length: item.rating }).map((_, index) => (
            <FaStar size={20} className="star-color" key={index} />
          ))
        }
        </span>
        <p className="desc" >{item.description}</p>
        <div className="tags-avail">
        {item.tags?.map((tag, index) => (
          <span key={index} className="badge">{tag}</span>
        ))}
        </div>
        <span className="stock" >{item.stock}Left - {item.availabilityStatus}</span>
        {/* <button className='card-button' onClick={()=>{addToCart(item.id)}}>Add to Cart</button> */}
        <button className='card-button' onClick={()=>{dispatch(addToCartProduct(item.id))}}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductDeatailsPage