import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { removeWishList } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice';
function Wishlist() {
  const {wishlist}=useSelector(state=>state.wishlistSlice)
  const dispatch=useDispatch()
  const handleRemove=(id)=>{
    dispatch(removeWishList(id))
  }
  const handleAdd=(item)=>{
    dispatch(addToCart(item))
    handleRemove(item.id)
  }
  return (
    <>
    <Row className='m-5 container ' style={{minHeight:"20rem"}}>
      {
        wishlist?.length!=0 ?
        wishlist ?.map(item=>(
      <Col sm={12} md={8} lg={6} xl={4}>
        <Card style={{width:'16rem'}}>
          <Link to={`/view/${item?.id}`}>
            <Card.Img className="card-img-top" style={{height:'200px'}} src={item.thumbnail}/>
          </Link>
          <Card.Body className='text-center'>
             <Card.Title>{item?.title}</Card.Title>
             <Card.Text>{item?.proce}</Card.Text>
             <div class="d-flex justify-content-between">
                        <button className='btn border' onClick={()=>{handleRemove(item.id)}}>
                                      <i className='fa-solid fa-heart-circle-xmark' style={{color:"#f10979"}}></i>
                                    </button>
                                    <button className='btn border'onClick={()=>{handleAdd(item)}}>
                                      <i className='fa-solid fa-cart-plus' style={{color:"#00ff00"}}></i>
                                    </button>
                        </div>
          </Card.Body>
        </Card>
      </Col>
      ))
      :
      <div>
        No items
      </div>
}
    </Row>
    </>
  )
}

export default Wishlist