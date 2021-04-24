import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const AboutPage = () => {
  return (
    <Container>
      <Row>
        <Col sm={2}></Col>
        <Col sm={8}>
          <div style={{ margin: "10px", color: "#495057" }}>
            <p>
              This is a simple social networking application with features like
              realtime messaging and post publishing
            </p>
            <p>built using express, socket io, react, react-bootstrap</p>
            <p>
              favicon next to title has been made by{" "}
              <a href="https://www.freepik.com" title="Freepik">
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </p>
            <p>
              Illustrations have been made by{" "}
              <a href="https://craftwork.design/">craftwork design</a> found via
              dribble
            </p>
          </div>
          <Image src="/images/aboutpage_illustration.png" fluid />
        </Col>
        <Col sm={2}></Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
