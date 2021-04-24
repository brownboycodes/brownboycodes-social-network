import { format } from "date-fns";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import PostServer from "./PostServer";
import NotyfContext from "../context/NotyfContext";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext } from "react";
import axios from "axios";

const CreatePost = () => {
  // let history = useHistory();
  const user = useSelector((state) => state.currentUser.value);
  const notyf = useContext(NotyfContext);
  window.onload = function () {
    document.getElementById("postContent").addEventListener(
      "keydown",
      function (e) {
        if (
          e.keyIdentifier === "U+000A" ||
          e.keyIdentifier === "Enter" ||
          e.keyCode === 13
        ) {
          if (e.target.nodeName === "INPUT" && e.target.type === "text") {
            e.preventDefault();
            return false;
          }
        }
      },
      true
    );
  };
  const formik = useFormik({
    initialValues: {
      postTitle: "",
      postContent: "",
      postAuthor: user.username,
      datePosted: format(new Date(), "do MMMM Y"),
    },
    validationSchema: Yup.object({
      postTitle: Yup.string()
        .max(100, "Must be 100 characters or less")
        .required("please give your post a title"),
      postContent: Yup.string()
        .max(400, "Must be 400 characters or less")
        .required("post without any content will be discarded!"),
      postAuthor: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("post without any author will be discarded!"),
      datePosted: Yup.string().required(
        "post without any a valid date will be discarded!"
      ),
    }),
    onSubmit: (values) => {
     
      axios
        .post(`/posts/create`, values, {
          withCredentials: true,
        })
        .then((response) => {
          const { data } = response;
          notyf.success(data.message);
        })
        .catch((err) => console.log(err));

      formik.resetForm();
    },
  });
  return (
    <PostServer>
      <Container>
        <Row>
          <Col sm={2}></Col>
          <Col>
            <Form onSubmit={formik.handleSubmit} style={{marginTop:'20px'}}>
              <Form.Group>
                <Form.Label>Title for your Post:</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("postTitle")}
                  id="postTitle"
                />
                <Form.Text>
                  {formik.touched.postTitle && formik.errors.postTitle ? (
                    <Alert variant="warning">{formik.errors.postTitle}</Alert>
                  ) : null}
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Write your Post:</Form.Label>
                <Form.Control
                  as="textarea"
                  {...formik.getFieldProps("postContent")}
                  id="postContent"
                  // size="lg"
                  // style={{height:'auto'}}
                  rows={10}
                />
                <Form.Text>
                  {formik.touched.postContent && formik.errors.postContent ? (
                    <Alert variant="warning">{formik.errors.postContent}</Alert>
                  ) : null}
                </Form.Text>
              </Form.Group>

              <input
                type="hidden"
                {...formik.getFieldProps("postAuthor")}
                id="postAuthor"
              />
              <input
                type="hidden"
                {...formik.getFieldProps("datePosted")}
                id="datePosted"
              />
              <Button type="submit">Publish</Button>
            </Form>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
    </PostServer>
  );
};

export default CreatePost;
