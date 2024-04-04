import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decQuantity, emptyCart,incQuantity,removeCart } from '../redux/slices/cartSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Cart() {

  const data = useSelector((state)=>state.cartReducer)
  const cart=useSelector(state=>state.cartReducer)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [cartCount,setCartCount]=useState(0)
  const [cartTotal,setCartTotal]=useState(0)
  useEffect(()=>{
    if(data)
    setCartCount(data.length)
   setCartTotal(cart.reduce((prev,next)=>{return prev+(next.price*next.quantity)},0))
  })
  const handleCheckout=()=>{
    dispatch(emptyCart())
    navigate('/')
  
  }
  const handleDecrement=(item)=>{
    if(item?.quantity>1){
      dispatch(decQuantity(item?.id))
    }else{
      dispatch(removeCart(item?.id))
    }

  }
  return (
    <>

      <div className="pb-5 mt-5">
        <div className="container">
          <div className="row">
            {/* cart  */}
            <div className="col-lg-8 p-5 bg-white rounded shadow-sm mb-5">


              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">ID</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="p-2 px-3 text-uppercase">Product</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Price</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Quantity</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Remove</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    data?.map((item)=>(
                    <tr>
                      <td className="border-0 align-middle"><strong>{item?.id}</strong></td>
                      <th scope="row" className="border-0">
                        <div className="p-2">
                          <img src={item?.thumbnail} alt="" width="70" className="img-fluid rounded shadow-sm" />
                          <div className="ml-3 d-inline-block align-middle">
                            <h5 className="mb-0"> <a href="#" className="text-dark d-inline-block align-middle">{item.title}</a></h5>
                            <span className="text-muted font-weight-normal font-italic d-block">Category: {item.category}</span>
                          </div>
                        </div>
                      </th>
                      <td className="border-0 align-middle"><strong>{item.price}</strong></td>
         
                      <td className="border-0 align-middle">
                      <button className='btn' onClick={()=>{handleDecrement(item)}}>-</button>
                      <input type="text" value={item?.quantity} className='w-25' />
                      <button className='btn' onClick={()=>{dispatch(incQuantity(item?.id))}}>+</button>
                      </td>
                      <td className="border-0 align-middle"><i className="fa fa-trash" onClick={()=>{dispatch(removeCart(item))}}></i></td>
                    </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </div>

              {/* checkout page */}
            <div className="col-lg-4 border-start">
              <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
              <div className="p-4">
                <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>${cartTotal}</strong></li>
                  <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>$10.00</strong></li>
                  <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total products</strong><strong>{cartCount}</strong></li>
                  <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                    <h5 className="font-weight-bold">${cartTotal+10}</h5>
                  </li>
                </ul><button className="btn btn-dark rounded-pill py-2 btn-block" onClick={()=>handleCheckout()}>Procceed to checkout</button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>

  )
}

export default Cart
