


import Modal from "react-bootstrap/Modal";

import Container from "react-bootstrap/Container";
import MessageSender from "./MessageSender";
import { useLocation, useParams } from "react-router-dom";

const ChatBox = () => {
  
  
  let { slug } = useParams();

  let location = useLocation();
  
  if (location.pathname === "/messenger") {
    return (
      <Container>
        <p>Select a user to chat with from the menu on the left</p>
        <p>The user you want to chat with must also select you from their chat navigation menu</p>
        <p>The messages sent and received will not be stored in databases and therefore they will disappear if page is refreshed</p>
        <p>The purpose of this chat messagiing service is to demonstrate fully functional real-time communication system</p>
      </Container>
    );
  }
 
  return (
    <>
      <Modal.Dialog size="lg" scrollable="true">
        <Modal.Header>
          <Modal.Title>To: {slug}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ height: "300px",width:'100%' }} id="message-box">
          {/* <p>Modal body text goes here.</p> */}
        </Modal.Body>

        <Modal.Footer>
          <MessageSender recepient={slug} />
        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
  // return <div></div>
};

export default ChatBox;
