const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");


// @route GET /allposts
// @desc get all posts post
// @access Public

router.get('/allposts', (req,res) => {
  Post.find()
  .populate("postedBy", "_id name")
    .then(posts => {
      res.json({posts})
    })
    .catch(err => {
      console.error(`there was an error : ${err}`);
    })
})



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

// @route GET /mypost
// @desc get my posts
// @access Public
router.get('/mypost', (req,res) => {
  Post.find({postedBy:req.user._id})
  .populate("PostedBy", "_id name")
  .then(mypost => {
    res.json({mypost})
  })
  .catch(err => {
    console.error(`there was an error : ${err}`);
  })
})

module.exports = router;