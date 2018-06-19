var express = require('express');
var router = express.Router()
var bcrypt = require('bcrypt');
var Admin = require('../model/adminModel');
var User = require('../model/userModel');
var Picture = require('../model/pictures');
var Product = require('../model/product');
var Event = require('../model/event');
var Video = require('../model/videos');
var Audio = require('../model/audio');
var Buyers = require('../model/buyers');
var Newsletter = require('../model/newsletter');
var Contactform = require('../model/contactform');
var Contactartist = require('../model/contactartist');
var moment = require('moment')
// var paypal = require('paypal-rest-sdk');
var validator = require("express-validator")
var Blogpost = require('../model/blogpost')
var jwt = require('jsonwebtoken');
var formidable = require('formidable');
var fs = require("fs")
var cloudinary = require("cloudinary")
var data = require("../data")
cloudinary.config({
  cloud_name: 'afrikal',
  api_key: '345824351715158',
  api_secret: '55TwfraW6ST15TGvq6tjHSF9NfA'
})
// paypal.configure({
//   'mode': 'sandbox', //sandbox or live
//   'client_id': 'Ad3N5ty33kuwM9hRrFR-qmUrek-R33Va6DukqEhHuYvCh0ZJ_B86Zu_UU8kymDdy9cDMLz8-Zqb2gm7t',
//   'client_secret': 'EMjHHYJR8oiR6a3jBtw_Oy0u0bkJ9EPu8HWHXOjY4E1paazj3gAspd1FGaBzaf3cxGjB7ifx5My5stKC'
// });


//nodemailer

//user login route
router.post('/api/login', function (req, res, next) {
  var date = new Date();

  const { username, password } = req.body
  Admin.findOne({ username: username }).then((user) => {
   
    if (user) {
      User.findOne({ email: "support@bidders.com" }).then((support) => {
        if (support) {
          bcrypt.compare(req.body.password, user.password).then((valid) => {
            if (valid) {
              var data = {
                id: user._id,
                username: username,
              }
              var token = jwt.sign(data, "h1a2b3e4e5b6").toString();
              res.header('x-auth', token).json({ "token": token });
            } else res.json({ "error": { "username": "Please enter a valid email/password", password: "incorrect password" } })
          })
        } else User.create({
          username: "bidders", membership: "bidders", firstName: "bidders", lastName: "support", email: "support@bidders.com", bio: "Please contact us for more info", street: "LOUVAIN-LA-NEUVE,City Centre Place de L'universite 16 Louvain-la-Neuve", country: "belgium", city: "belgium", company: "bidders.com", phone: "+32/470776403",
          date, selectedIndustry: "bidders", selectCategory: "support", dpUrl: "https://bidders.com/images/logoTransparent.png"
        }).then((succ) => console.log(succ))
      })
  
    } else {

      User.create({
        username: "bidders", membership: "bidders", firstName: "bidders", lastName: "support", email: "suport@bidders.com", bio: "Please contact us for more info", street: "LOUVAIN-LA-NEUVE,City Centre Place de L'universite 16 Louvain-la-Neuve", country: "belgium", city: "belgium", company: "bidders.com", phone: "+32/470776403",
        date, selectedIndustry: "bidders", selectCategory: "support", dpUrl: "https://bidders.com/images/logoTransparent.png"
      }).then((succ) => console.log(succ))
      
      bcrypt.hash("bidders", 10).then((hash) => {
        var newUser = new Admin({
          username: "kamal",
          password: hash,
          priviledge: "admin"
        });
        newUser.save().then((admin) => {
          if (admin) {
            bcrypt.compare(password, admin.password).then((valid) => {
              if (valid) {
                var data = {
                  id: admin._id,
                  username: username,
                  // password: admin.password
                }
                var token = jwt.sign(data, "h1a2b3e4e5b6").toString();
                res.header('x-auth', token).json({ "token": token });
              } else res.json({ "error": { "username": "Please enter a valid email/password", password: "incorrect password" } })
            })
          }
        })
      })
    }
  })

})
//user signup route

  .post("/api/payment_successful", (req, res, next) => {
    const date = new Date();
    const token = req.body.token;
    const userData = jwt.verify(req.body.token, "o1l2a3m4i5d6e")
    if (userData) {
      const { username, password,  firstName, lastName, email, dob, street, country, city, state, company, phone } = userData

      let text = "This field is required";
      var error = {}
      var bio;
      bio !== "" ? bio = bio : bio = "Hi there, i am new to bidders"
     
      User.findOne({ username }).then((found) => {

        if (found) res.json({ error: { server: "Username already exists" } })
        else {
          User.findOne({ email }).then((found) => {
            if (found) res.json({ error: { server: "Email already exists" } });
            else
              bcrypt.hash(userData.password, 10).then((hash) => {
                var newUser = new User({
                  username, firstName, lastName, email, dob, bio, street, membership, country, city, state, company, phone,
                  paid: true, paymentId: "0", verified: true, registration: true, date,
                  password: hash,
                });

                newUser.save().then((user) => {
                  if (user) {
                    console.log(user)
                    res.json({ "success": { "server": "Account Created Successfully", token: token } })

                  }
                }).catch((error) => { console.log(error); res.json({ error: { "server": "An error has occured" } }); })

              })
          })
        }
      })
    }

  })
  .post("/api/editmembers", (req, res, next) => {
    const token = req.body.token;
    const userData = jwt.verify(req.body.token, "o1l2a3m4i5d6e")
    if (userData) {
      console.log(userData)
      const { username, password, firstName, lastName, email, dob, street, country, city, state, company, phone } = userData


      let text = "This field is required";
      var data2 = {}
      var bio;
      if (username) data2.username = username
      if (firstName) data2.firstName = firstName
      if (lastName) data2.lastName = lastName
      if (dob) data2.dob = dob
      if (street) data2.street = street
      if (country) data2.country = country
      if (city) data2.city = city
      if (state) data2.state = state
      if (company) data2.company = company
      if (phone) data2.phone = phone
      User.findByIdAndUpdate(req.body.id, data2).then((user) => {
        if (user) {
          res.json({ "success": { "server": "Modification was Successful" } })
        }
      }).catch((err) => { res.json({ error: { "server": "An error has occured. Please try again later" } }); console.log(err) })

    }

  })
  .post("/api/registrationNotification", (req, res, next) => {
    const token = req.body.token;
    const userData = jwt.verify(req.body.token, "o1l2a3m4i5d6e")
    if (userData) {

      var mailer = require('node-mailer');

      const nodemailer = require('nodemailer');

      let transporter = nodemailer.createTransport({
        tls: {
          rejectUnauthorized: false
        },
        host: 'mail.bidders.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "info@bidders.com", // generated ethereal user
          pass: "q#sui?ql)lsY@d_Tz%" // generated ethereal password
        }
      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: '"bidders" <info@bidders.com>', // sender address
        to: `${userData.email}`, // list of receivers
        subject: 'Account Registration ✔', // Subject line
        text: 'Hello?', // plain text body
        html: ' <body style="background:#f7f7f7"><div style="width:90%; background:#fff; margin:10px auto 20px;font-family:Verdana, Geneva, Tahoma, sans-serif"><div style="background:#F4EEE2; padding:10px;color:rgb(248, 150, 166)"><center><h3>bidders</h3></center></div><div style="padding:30px"><center><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Congratulations! your bidders account has successfully been created</small></p><h2>Verify Your Email</h2><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Please click on this button below to verify your email.</small></p><p style="margin: 30px"> <a href="https://bidders.herokuapp.com/verify/' + token + '" style="font-size:0.9em;text-decoration:none;color:#000;border:1px solid #777;background:transparent;padding:10px 50px;font-family:Verdana"> Verify Email</a></p></center></div><div style="background:#eee;height:2px;margin:10px 0px"></div><div style="padding:40px 20px;font-size:0.7em;color:#bbb"><center>Questions? Get your answers here: <a href="" style="color:blue">Help Center</a></a>.</center></div></div><div style="font-size:0.7em;text-align:center;color:#bbb;width:35%;margin:auto">Atavist | Brooklyn, New York, 11201 | Copyright © 2015 | All rights reserved</div></body>' // html body
      };


      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
          res.json({ "error": "Notification failed" })
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log(info);
        res.json({ "success": "Notification sent Successfully" })

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
      // });
    }
  })
  .get("/api/getMembers", (req, res, next) => {

    User.find().then((users) => {
      if (users) {
        res.json({ success: users})
      } else (res.json({ empty: "There are no members available" }))
    })
  })
 
  .get("/api/getBuyers", (req, res, next) => {

    Buyers.find().then((users) => {
      if (users) {
        res.json({ success: users, registration: true })
      } else (res.json({ empty: "There are no buyers available" }))
    })
  })
  .get("/api/members", (req, res, next) => {
    User.find().sort({ _id: -1 }).limit(5).then((users) => {
      Product.find().sort({ id: -1 }).limit(4).then((product) => {
        res.json({ users: users, products: product })

      })
    })
  })
  .post("/api/deletemember", (req, res, next) => {
    if (jwt.verify(req.body.token, "h1a2b3e4e5b6"))
      User.findByIdAndRemove(req.body.id).then((post) => {
        if (post) {
          res.json({ success: post })
        } else (res.json({ empty: "this user is not available" }))

      })
  })
 
  .get("/api/getSupporters", (req, res, next) => {

    User.find({  membership: "supporters" }).then((users) => {
      if (users) {
        res.json({ success: users, registration: true })
      } else (res.json({ empty: "There are no artist available" }))
    })
  })

  .get("/api/countArtists", (req, res, next) => {
    User.count().then((users) => {
      res.json({ success: users, registration: true })
    })
  })
  .get("/api/countSupporters", (req, res, next) => {
    User.count({  membership: "supporters" }).then((users) => {
      res.json({ success: users, registration: true })
    })
  })
  .get("/api/countNews", (req, res, next) => {
    Blogpost.count().then((users) => {
      res.json({ success: users, registration: true })
    })
  })
  .get("/api/countProduct", (req, res, next) => {
    Product.count().then((users) => {
      res.json({ success: users, registration: true })
    })
  })
  .get("/api/countPendingProduct", (req, res, next) => {
    Product.count({ approved: false }).then((users) => {
      res.json({ success: users, })
    })
  })
  .get("/api/countPendingActivation", (req, res, next) => {
    User.count({ pending: true }).then((users) => {
      res.json({ success: users })
    })
  })
  .get("/api/countEvents", (req, res, next) => {
    Event.count().then((users) => {
      res.json({ success: users, registration: true })
    })
  })
  .get("/api/artist", (req, res, next) => {
    User.findById(req.query.id).then((artist) => {
      if (artist) {
        var media = {};
        Video.find({ userID: req.query.id }).then((videos) => {
          media.videos = videos;
          Picture.find({ userID: req.query.id }).then((pictures) => {
            media.pictures = pictures;
            Audio.find({ userID: req.query.id }).then((audios) => {
              media.audios = audios
              Product.find({ userID: req.query.id }).then((product) => {
                media.product = product
                res.json({ "user": artist, "media": media });
              })
            })
          })
        });
        // res.json({ success: artist });
      } else res.json({ empty: "artist does not exist" })
    })
  })
  .get("/api/support", (req, res, next) => {
    User.findOne({ email: "support@bidders.com" }).then((artist) => {
      if (artist) {
        var media = {};
        Video.find({ userID: req.query.id }).then((videos) => {
          media.videos = videos;
          Picture.find({ userID: req.query.id }).then((pictures) => {
            media.pictures = pictures;
            Audio.find({ userID: req.query.id }).then((audios) => {
              media.audios = audios
              Product.find({ userID: req.query.id }).then((product) => {
                media.product = product
                res.json({ "user": artist, "media": media });
              })
            })
          })
        });
        // res.json({ success: artist });
      } else res.json({ empty: "artist does not exist" })
    })
  })
  .get("/api/singlebuyer", (req, res, next) => {
    Buyers.findById(req.query.id).then((artist) => {
      if (artist) {
        Product.findById(artist.productID).then((item) => {
          res.json({ "user": artist, product: item });
        })


        // res.json({ success: artist });
      } else res.json({ empty: "artist does not exist" })
    })
  })
  .post('/api/blogpost', (req, res, next) => {
    var newform = new formidable.IncomingForm();
    newform.keepExtensions = true;
    newform.parse(req, (err, fields, files) => {
      let errorFields = {}
      if (fields.title === "") errorFields.title = "This field is required";
      if (fields.category === "") errorFields.category = "This field is required";
      if (fields.description === "") errorFields.description = "This field is required";
      if (errorFields.title || errorFields.description) res.json({ error: { ...errorFields } });
      else if (files.blogpost)
        cloudinary.uploader.upload(files.blogpost.path, function (result) {
          if (result.url) {
            let userData = jwt.decode(fields.token)
            let time = new Date();
            var publicid = result.public_id + "." + result.format

            let Uploadpost = new Blogpost({
              imgUrl: result.url,
              imgID: publicid,
              date: time,
              title: fields.title,
              category: fields.category,
              youtubelink: fields.youtubelink,
              description: fields.description
            });
            Uploadpost.save().then().then((success) => { res.json({ url: result.url, success: "uploaded successfully" }) })
          } else {
            res.json({ error: { server: "Error uploading file" } }); console.log("error uploading to cloudinary")
          }
          // Picture.update({ userID: userData.id, url: result.url })
        }); else res.json({ error: { server: "Please choose a file to upload" } });
    })
  })
  .get("/api/search", (req, res, next) => {
    if (req.query.name) {
      var searchText = `${req.query.name}`
      console.log(req.query)
      const results = [];
      User.find({ $text: { $search: searchText } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).then((users) => {
        if (users)
          results.push({ users: users });
        Event.find({ $text: { $search: searchText } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).then((events) => {
          if (events)
            results.push({ events: events });
          Product.find({ $text: { $search: searchText } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).then((products) => {
            if (products)
              results.push({ products: products });
            console.log(results)
            res.json({ results: results })
          })
        })
      })
    }
  })
  .get("/api/news", (req, res, next) => {
    Blogpost.find().sort({ _id: -1 }).then((news) => {
      if (news) {
        res.json({ success: news })
      } else (res.json({ empty: "There are no artist available" }))
    })
  })
  .get("/api/newsletter", (req, res, next) => {
    Newsletter.find().sort({ _id: -1 }).then((news) => {
      if (news) {
        res.json({ success: news })
      } else (res.json({ empty: "There are no emails available" }))
    })
  })
  .get("/api/newsbyid", (req, res, next) => {
    Blogpost.findOne({ _id: req.query.id }).then((news) => {
      if (news) {
        res.json({ success: news })
      } else (res.json({ empty: "There are no artist available" }))

    })
  })
  .post("/api/editpost", (req, res, next) => {
    let { description, title, category, id, token, youtubelink } = req.body;
    let data = {}
    if (description) data.description = description
    if (title) data.title = title
    if (youtubelink) data.youtubelink = youtubelink
    if (category) data.category = category
    console.log(req.body)
    if (jwt.verify(token, "h1a2b3e4e5b6"))
      Blogpost.findByIdAndUpdate(id, data).then((user) => {
        if (user) {
          res.json({ "success": { "server": "Contact form modified Successfully" } })
        }
      }).catch((err) => { res.json({ error: { "server": "An error has occured. Please try again later" } }); console.log(err) })

  })
  .post("/api/deletepost", (req, res, next) => {
    if (jwt.verify(req.body.token, "h1a2b3e4e5b6"))
      Blogpost.findByIdAndRemove(req.body.id).then((post) => {
        if (post) {
          res.json({ success: post })
        } else (res.json({ empty: "There are no post available" }))

      })
  })
  .get("/api/events", (req, res, next) => {
    Event.find().then((events) => {
      if (events) {
        res.json({ events: events });
      } else res.json({ "error": "THere are no events at the moment" })
    })
  })
  .get("/api/eventsById", (req, res, next) => {
    const { id } = req.query
    Event.findById(id).then((events) => {
      if (events)
        res.json({ success: events });
    })
  })
  .get("/api/orderevents", (req, res, next) => {
    console.log(req.query)
    const { orderby } = req.query
    if (orderby === "new_arrival")
      Event.find().sort({ _id: -1 }).then((events) => {
        if (events) {
          res.json({ events: events })
        } else (res.json({ empty: "There are no new items in marketplace" }))

      });
    else
      Event.find().sort({ views: -1 }).then((events) => {
        if (events) {
          res.json({ events: events })
        } else (res.json({ empty: "There are no items in marketplace" }))

      })
  })
  .post("/api/editevent", (req, res, next) => {
    let { description, title, industry, id, token } = req.body;
    let data = {}
    if (description) data.description = description
    if (title) data.title = title
    if (industry) data.category = industry
    console.log(req.body)
    if (jwt.verify(token, "h1a2b3e4e5b6"))
      Event.findByIdAndUpdate(id, data).then((user) => {
        if (user) {
          res.json({ "success": { "server": "Contact form modified Successfully" } })
        }
      }).catch((err) => { res.json({ error: { "server": "An error has occured. Please try again later" } }); console.log(err) })

  })
  .post("/api/deleteevent", (req, res, next) => {
    if (jwt.verify(req.body.token, "h1a2b3e4e5b6"))
      Event.findByIdAndRemove(req.body.id).then((post) => {
        if (post) {
          res.json({ success: post })
        } else (res.json({ empty: "There are no post available" }))

      })
  })
  .get("/api/videos", (req, res, next) => {
    Video.find().then((videos) => {
      res.json({ "success": videos });
    })
  })
  .get("/api/audios", (req, res, next) => {
    Audio.find().then((videos) => {
      res.json({ "success": videos });
    })
  })
  .post("/api/deleteaudio", (req, res, next) => {
    if (jwt.verify(req.body.token, "h1a2b3e4e5b6"))
      Audio.findByIdAndRemove(req.body.id).then((audio) => {
        if (audio) {
          res.json({ success: audio })
        } else (res.json({ empty: "There are no post available" }))

      })
  })
  .post("/api/deletevideo", (req, res, next) => {
    if (jwt.verify(req.body.token, "h1a2b3e4e5b6"))
      Video.findByIdAndRemove(req.body.id).then((vid) => {
        if (vid) {
          res.json({ success: vid })
        } else (res.json({ empty: "There are no post available" }))

      })
  })
  .get("/api/videoById", (req, res, next) => {
    Video.findOne({ _id: req.query.id }).then((video) => {
      if (video) {
        res.json({ success: video })
      }
    })
  })
  .get("/api/audioById", (req, res, next) => {
    Audio.findOne({ _id: req.query.id }).then((audio) => {
      if (audio) {
          User.findById(audio.userID).then((artist) => {
         
              var media = {};
            Video.find({ userID: audio.userID}).then((videos) => {
                media.videos = videos;
              Picture.find({ userID: audio.userID}).then((pictures) => {
                  media.pictures = pictures;
                Audio.find({ userID: audio.userID }).then((audios) => {
                    media.audios = audios
                  Product.find({ userID: audio.userID}).then((product) => {
                      media.product = product
                      
                      res.json({ success: audio, "user": artist, "media": media  })
                      
                    })
                  })
                })
              });
         
          })
      }
    })
  })
  .get("/api/products", (req, res, next) => {
    console.log(req.query)
    const { orderby } = req.query
    if (orderby === "new_arrival")
      Product.find().sort({ _id: -1 }).then((product) => {
        if (product) {
          res.json({ success: product })
        } else (res.json({ empty: "There are no new items in marketplace" }))

      });
    else
      Product.find().sort({ views: -1 }).then((product) => {
        if (product) {
          res.json({ success: product })
        } else (res.json({ empty: "There are no items in marketplace" }))

      })
  })
  .get("/api/getProducts", (req, res, next) => {

    Product.find().then((product) => {
      if (product) {
        res.json({ success: product })
      } else (res.json({ empty: "There are no items in marketplace" }))

    })
  })
  .get("/api/pendingitems", (req, res, next) => {
    Product.find({ approved: false }).then((product) => {
      if (product) {
        res.json({ success: product })
      } else (res.json({ empty: "There are no items in marketplace" }))

    })
  })
  .get("/api/pendingActivation", (req, res, next) => {
    User.find({ pending: true }).then((user) => {
      if (user) {
        res.json({ success: user })
      } else (res.json({ empty: "There are no items in marketplace" }))

    })
  })
  .post("/api/activateuser", (req, res, next) => {
    const {token} = req.body;
    const userData = jwt.verify(token, "o1l2a3m4i5d6e")
    if (userData) {
      var data = jwt.decode(token)
      console.log(data)
    User.findOneAndUpdate({email:data.email},{ pending: false }).then((user) => {
      if (user) {
        res.json({ success: user })
      } else (res.json({ empty: "There are no items in marketplace" }))

    })
  }
  })
  .get("/api/pendingitemsbyid", (req, res, next) => {
    Product.find({ approved: false, id: req.query.id }).then((product) => {
      if (product) {
        res.json({ success: product })
      } else (res.json({ empty: "There are no items in marketplace" }))

    })
  })
  .get("/api/productbyid", (req, res, next) => {
    Product.findById(req.query.id).then((items) => {
      res.json({ success: items })
    })
  })
  .post("/api/deleteproduct", (req, res, next) => {
    if (jwt.verify(req.body.token, "h1a2b3e4e5b6"))
      Product.findByIdAndRemove(req.body.id).then((item) => {
        if (item) {
          res.json({ success: item })
        } else (res.json({ empty: "There are no post available" }))

      })
  })
  .post("/api/editproduct", (req, res, next) => {
    let { description, title, industry, id, approved, sfee, sfee2, sdescription, token, price, nprice, mprice } = req.body;
    let data = {}
    if (description) data.description = description
    if (title) data.title = title
    if (price) data.price = price
    if (nprice) data.nprice = nprice
    if (mprice) data.mprice = mprice
    if (approved !== "") data.approved = approved
    if (industry) data.category = industry
    if (sfee) data.sfee = sfee
    if (sfee2) data.sfee2 = sfee2
    if (sdescription) data.sdescription = sdescription
    if (jwt.verify(token, "h1a2b3e4e5b6"))
      Product.findByIdAndUpdate(id, data).then((user) => {
        if (user) {
          res.json({ "success": { "server": "Contact form modified Successfully" } })
        }
      }).catch((err) => { res.json({ error: { "server": "An error has occured. Please try again later" } }); console.log(err) })

  })

  .post('/api/uploadProduct', (req, res, next) => {
    var newform = new formidable.IncomingForm();
    newform.keepExtensions = true;
    newform.parse(req, (err, fields, files) => {
      console.log(fields)
      let errorFields = {}
      if (fields.title === "") errorFields.title = "This field is required";
      if (fields.price === "") errorFields.price = "This field is required";
      // if (fields.billing === "") errorFields.billing = "This field is required";
      if (fields.phone === "") errorFields.phone = "This field is required";
      if (fields.stock === "") errorFields.stock = "This field is required";
      if (fields.email === "") errorFields.email = "This field is required";
      if (fields.description === "") errorFields.description = "This field is required";
      if (errorFields.title || errorFields.price || errorFields.description) res.json({ error: { ...errorFields } });
      else if (files.product)
        cloudinary.uploader.upload(files.product.path, function (result) {
          if (result.url) {
            User.findOne({ email: "support@bidders.com" }).then((support) => {
              let userData = jwt.decode(fields.token)
              let time = new Date();
              var publicid = result.public_id + "." + result.format

              let uploadedProduct = new Product({
                userID: support._id,
                imgUrl: result.url,
                imgID: publicid,
                date: time,
                title: fields.title,
                dpUrl: support.dpUrl,
                industry: fields.industry,
                price: fields.price,
                sfee: fields.sfee,
                sfee2: fields.sfee2,
                sdescription: fields.sdescription,
                description: fields.description,
                // billing: fields.billing,
                phone: fields.phone,
                stock: fields.stock,
                email: fields.email,
              });
              uploadedProduct.save().then().then((success) => { console.log(success); res.json({ url: result.url, success: "uploaded successfully" }) })
            })
          } else {
            res.json({ error: { server: "Error uploading to marketplace" } }); console.log("error uploading to cloudinary")
          }
          // Picture.update({ userID: userData.id, url: result.url })
        }); else res.json({ error: { server: "Please choose a file to upload" } });
    })
  })
  .post('/api/uploadEvent', (req, res, next) => {
    var newform = new formidable.IncomingForm();
    newform.keepExtensions = true;
    newform.parse(req, (err, fields, files) => {
      let errorFields = {}
      if (fields.title === "") errorFields.title = "This field is required";
      // if (fields.link === "") errorFields.link = "This field is required";
      if (fields.location === "") errorFields.location = "This field is required";
      if (fields.description === "") errorFields.description = "This field is required";
      if (fields.startTime === "") errorFields.startTime = "This field is required";
      if (fields.stopTime === "") errorFields.stopTime = "This field is required";
      if (fields.industry === "") errorFields.industry = "This field is required";
      if (errorFields.title || errorFields.location || errorFields.description || errorFields.stopTime || errorFields.startTime) res.json({ error: { ...errorFields } });
      else if (files.event)
        cloudinary.uploader.upload(files.event.path, function (result) {
          if (result.url) {
            // let day = moment(fields.checkedDate).date(); let month = moment(fields.checkedDate).month() + 1;
            User.findOne({ email: "support@bidders.com" }).then((support) => {
              var customDate = moment(fields.checkedDate).format("l")
              let time = new Date();
              var publicid = result.public_id + "." + result.format

              let UploadEvent = new Event({
                userID: support._id,
                date: time,
                title: fields.title,
                imgUrl: result.url,
                imgID: publicid,
                ticket: fields.link,
                location: fields.location,
                description: fields.description,
                startTime: fields.startTime,
                industry: fields.industry,
                stopTime: fields.stopTime,
                checkedDate: fields.checkedDate,
                customDate: moment(fields.checkedDate).format("l"),
                industry: support.industry
              });

              UploadEvent.save().then().then((success) => { console.log(success); res.json({ url: result.url, success: "Event created successfully" }) })
            })

          } else {
            res.json({ error: { server: "Error creating an event" } }); console.log("error uploading to cloudinary")
          }
          // Picture.update({ userID: userData.id, url: result.url })
        }); else res.json({ error: { server: "Please choose a file to upload" } });
    })
  })
module.exports = router;
