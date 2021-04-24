import { useFormik } from "formik";
import { useContext } from "react";

import * as Yup from "yup";
import { SocketContext } from "../context/socket";
import { useSelector } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

const MessageSender = ({ recepient }) => {
  const socket = useContext(SocketContext);
  const user = useSelector((state) => state.currentUser.value);

  // socket.emit("new-user", [user.username, recepient].sort().join(""), user.username);
  let room = [user.username, recepient].sort().join("");
  socket.emit("room-created", room);
  socket.emit("new-user", room, user.username);

  let messageBox = document.getElementById("message-box");
  window.onload = () => {
    messageBox = document.getElementById("message-box");
    socket.on("message-received", (data) => {
      // console.log("message-received", data);
      let p = document.createElement("p");
      p.classList.add("received-message");
      p.innerText = data.message;

      let sender = document.createElement("p");
      sender.classList.add('sender');
      sender.innerText = `${data.name}:`;

      let div = document.createElement("div");
      div.align = "left";
      div.appendChild(sender);
      div.appendChild(p);

      messageBox.appendChild(div);
      messageBox.scrollTo(0, messageBox.scrollHeight);
    });
  };

  const formik = useFormik({
    initialValues: {
      myMessage: "",
    },
    validationSchema: Yup.object({
      myMessage: Yup.string()
        .max(300, "everyone hates long messages! 300 is the limit pal!")
        .required(),
    }),
    onSubmit: (values) => {
      // console.log("message sent by me:", values);

      //! let room=[user.username, recepient].sort().join("");
      //! socket.emit("room-created", room);

      // socket.emit('new-user',[user.username,recepient].sort().join(''),user.username);

      // socket.on("user-connected", (name) => {
      //   console.log(`${name} has joined the chat`);
      // });

      //! socket.emit("new-user",room, user.username);

      socket.emit(
        "message-sent",
        [user.username, recepient].sort().join(""),
        values.myMessage
      );
      let p = document.createElement("p");
      p.innerText = values.myMessage;
      p.classList.add("sent-message");

      let sender = document.createElement("p");
      sender.classList.add('sender');
      sender.innerText = "Me:";

      let div = document.createElement("div");

      div.align = "right";
      div.appendChild(sender);
      div.appendChild(p);

      messageBox.appendChild(div);
      messageBox.scrollTo(0, messageBox.scrollHeight);

      formik.resetForm();
    },
  });

  return (
    <>
      <Form
        onSubmit={formik.handleSubmit}
        style={{ width: "100%", height: "100%" }}
      >
        <Form.Group>
          <Form.Label>Type your Message here:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...formik.getFieldProps("myMessage")}
            id="myMessage"
          />
        </Form.Group>
        {/* <textarea cols="10" rows="3"></textarea> */}
        <Button type="submit">
          SEND <SendRoundedIcon />
        </Button>
      </Form>
    </>
  );
};

export default MessageSender;
