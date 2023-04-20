const express = require("express");
const router = express.Router();
const User = require("./userSchema");
// const jwt = require('jsonwebtoken')

const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/register", async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if (password === cpassword) {
      const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
      });
      User.findOne({ email: user.email }, async (err, docs) => {
        if (docs == null) {
          const registered = await user
            .save()
            .then(() =>
              res.send({
                message: "User registered successfully",
                user: user.name,
              })
            )
            .catch((err) => res.send({ message: "email invalid" }));

          //   res.end();
        } else {
          res.status(409).send({ message: "email already exists" });
        }
      });
      // res.status(200).json(registered);
      // res.status(201).render('index');
      // res.status(201).render()
    } else {
      res.status(400).send("error password doesn't match");
    }
    // res.status(409).json({ message: "email invalid" });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "invaild email or password" });
    }
    if (password !== user.password) {
      return res.status(400).json({
        message: "Incorrect Password !",
      });
    }

    // const data = await User.findById(req.params.email);
    // res.json(user)
    // res.send(user)
    // res.status(201).render('account',{userData : user});
    res.send({ message: "Login Success", user: user.fname });
    // router.get('/login',async (req,res)=>{
    //     res.render('account')

    // })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    User.find({}, (err, users) => {
      if (err) {
        console.log(err);
        return;
      }

      // console.log(users);
      res.json(users);

      // mongoose.connection.close();
    });
    // res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;
