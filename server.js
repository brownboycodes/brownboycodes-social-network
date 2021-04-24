if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const server = require("http").Server(app);
const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");
const PORT = process.env.PORT;
const path = require("path");
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: 'process.env.CLIENT_ORIGIN',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  },
});

// passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//password encrypter
const bcrypt = require("bcrypt");
const Datastore = require("nedb");

// const path = require('path');
const session = require("express-session");
const cookieParser = require("cookie-parser");

const NedbStore = require("nedb-session-store")(session);

// FILE TO STORE SESSIONS
const store = new NedbStore({
  filename: process.env.SESSION_STORE_DATABASE_PATH,
});

const dbURI = process.env.DB_URI;

// CONNECT mongoDB
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    server.listen(PORT, () =>
      console.log(
        `database loading completed and server is listening for requests on port ${PORT}`
      )
    )
  )
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 7,
    },

    store: store,
  })
);

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(passport.initialize());
app.use(passport.session());

//* bcrypt cipher hash value
const saltRounds = Number(process.env.SALT_ROUNDS);

// object containing details of user trying to signup/login
let userDetails = {
  message: null,
  route: null,
  user: null,
};
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
  console.log("deserialized user");
});

passport.use(
  new LocalStrategy(
    { usernameField: "emailAddress", passwordField: "password" },
    function (username, password, done) {
      console.log("passport local started");
      User.findOne({ email: username })
        .then(async (user) => {
          if (!user) {
            //! if a user account doesn't exist with the given email address
            console.log("user not found");

            return done(null, false, { message: "Incorrect username." });
          }
          // todo: compare the hash of the entered password with the password stored in our database
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password." });
          }
          if (isMatch) {
            //? if password matches with the one on our database it's a success
            console.log("correct password");
            return done(null, user);
          }
        })
        .catch((err) => {
          //! if there has been some error other than user not found in database it will be taken care of here
          console.log("caught error", err);
          return done(err);
        });
    }
  )
);

//middleware functions to check if user is logged in or not

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.sendStatus(403);
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/");
}

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: "GET,PUT,POST,DELETE,OPTIONS,PATCH",
    credentials: true,
  })
);

/*
app.use(function(req, res, next) {
  res.header(“Access-Control-Allow-Origin”, “*”);
  res.header(“Access-Control-Allow-Methods”, “GET,PUT,POST,DELETE”);
  res.header(
  “Access-Control-Allow-Headers”,
  “Origin, X-Requested-With, Content-Type, Accept”
  );
  next();
  });
  app.options(“*”, cors());
*/

// app.get("/", (req, res) => res.sendStatus(403));

/*
console.log(process.env.NODE_ENV);
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
*/
app.use(express.static("frontend/build"));

 
// PASSPORT-LOCAL AUTHENTICATION ROUTE HANDLER
app.post(
  "/auth/local/login",
  isLoggedOut,
  passport.authenticate("local"),
  function (req, res) {
    console.log("/auth/local/login route entered");
    userDetails.message = "you have successfully logged into your account";
    userDetails.route = "/user/posts/all";
    userDetails.user = req.user;
    console.log("/auth/local/login", userDetails);
    return res.json(userDetails);
  }
);

//route handler to create new account
app.post("/auth/local/register", isLoggedOut, (req, res) => {
  //? checking if an account has already been created with the entered email address
  User.findOne({ email: req.body.emailAddress })
    .then(async (result) => {
      if (!result) {
        console.log("no matching user found");
        // hash the entered password so that password cannot be identified in case of leak
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        // add the new user in our database
        const user = new User({
          username: req.body.username,
          email: req.body.emailAddress,
          password: hashedPassword,
        });
        user
          .save()
          .then((newUser) => {
            /*
        if there hasn't been any error and account has been added to the database successfully
        we update the object containing details of the user
        */
            if (newUser) {
              userDetails.user = newUser;
              userDetails.message = "new account created";
              userDetails.route = "/accounts/signin";
              // send back the object containing details of the user to the client-side
              res.json(userDetails);
              console.log("user added", newUser);
            }
          })
          .catch((err) => console.error(err));
      } else {
        // the else part will take care of what is to be done if an account already exists with the same email id
        // we update the object containing details of the user
        userDetails.message = "user already exists";
        userDetails.route = "/accounts/signup";
        // send back the object containing details of the user to the client-side
        res.json(userDetails);
      }
    })
    .catch((err) => console.error(err));
});

/*
  TODO: CREATE GOOGLE AUTHENTICATION ROUTES AND LOGIC HANDLERS
*/

// route handler for logging out the user
app.get("/auth/logout", isLoggedIn, (req, res) => {
  req.logOut();
  // destroy user's session

  req.session.destroy((err) => {
    if (err) {
      throw err;
    }
  });

  // TODO: we update the object containing details of the user
  userDetails.message = "you have logged out of your account";
  userDetails.route = "/";
  userDetails.user = null;
  // send back the object containing details of the user to the client-side
  res.json(userDetails);

  console.log("user logged out");
});

app.get("/posts/all", isLoggedIn, (req, res) => {
  Post.find()
    .then((result) => res.json({ docs: result }))
    .catch((err) => console.error(err));
  console.log("posts sent");
});

app.get("/posts/all/:username", isLoggedIn, (req, res) => {
  Post.find({ postAuthor: req.params.username })
    .then((docs) => res.json({ docs }))
    .catch((err) => console.error(err));

  console.log(`posts for ${req.params.username} sent`);
});

app.post("/posts/create", isLoggedIn, (req, res) => {
  const { postTitle, postContent, postAuthor, datePosted } = req.body;
  const post = new Post({
    postTitle,
    postContent,
    postAuthor,
    datePosted,
  });
  post
    .save()
    .then((result) => {
      if (result) {
        res.json({ message: "post has been published" });
      } else {
        res.json({ message: "post could not be published" });
      }
    })
    .catch((err) => console.error(err));
});

//route handler for displaying all available users for chat
app.get("/messenger/user/:name", isLoggedIn, (req, res) => {
  if (req.params.name === "all") {
    User.find()
      .then((docs) => {
        let users = docs.map((doc) => {
          if (doc !== null) {
            return doc.username;
          }
        });
        // console.log(users);
        return res.json({ users });
      })
      .catch((err) => console.error(err));
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

// app.get("*", (req, res) => res.sendStatus(404));

const rooms = {};

//? REAL-TIME DATA SERVER
io.on("connection", (socket) => {
  // create new room if it doesn't exist
  // add user to the room when he opens the chatbox
  // transfer message from sender to receiver

  socket.on("typing-username", (username) => {
    User.find()
      .then((docs) => {
        let users = docs.map((doc) => {
          if (doc !== null) {
            return doc.username;
          }
        });
        // console.log(users);
        let usernameAvailability = users.includes(username)
          ? "username not available"
          : "username available";
        socket.emit("username-availability", usernameAvailability);
      })
      .catch((err) => console.error(err));
  });

  socket.on("room-created", (room) => {
    if (room in rooms) {
      console.log("room already exists");
    } else {
      rooms[room] = { users: {} };
      console.log("new room created", room);
    }
  });
  socket.on("new-user", (room, name) => {
    if (room in rooms) {
      socket.join(room);

      rooms[room].users[socket.id] = name;
      console.log("room members", rooms[room].users);
      socket.broadcast.to(room).emit("user-connected", name);
    }
  });

  socket.on("message-sent", (room, message) => {
    if (room in rooms) {
      socket.broadcast.to(room).emit("message-received", {
        message,
        name: rooms[room].users[socket.id],
      });
      console.log("message sent", message);
    }
  });

  socket.on("disconnect", () => {
    getUserRooms(socket).forEach((room) => {
      socket.broadcast
        .to(room)
        .emit("user-disconnected", rooms[room].users[socket.id]);
      delete rooms[room].users[socket.id];
    });
    console.log("disconnected");
  });
});

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) {
      names.push(name);
    }
    return names;
  }, []);
}
