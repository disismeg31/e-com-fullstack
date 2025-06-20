export const setProductList = (products) => ({
    type:'SET_PRODUCT_LIST',
    payload:products
})

export const addToCartProduct = (id) =>({
    type:'ADD_TO_CART',
    payload:id
})

export  const delFromCart =(id)=>({
    type:'DELETE_FROM_CART',
    payload:id
})

export const handleQuantity =(id,op)=>({
    type:'QTY',
    payload:{id,op}
}) 

export const placeOrder = (id) =>({
    type:'PLACEORDER',
    payload:id
})

export const userLogin =(val)=>({
    type:'SET_USER_LOGIN',
    payload:val
})
