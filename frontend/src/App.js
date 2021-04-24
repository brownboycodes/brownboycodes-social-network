import dotenv from "dotenv";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Accounts from "./components/Accounts";
import Home from "./components/Home";
import Messenger from "./components/Messenger";
import Posts from "./components/Posts";

import "bootstrap/dist/css/bootstrap.min.css";
import "notyf/notyf.min.css";
import Layout from "./components/Layout";
import CreatePost from "./components/CreatePost";
import PageNotFound from "./components/PageNotFound";
import AboutPage from "./components/AboutPage";
// import { currentUser } from "./state_manager/currentUserSlice";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

function App() {
  const currentUser = useSelector((state) => state.currentUser.value);
  // console.log(currentUser);
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            {currentUser ? <Redirect to="/user/posts/all" /> : <Home />}
          </Route>
          <Route path="/accounts/:slug">
            {currentUser ? <Redirect to="/user/posts/all" /> : <Accounts />}
          </Route>

          <Route path="/user/posts/:slug">
            {currentUser ? <Posts /> : <Redirect to="/accounts/signin" />}
          </Route>
          <Route path="/create/post">
            {currentUser ? <CreatePost /> : <Redirect to="/accounts/signin" />}
          </Route>
          <Route path="/messenger">
            {currentUser ? <Messenger /> : <Redirect to="/accounts/signin" />}
          </Route>
          <Route path="/message/:slug">
            {currentUser ? <Messenger /> : <Redirect to="/accounts/signin" />}
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
