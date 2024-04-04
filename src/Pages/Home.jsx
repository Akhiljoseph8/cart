import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { fetchProductsThunk } from '../redux/slices/productSlice';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { addToWishList } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { onNavigateNext,onNavigatePrev } from '../redux/slices/productSlice';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Home() {

  const dispatch=useDispatch()
  const {product,loading, error, currentPage, productsPerPage}=useSelector((state)=>state.productReducer)
  console.log(product)
  const totalPages= Math.ceil(product?.length/productsPerPage)
  const indexOfLastItem=currentPage* productsPerPage
  const indexOfFirstItem=indexOfLastItem-productsPerPage
  const validCards=product?.slice(indexOfFirstItem,indexOfLastItem)
  useEffect(() => {
     dispatch(fetchProductsThunk())
  }, [])
  const {wishlist}=useSelector(state=>state.wishlistSlice)
  const handleAddWishList=(product)=>{
    const existingProduct=wishlist.find(item=>item.id==product.id)
    if(existingProduct){
      toast.warning("Already added")
    }else{
      dispatch(addToWishList(product))
      
      toast.success("Product added to wishlist")
    }
  }
  const handleAddProduct=(item)=>{
    dispatch(addToCart(item))
    toast.success("Product added to cart")
  }
  const navigatePrev=()=>{
    if(currentPage!=1){
      dispatch(onNavigatePrev())
    }
  }
  const navigateNext=()=>{
    if(currentPage!=totalPages){
      dispatch(onNavigateNext())
     
    }
  }
  return (
    <>
    <ToastContainer/>
        <header class="bg-dark py-5">
        <Carousel>
      <Carousel.Item>
        <img src="src/assets/ban5.jpg" alt="" style={{height:"500px"}} className='w-100 img-fluid'/>
      </Carousel.Item>
      <Carousel.Item>
      <img src="src/assets/ban4.jpg" alt="" style={{height:"500px"}} className='w-100'/>
      </Carousel.Item>
      <Carousel.Item>
      <img src="src/assets/ban1.jpg" alt="" style={{height:"500px"}} className='w-100'/>
      </Carousel.Item>
    </Carousel>
        </header>
        {
          !loading&&error&&
          <div className='display-3 text-danger'>{error}</div>
        }
        {
        loading?
        <div className='p-5 d-flex justify-content-center'>
         <Spinner
         as="span"
         animation='border'
         size='xl'
         role='status'
         aria-hidden='true'
         />Loading..
        </div>
        :
          
        <section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                  {
                    product.length>0?
                    validCards.map((item)=>(
                    <div class="col mb-5">
                        <div class="card h-100">
                            <Link to={`/view/${item.id}`}>
                            <img class="card-img-top" src={item.thumbnail} height={'200px'} alt="..." />
                            </Link>
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{item.title.slice(0,10)}...</h5>
                                     $ {item.price}
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <button className='btn border' onClick={()=>{handleAddWishList(item)}}>
                                      <i className='fa-solid fa-heart-circle-plus'  style={{color:"#f10979"}}></i>
                                    </button>
                                    <button className='btn border' onClick={()=>{handleAddProduct(item)}}>
                                      <i className='fa-solid fa-cart-plus'  style={{color:"#00ff00"}}></i>
                                    </button>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    ))
                    :<div className='text-danger'>No Item Found</div>
               }
                </div>
                <div className='text-center'> 
                <button className='btn' onClick={navigatePrev}>
                <i className='fa-solid fa-angles-left'></i>
                </button>
                <span>{currentPage}/{totalPages}</span>
                <button className='btn' onClick={navigateNext}>
                  <i className='fa-solid fa-angles-right'></i>
                </button>
                </div>
            </div>
        </section>
         }
    </>
  )
}

export default Home
