const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create("Travel Tips", "Have fun!", "Michelle Gaffney", "May 16, 2016");

BlogPosts.create("Hamilton!", "Hamilton is the best musical ever!!!", "Michelle Gaffney", "October 4, 2018");

BlogPosts.create("Learning Node", "Node is hard, but rewarding when you eventually figure it out", "Michelle Gaffney", "October 19, 2018");

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'publishDate'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(item);
  });
  
  router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post \`${req.params.ID}\``);
    res.status(204).end();
  });
  
  router.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'publishDate'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    if (req.params.id !== req.body.id) {
        const message = (
          `Request path id (${req.params.id}) and request body id `
          `(${req.body.id}) must match`);
        console.error(message);
        return res.status(400).send(message);
      }
      console.log(`Updating blog post \`${req.params.id}\``);
      const updatedItem = BlogPosts.update({
          id: req.params.id,
          title: req.body.title,
          content: req.body.content,
          author: req.body.author,
          publishDate: req.body.publishDate
      });
      res.status(204).end();
    })

module.exports = router;