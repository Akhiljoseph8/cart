import React from 'react'
import { Col, Row } from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import { fetchProductsThunk } from '../redux/slices/productSlice';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { addToWishList } from '../redux/slices/wishlistSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '../redux/slices/cartSlice';
function View() {
  
  const dispatch=useDispatch()
  const {product,loading, error}=useSelector((state)=>state.productReducer)
  const {wishlist}=useSelector(state=>state.wishlistSlice)
  // const [data, setData]=useState({})
  const {id}=useParams()
  useEffect(() => {
     dispatch(fetchProductsThunk())
    
  }, [])

  var data=product.find(item=>item.id==id)
  
  // var discountAmount=(100-discount)/100*data.price
   
  const handleAddWishList=(product)=>{
    const existingProduct=wishlist.find(item=>item.id==product.id)
    if(existingProduct){
      toast.warning("Already Added")
    }else{
      dispatch(addToWishList(product))
      toast.success("Added to Wishlist")
    }
  }
  const handleAddCart=(product)=>{
    dispatch(addToCart(product))
    toast.success("Added to Cart")
  }
  return (
    <>
    <ToastContainer/>
    {
      data?
    <section className='py-5 container-fluid'>
      <Row className='gx-4 gx-lg-5 align-items-center'>
        <Col sm={6} md={6}>
          <Image className="card-img-top mb-5 mb-md-0" src={data.thumbnail} alt="..."></Image>
        </Col>
        <Col sm={6} md={6}>
        <div className="small mb-1">Product Id: {data.id}</div>
                        <h1 className="display-5 fw-bolder">{data.title}</h1>
                        <div className=" mb-5">
                            <span className="">$ {data.price}</span>
                            <span></span>
                        </div>
                        <div>Rating: {data.rating}<i className='fa-solid fa-star' style={{color:"orange"}}></i></div>
                        <p class="lead">{data.description}</p>
                        <div class="d-flex justify-content-around">
                        <button className='btn border' onClick={()=>{handleAddWishList(data)}}>
                                      <i className='fa-solid fa-heart-circle-plus' style={{color:"#f10979"}}></i>
                                    </button>
                                    <button className='btn border' onClick={()=>{handleAddCart(data)}}>
                                      <i className='fa-solid fa-cart-plus' style={{color:"#00ff00"}}></i>
                                    </button>
                        </div>
        </Col>
      </Row>

    </section>
    : 
    <div className='p-5 d-flex justify-content-center'>
         <Spinner
         as="span"
         animation='border'
         size='xl'
         role='status'
         aria-hidden='true'
         />Loading..
        </div>
}
    </>
  )
}

export default View