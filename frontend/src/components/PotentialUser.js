import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PotentialUser = () => {
  const history = useHistory();
  return (
    <Container>
      <Row>
        <Col>
          <Button
            variant="primary"
            size="lg"
            onClick={() => history.push("/accounts/signup")}
          >
            Sign Up
          </Button>
          <p style={{marginTop:'15px'}}>
            or <a href="/accounts/signin">Sign In</a> if you have an account
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default PotentialUser;
