import { useRef } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavigationBar = () => {
  
    const ref = useRef();
    
    return (
      <Navbar 
        
        bg="dark"
        variant='dark'
        sticky='top'
        // expand="sm"
        // collapseOnSelect={true}
        >
       
      
        <Navbar.Collapse  ref={ref}>
          <Nav >
            <NavItem to='/' value='Home' />
            <NavItem to='/about' value='About' />
            <NavItem to='/contact' value='Contact' />
            <NavItem to='/images' value='Images' />
            <NavItem to='/svgimg' value='SVG' />
            <NavItem to="/canvasimg" value='CANVAS'/>
            <NavItem to='/svgcanvas' value='SVGCS'/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  export default NavigationBar;
  
  
  const NavItem = ({ to, value }) => (
    <LinkContainer
      to={to}
    //   exact={true}
      activeClassName='text-danger'>
      <Nav.Link active={true}>{value}</Nav.Link>
    </LinkContainer>
  );