import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
   <>
   <div>
    <Row className='p-5 bg-dark text-light'>
       <Col>
          <h3>Cart</h3>
          <p style={{textAlign:'justify'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem fuga sed maxime velit nobis quia nisi suscipit deleniti, minus omnis reiciendis voluptatum eius ab iste! Asperiores nulla laborum laboriosam soluta.
          </p>
       </Col>
       <Col className='d-flex align-items-center flex-column'>
        <h3>Links</h3>
        <Link to={'/wish'} className='mb-3 mt-3 d-block text-decoration-none'>WishList</Link>
        <Link to={'/cart'} className='text-decoration-none'>Cart</Link>
       </Col>
       <Col className='d-flex align-items-center flex-column'>
       <h3>References</h3>
       <a href='https://getbootstrap.com/' className='mb-3 mt-3 d-block text-decoration-none'>Bootstrap</a>
       <a href='https://react.dev/' className='text-decoration-none'>React</a>
       </Col>
       <Col>
       <h3>Contact Us</h3>
       <p className='mt-3'>Submit your email id...</p>
       <input type="email" className='form-contol mt-3 d-block' placeholder='Enter your email id' />
       <button className='btn mt-3 btn-light '>Send</button>
       </Col>
    </Row>
   </div>
   </>
  )
}

export default Footer
