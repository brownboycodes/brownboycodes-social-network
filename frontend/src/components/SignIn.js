import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import React, { useContext } from "react";
import NotyfContext from "../context/NotyfContext";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "axios";

const SignIn = () => {
  let history = useHistory();
  const notyf = useContext(NotyfContext);
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
    },
    validationSchema: Yup.object({
      emailAddress: Yup.string()
        .email("please enter a valid email id")
        .min(6, "Must be at least of 6 characters")
        .required("please enter your username or email address to proceed"),
      password: Yup.string()
        .min(8, "password must be at least of 8 characters")
        .max(50, "password cannot be more than 50 characters")
        .required("password cannot be empty!"),
    }),
    onSubmit: (values) => {
      

      axios
        .post(`/auth/local/login`, values, {
          withCredentials: true,
        })
        .then((response) => {
          const { data } = response;
          // console.log(data);
          localStorage.setItem("currentUser", JSON.stringify(data.user));

          if (data.user) {
            notyf.success(data.message);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            notyf.error(data.message);
          }
          history.push(data.route);
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
                        <Form.Label>Email Address</Form.Label>

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
                        <Form.Label>Password</Form.Label>

                        <Form.Control
                          type="password"
                          {...formik.getFieldProps("password")}
                          id="password"
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <Alert variant="warning">
                            {formik.errors.password}
                          </Alert>
                        ) : null}
                      </Form.Group>
                      <Button variant="primary" size="lg" block type="submit">
                        Sign In
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
                <Container style={{ marginTop: "10px" }}>
                  <Row>
                    <Col>
                      or <a href="/accounts/signup">Sign Up</a> if you don't
                      have an account
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

export default SignIn;
