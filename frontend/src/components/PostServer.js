
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


const PostServer = ({ children }) => {
  const user = useSelector((state) => state.currentUser.value);

  return (
    <>
      <Container fluid >
        <Row >
          <Col sm={2} >
            
            <Navbar bg="light" variant="light" style={{ height: "100%" }}>
              <Nav className="flex-column navigation-styles" style={{ height: "100%" }}>
                <Nav.Link href="/user/posts/all">All Posts</Nav.Link>
                <Nav.Link href={`/user/posts/${user.username}`}>My Posts</Nav.Link>
                <Nav.Link href="/create/post">Create Post</Nav.Link>
              </Nav>
            </Navbar>
          </Col>
          <Col sm={9}>{children}</Col>
        </Row>
      </Container>
    </>
  );
};

export default PostServer;
