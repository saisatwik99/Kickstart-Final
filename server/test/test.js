const assert = require("assert");
const chai = require("chai");
const {expect} = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const server = require("../index");
const should = chai.should();
const path = require('path')
chai.use(chaiHttp);



let user_token = "";
describe("Get User", function()  {
    this.timeout(0);
    it("Sign Up User", (done) => {
        chai.request(server)
            .post("/user/signup")
            .set('content-type', 'application/json')
            //.field('Content-Type', 'multipart/form-data')
            .send({email: "ad@gmail.com",password: "admin@123",name: "admin",phone: "9866018456"})
            .end(function(err, res) {
                 expect(res.status).to.be.oneOf([201]);
                done()
            });
        // setTimeout(done, 3000);
    })
  
     this.timeout(0);
     it("Sign In User", (done) => {
         chai.request(server)
             .post("/user/login")
             .set('content-type', 'application/json')
             .send({email: 'saisatwik99@gmail.com',password: '2002@bantI'})
             .end(function(err, res) {
                 if(res.should.have.status(201)){
                     user_token = res.body.token
                     done()
                 }
             });
        //  setTimeout(done, 3000);
     })
 })




describe('Wishlist', function() {
    it('Should fetch wishlist', function(done) {
        chai.request(server)
            .get('/admin/wishlist/${user_token}')
            .end((err, res) => {
                    res.should.have.status(200);
                    done()
                });
        //  setTimeout(done,3000)  
    })
  })


  
describe('Trending Posts', function() {
  this.timeout(0);
    it('Should fetch posts', function(done) {
        chai.request(server)
        .get('/admin/trending')
        .end((err, res) => {
                    res.should.have.status(200);
                    done()
                });
                
         setTimeout(done, 3000);
    })
  })

describe("Companies", function()  {
    // Disable time limit
    this.timeout(0);

    describe("/getCompany", function()  {
        it("Fetch Company", (done) => {
            chai.request(server)
                .get("/admin/company")
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                });
            setTimeout(done, 3000);
        })
    })

    this.timeout(0);
    let currentCompanyId = "9999";
    describe("/postCompany", function()  {
        // Add a single company
        it("Should Add a new Company", (done) => {
            chai.request(server)
                .post('/admin/company')
                .set('content-type', 'application/json')
                .field('Content-Type', 'multipart/form-data')
                .field('title', 'Laptop')
                .field('content1', 'nice')
                .field('content2', 'reputated')
                .field('price', '4000')
                .field('rating','7')
                .field('reviews','good')
                .field('category','AI')
                .attach('imageSrc', path.resolve(__dirname,"../photo.jpg"))
                .end(function(err, res) {
                    console.log(res);
                    expect(res.status).to.equal(200);
                    currentCompanyId = res.body.currentCompanyId;
                    done()
                })
        })
    })
    this.timeout(0);
    
        describe("/getCompany", function()  {
        it("Fetch Company", (done) => {
            chai.request(server)
                .get("/admin/company/${currentCompanyId}")
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                });
             setTimeout(done, 3000);
        })
    })


    // Delete a Single company
     describe("/deleteCompany", function()  {
         it("Should delete single Product", (done) => {
             chai.request(server)
                 .delete(`/admin/deleteCompany`)
                 .field('companyId',currentCompanyId)
                 .set('content-type', 'application/json')
                 .end(function(err, res) {
                     res.should.have.status(200);
                    done()
                 });
         })
     })
})

describe("Blogs", function()  {
     // Disable time limit
     this.timeout(0);

     describe("/getBlogs", function()  {
         // Get all the Blogs
         it("Fetch all the Blogs", (done) => {
             chai.request(server)
                 .get("/admin/blog")
                 .end((err, res) => {
                     res.should.have.status(200);
                     console.log ("Got",res.body.length, "Blogs")
                     done()
                 });
             // setTimeout(done, 3000);
         })
     })

    })