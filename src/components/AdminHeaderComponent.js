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
              <NavLink to="/users" className="nav-link" ><span className="fa fa-user mr-1"></span>Users</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  to="/orders" className="nav-link"><span className="fa fa-shopping-bag mr-1"></span>Orders</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  to="/feedbacks" className="nav-link"><span className="fa fa-comments mr-1"></span>Feedbacks</NavLink>
            </NavItem>
            <NavItem>
              <button  onClick={()=>dispatch(logoutUser)} className=" btn btn-danger ml-4">Logout</button>
            </NavItem>
          </Nav>
          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default N;