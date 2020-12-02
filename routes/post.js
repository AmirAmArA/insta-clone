const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");


// @route POST /createpost
// @desc create a post
// @access Public

router.post('/createpost', requireLogin  ,(req,res) => {
    const {title,body} = req.body;
    if(!title || !body) {
      return res.status(422).json({error : "please add all the fields !"})
    }
    req.user.password = undefined;
    const post = new Post({
      title,
      body,
      postedBy: req.user
    })
    post.save().then(result => {
      res.json({post:result})
    })
    .catch(err => {
      console.error(`there was an error : ${err}`)
    })
});

module.exports = router;