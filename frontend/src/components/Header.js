import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import NotyfContext from "../context/NotyfContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Header = () => {
  const user = useSelector((state) => state.currentUser.value);
  // const history = useHistory();
  const notyf = useContext(NotyfContext);

  const handleSignOut = (event) => {
    event.preventDefault();

    axios
      .get(`/auth/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        const { data } = response;
        if (!data.user) {
          notyf.success(data.message);
          localStorage.removeItem("currentUser");

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }

        // history.push(data.route);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <Navbar.Brand
        href="/"
        style={{
          fontSize: "90%",
          margin: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt=""
          src="/images/app_logo_64px.png"
          width="32"
          height="32"
          className="d-inline-block align-top"
        />{" "}
        Social Netwoking App
      </Navbar.Brand>

      <div>
        {user && (
          <Nav className="mr-auto">
            <Nav.Link href="/user/posts/all">Posts</Nav.Link>
            <Nav.Link href="/messenger">Messenger</Nav.Link>

            <Form inline>
              <Button onClick={handleSignOut} variant="outline-info">
                Sign Out
              </Button>
            </Form>
          </Nav>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
