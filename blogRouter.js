const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create("Travel Tips", "Have fun!", "Michelle Gaffney", "May 16, 2016");

BlogPosts.create("Hamilton!", "Hamilton is the best musical ever!!!", "Michelle Gaffney", "October 4, 2018");

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

module.exports = router;