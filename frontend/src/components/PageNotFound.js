import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

const PageNotFound = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={3}></Col>
        <Col>
          <Image src="/images/9.png" fluid />
          <Alert variant="light">
            Looks like you have requested a page that doesn't exist... Back to{" "}
            <Alert.Link href="/">Homepage</Alert.Link> ?
          </Alert>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
