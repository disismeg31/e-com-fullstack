const initialState = {
    products:[],
    cartItems:[],
    cartCount:0,
    totalAmount:0,
    user:{
        isLoggedIn:false,
        role:""
    } 
}


// const productReducer =(state={products:[]},action) => {
const productReducer =(state=initialState,action) => {

switch(action.type){
    case 'SET_PRODUCT_LIST':
        return{
            ...state,
            products:action.payload
        };
    
    case 'ADD_TO_CART':
        {
            if(state.cartItems.some((item)=> item.id === action.payload)){
                console.log("You've already added this item");
                return state //returning the current state thus preventing unnecessary updates
            }
             
        const addedProduct = state.products.find(product => product.id === action.payload);
        if (!addedProduct) return state; // Product not found returning the current state bc nothing was changed
        const updatedCart = [...state.cartItems, { ...addedProduct, cart: true,quantity:1 }];
        console.log(updatedCart)
        // Calculate total amount
        const totalAmt = Math.floor(updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0));

        return {
        ...state,
        cartItems: updatedCart,
        cartCount: updatedCart.length,
        totalAmount:totalAmt
        };
        }

    case 'PLACEORDER':
        {
            const updatedproducts = state.products.map((product)=>
                product.id === action.payload? {...product,placeorder:true} : product
            )
            const orderedProduct = state.products.find(product => product.id === action.payload);
            window.alert(`Order Placed for ${orderedProduct?.title || "this item"}`);
            return{
                ...state,
                products: updatedproducts,
            }
        }
        
    case 'DELETE_FROM_CART':
        {
            const filterCart = state.cartItems.filter(product=>product.id!==action.payload);
            if(!filterCart) return state;
            // Recalculate total amount after quantity change
            const totalAmt = Math.floor(filterCart.reduce((sum, item) => sum + item.price * item.quantity, 0));
            return{
                ...state,
                cartItems:filterCart,
                cartCount:filterCart.length,
                totalAmount:totalAmt
            }
        }

    case 'QTY':
        {
            const newQty = state.cartItems.map(item=>
                item.id === action.payload.id 
                ?{
                    ...item,
                    quantity: action.payload.op==="i"
                    ? item.quantity+1 
                    : Math.max(1,item.quantity-1)
                }
                :
                item
            );
            // Recalculate total amount after quantity change
            const totalAmt = Math.floor(newQty.reduce((sum, item) => sum + item.price * item.quantity, 0));
            return{
                ...state,
                cartItems:newQty,
                totalAmount:totalAmt
            }
    }

    case 'SET_USER_LOGIN':
         return{
            ...state,
            user:{
                ...state.user,
                isLoggedIn:action.payload.isLoggedIn,
                role:action.payload.role
            }
         }

    default:
      return state; 

}
}

export {productReducer}