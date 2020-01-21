//jshint esversion: 6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }

      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var option = {
    url: "https://us20.api.mailchimp.com/3.0/lists/4b5a1757d4",
    method: "POST",
    headers: {
      "Authorization": "41a8454f3efbd78c8e190381ffd00b3e-us20"
    },
    body: jsonData

  };

  request(option, function(error, response, body){
    if(error) {
      res.sendFile(__dirname + "/failure.html");
    }else {
      if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
  app.post("/failure", function(req, res){
    res.redirect("/");
  });

});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
});


//6b46babba28e8aace813e8740a0c518a-us20
//4b5a1757d4
