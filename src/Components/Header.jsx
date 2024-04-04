import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import Wishlist from '../Pages/Wishlist';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList } from '../redux/slices/wishlistSlice';
import { searchProduct } from '../redux/slices/productSlice';
function Header() {
  const {wishlist}=useSelector(state=>state.wishlistSlice)
  const cart=useSelector(state=>state.cartReducer)
  const dispatch=useDispatch()
  return (
   <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className='text-primary'><i class="fa-solid fa-cart-shopping"></i>&nbsp;<h4 style={{display:'inline'}}>Shopping cart</h4></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item className='rounded me-3'>
               <input type="text" placeholder='Search products' name='search' id='mk' onChange={(e)=>{dispatch(searchProduct(e.target.value.toLowerCase()))}} />
            </Nav.Item>
            <Nav.Link  className='border border-dark rounded me-3'>
              <Link to={'/wish'} className='text-decoration-none text-dark'>
              <i className='fa-solid fa-heart me-1' style={{color:'#df0c7c'}}></i>
               WishList
               &nbsp;<Badge bg="secondary">{wishlist?.length}</Badge>
              </Link>
            </Nav.Link>
            <Nav.Link href="#home" className='border border-dark rounded me-3'>
             <Link to={'/cart'} className='text-decoration-none text-dark'> 
                <i className='fa-solid fa-cart-shopping me-1' style={{color:'#63E6BE'}}></i>
                 Cart
                 &nbsp;<Badge bg="secondary">{cart?.length}</Badge>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </>
  )
}

export default Header
