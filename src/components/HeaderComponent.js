import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import '../css/header.css';
import {NavLink,Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actioncreator';

const N = (props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar   light expand="md" className="shadow  ">
        <Link to="/home" className="navbar-brand">{"&Bazaar>"}</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/home" className="nav-link" ><span className="fa fa-home mr-1"/>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/cart" className="nav-link" ><span className="fa fa-shopping-cart mr-1"></span>Cart</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  to="/wslk" className="nav-link"><span className="fa fa-shopping-bag mr-1"></span>Your-Orders</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  to="/contactus" className="nav-link"><span className="fa fa-address-book mr-1"></span>Contact-Us</NavLink>
            </NavItem>
            <NavItem>
              <Button  onClick={()=>dispatch(logoutUser)} className=" btn btn-danger ml-4">Logout</Button>
            </NavItem>
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default N;