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

    let currentCompanyId = "9999";
    
    
    // describe("/getCompany", function()  {
    //     it("Fetch Company", (done) => {
    //         chai.request(server)
    //             .get("/admin/company/${currentCompanyId}")
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 done()
    //             });
    //          setTimeout(done, 3000);
    //     })
    // })


    // Delete a Single company
     describe("/deleteCompany", function()  {
         it("Should delete single Product", (done) => {
             chai.request(server)
                 .delete(`/admin/deleteCompany`)
                 .field('companyId',currentCompanyId)
                 .set('content-type', 'application/json')
                 .end(function(err, res) {
                     res.should.have.status(404);
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