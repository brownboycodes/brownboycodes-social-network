import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";

const allUsers = async () => {
 
  let response = await axios.get(
    `/messenger/user/all`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};
const ChatNavigation = () => {
  const { data, status } = useQuery("users", allUsers);
  const { username } = useSelector((state) => state.currentUser.value);

  let usersList =
    status === "success"
      ? data.users.filter((user) => user !== username)
      : null;

  if (status === "error") {
    return <p>some error occurred</p>;
  }
  return (
    <Navbar
      bg="light"
      variant="light"
      style={{ height: "100%", width: "fit-content" }}
    >
      <Nav className="flex-column" style={{ height: "100%" }}>
        <Navbar.Brand>Available Users</Navbar.Brand>
        {status === "success" &&
          usersList !== undefined &&
          usersList.map((value, index) => {
            return (
              <Nav.Link
                href={`/message/${value}`}
                key={index}
                className="navigation-styles"
              >
                {value}
              </Nav.Link>
            );
          })}
      </Nav>
    </Navbar>
  );
};

export default ChatNavigation;
