const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

const expect = chai.expect;

chai.use(chaiHttp);

describe('BlogPosts', function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it('should list blog posts on GET', function() {
        return chai.request(app)
            .get('/blogposts')
            .then(function(res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length.of.at.least(1);
                res.body.forEach(function(item) {
                    item.should.be.a('object');
                    item.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
                });
            });
    });

    it('should add a blog post on POST', function() {
        const newBlogpost = {
        title: 'Learning Node', content: 'Node is hard, but rewarding', author: 'Michelle Gaffney', publishDate: 'March 24, 1984'};
        return chai.request(app)
          .post('/blogposts')
          .send(newBlogpost)
          .then(function(res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
            expect(res.body).to.deep.equal(Object.assign(newBlogpost, {id: res.body.id}));
          });
      });
    
      it('should update blog posts on PUT', function() {
    
        const updateData = {
          title: "Jquery",
          content: "Jquery is a very helpful JavaScript library", 
          author: "Michelle Gaffney",
          publishDate: "September 19, 2018"
        };
    
        return chai.request(app)
          .get('/blogposts')
          .then(function(res) {
            updateData.id = res.body[0].id;
    
            return chai.request(app)
              .put(`/blogposts/${updateData.id}`)
              .send(updateData)
          })
          .then(function(res) {
            res.should.have.status(204);
          });
      });
    
      it('should delete blog posts on DELETE', function() {
        return chai.request(app)
          .get('/blogposts')
          .then(function(res) {
            return chai.request(app)
              .delete(`/blogposts/${res.body[0].id}`)
          })
          .then(function(res) {
            res.should.have.status(204);
          });
      });
});