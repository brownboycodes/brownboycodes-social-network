import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import NotyfContext from "../context/NotyfContext";
import { SocketContext } from "../context/socket";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

const SignUp = () => {
  let history = useHistory();
  const notyf = useContext(NotyfContext);
  const socket = useContext(SocketContext);
  const [usernameStatus, setUsernameStatus] = useState(null);

  window.onload = () => {
    let usernameBox = document.getElementById("username");

    usernameBox.addEventListener("input", (event) => {
      if (event.target.value) {
        socket.emit("typing-username", event.target.value);
        socket.on("username-availability", (usernameAvailability) => {
          setUsernameStatus(usernameAvailability);
        });
      }
    });
  };

  let buttonType = usernameStatus === "username not available" ? true : false;
  const formik = useFormik({
    initialValues: {
      username: "",
      emailAddress: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, "Username must be at least of 6 characters")
        .max(50, "Username cannot be more than 50 characters")
        .required("Username cannot be empty!"),
      emailAddress: Yup.string()
        .email("please enter a valid email address")
        .required("email Address cannot be empty"),
      password: Yup.string()
        .min(8, "password must be at least of 8 characters")
        .max(50, "password cannot be more than 50 characters")
        .required("password cannot be empty!"),
    }),

    onSubmit: (values) => {
    

      axios
        .post(
          `/auth/local/register`,
          values,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          const { data } = response;
          if (data.message === "new account created") {
            notyf.success(data.message);
            setTimeout(() => {
              history.push(data.route);
            }, 3000);
            // window.location.reload();
          } else {
            notyf.error(data.message);
            setTimeout(() => {
              history.push(data.route);
            }, 3000);
          }
        })
        .catch((err) => console.log(err));

      formik.resetForm();
    },
  });

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <Container
            id="signup-form"
            style={{
              width: "360px",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Form onSubmit={formik.handleSubmit}>
                      <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                          type="text"
                          {...formik.getFieldProps("username")}
                          id="username"
                        />
                        <Form.Text>
                          {formik.touched.username && formik.errors.username ? (
                            <Alert variant="warning">
                              {formik.errors.username}
                            </Alert>
                          ) : null}
                        </Form.Text>
                        <Form.Text>
                          {usernameStatus === "username available" && (
                            <Alert variant="success">{usernameStatus}</Alert>
                          )}
                          {usernameStatus === "username not available" && (
                            <Alert variant="danger">{usernameStatus}</Alert>
                          )}
                        </Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Email ID:</Form.Label>
                        <Form.Control
                          type="email"
                          {...formik.getFieldProps("emailAddress")}
                          id="emailAddress"
                        />
                        <Form.Text>
                          {formik.touched.emailAddress &&
                          formik.errors.emailAddress ? (
                            <Alert variant="warning">
                              {formik.errors.emailAddress}
                            </Alert>
                          ) : null}
                        </Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                          type="password"
                          {...formik.getFieldProps("password")}
                          id="password"
                        />
                        <Form.Text>
                          {formik.touched.password && formik.errors.password ? (
                            <Alert variant="warning">
                              {formik.errors.password}
                            </Alert>
                          ) : null}
                        </Form.Text>
                      </Form.Group>
                      <Button
                        variant="primary"
                        size="lg"
                        block
                        type="submit"
                        disabled={buttonType}
                      >
                        Sign Up
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
                <Container style={{ marginTop: "10px" }}>
                  <Row>
                    <Col>
                      or <a href="/accounts/signin">Sign In</a> if you have an
                      account
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default SignUp;
