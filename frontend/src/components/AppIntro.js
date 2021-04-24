import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AppIntro = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Social Netwoking App</h2>
          <h6>by brownboycodes</h6>
          <p>this app helps users to create and publish posts, and to engage in realtime chat with other users</p>
          <p>(this is a demo app, please do not use real email addresses)</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AppIntro;
