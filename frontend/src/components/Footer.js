import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <Navbar bg="light" variant="light" fixed="bottom" style={{height:"75px", marginTop:'10px'}}>
      
      <Container style={{width:'inherit'}}>
      <Row>
        <Col sm={2}></Col>
        <Col sm={8} style={{width:'300px',display:'flex',flexDirection:'column',justifyContent:"center",alignItems:'center'}}>
          <Nav className="mr-auto" style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          
          
          <p style={{fontSize:'12px',width:'300px'}}>created by <a style={{fontSize:'13px',fontWeight:'500'}} href="https://brownboycodes.herokuapp.com/">Nabhodipta Garai | brownboycodes</a></p>
        </Col>
        <Col sm={2}></Col>
      </Row>
      </Container>
    </Navbar>
  );
};

export default Footer;
