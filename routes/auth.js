const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = mongoose.model("User");
const {JWT_SECRET} = require("../keys")

router.get('/', (req, res) => {
  res.send("hello");
})

// @route GET api/signup
// @desc add a user
// @access Public

router.get('/protected', (req,res) => {
  res.send("Hello user")
})

// @route POST signin
// @desc sign in with the email and password 
// @access Public

router.post('/signin', (req, res) => {
  const {email,password} = req.body

  if(!email || !password){
    return res.status(422).json({error: "please provide email and password!"})
  }
  User.findOne({email:email})
  .then(savedUser => {
    if(!savedUser){
      res.status(422).json({error: "this email is not found"})
    }
    bcrypt.compare(password, savedUser.password)
      .then(doMatch => {
        if(doMatch){
          const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
          res.json({token})
          // res.json({message: "successfully signed in"})

        } else {
          return res.status(422).json({error: "invalid email or password"})
        }
      })
    })
    .catch(err => {
      console.error(`there was an error : ${err}`);
    })
})

// @route POST signup
// @desc add a user
// @access Public

router.post('/signup', (req,res) => {
  const{name,email,password} = req.body
    if(!email || !name || !password){
     return res.status(422).json({error:"please fill all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser) => {
      if(savedUser){
        return res.status(422).json({error:"user already exist with that email"})
      }

      bcrypt.hash(password, 12)
      .then(hashedpassword => {
        const user = new User({
          email,
          password:hashedpassword,
          name
        })
        user.save()
        .then(user => {
          res.json({message: "saved succesfully!"})
        })
          .catch(err=> {
            console.error(`there was an error ${err}`)
          })
      })
        
    })
      .catch(err=> {
        console.error(`there was an error ${err}`);
      })
})// post

module.exports = router;