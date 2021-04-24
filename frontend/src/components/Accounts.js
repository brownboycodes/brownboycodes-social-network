import { useParams } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Accounts = () => {
  let { slug } = useParams();
  if (slug === "signin") {
    return <SignIn />;
  }
  if (slug === "signup") {
    return <SignUp />;
  }
};

export default Accounts;
