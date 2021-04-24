import ChatBox from "./ChatBox";
import ChatNavigation from "./ChatNavigation";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Messenger = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={3}>
          {" "}
          <ChatNavigation />
        </Col>
        <Col sm={9}>
          <ChatBox />
        </Col>
      </Row>
    </Container>
  );
};

export default Messenger;
